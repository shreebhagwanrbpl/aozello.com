"use client";

import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

import {
    FaPlay,
    FaShareAlt,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaLink,
    FaFilePdf,
    FaDownload,
} from "react-icons/fa";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fetchFullCatalog } from "@/lib/data-fetcher";
import { generateBrochurePDF } from "@/lib/generateBrochurePDF";

export default function ProductDetails({ slug, product: initialProduct }) {
    const [product, setProduct] = useState(initialProduct || null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(() => {
        if (initialProduct) {
            return initialProduct.images?.length > 0
                ? initialProduct.images[0]
                : initialProduct.image || "";
        }
        return "";
    });
    const [selectedMedia, setSelectedMedia] = useState("image");
    const [showShare, setShowShare] = useState(false);
    const [loading, setLoading] = useState(!initialProduct);
    const [generatingPDF, setGeneratingPDF] = useState(false);

    const shareRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const pathname = usePathname();

    const pathParts = pathname.split("/").filter(Boolean);
    const city = pathParts.length > 1 ? pathParts[0] : "India";
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);

    const handleDownloadBrochure = async (e) => {
        e?.preventDefault();
        if (!product || generatingPDF) return;

        try {
            setGeneratingPDF(true);
            toast.loading("Generating product brochure PDF...", { id: "pdf-toast" });
            await generateBrochurePDF(product, selectedImage);
            toast.success("Brochure downloaded successfully!", { id: "pdf-toast" });
        } catch (err) {
            console.error("Failed to generate PDF:", err);
            toast.error("Failed to generate PDF brochure", { id: "pdf-toast" });
        } finally {
            setGeneratingPDF(false);
        }
    };

    useEffect(() => {
        if (initialProduct) {
            setProduct(initialProduct);
            setSelectedImage(
                initialProduct.images?.length > 0
                    ? initialProduct.images[0]
                    : initialProduct.image || ""
            );
            setSelectedMedia("image");
            setLoading(false);
            return;
        }

        const loadProduct = async () => {
            try {
                setLoading(true);
                const allProducts = await fetchFullCatalog();
                const found = allProducts.find((p) => p.slug === slug);

                setProduct(found || null);

                if (found) {
                    if (found.images?.length > 0) {
                        setSelectedImage(found.images[0]);
                    } else {
                        setSelectedImage(found.image || "");
                    }
                    setSelectedMedia("image");
                }
            } catch (error) {
                console.error("Error loading product details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [slug, initialProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) {
            return toast.error("Name is required");
        }

        if (!emailRegex.test(form.email)) {
            return toast.error("Enter valid email");
        }

        if (!phoneRegex.test(form.phone)) {
            return toast.error("Enter valid mobile number");
        }

        try {
            setSubmitting(true);

            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "aozellocom",
                    "productQueries"
                ),
                {
                    ...form,
                    productName: product.title,
                    productSlug: product.slug,
                    brand: product.brand || "",
                    model: product.model || "",
                    createdAt: new Date(),
                }
            );

            toast.success("Your enquiry has been submitted successfully.");

            setForm({
                name: "",
                email: "",
                phone: "",
            });
        } catch (error) {
            console.error("Error submitting query:", error);
            toast.error("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    const productSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.image ? [product.image] : [],
            description:
                product.desc ||
                product.description ||
                product.title,
            brand: {
                "@type": "Brand",
                name: product.brand || "Raj Biosiss",
            },
        }
        : null;

    const faqSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: `What is ${product.title} used for?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${product.title} is used in hospitals, pathology labs and diagnostic centres.`,
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you provide installation support?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, installation and technical support are available.",
                    },
                },
            ],
        }
        : null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link Copied");
        setShowShare(false);
    };

    const handleWhatsapp = () => {
        const shareText = `🔬 ${product?.title}\n\n${product?.desc || ""}\n\n🌐 ${window.location.href}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    };

    const handleFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
            )}`,
            "_blank"
        );
    };

    const handleInstagram = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Instagram sharing is not directly supported. Link copied to clipboard!");
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.title,
                    text: product.desc || product.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.log("Share failed:", err);
            }
        } else {
            setShowShare(!showShare);
        }
    };

    useEffect(() => {
        const close = (e) => {
            if (
                shareRef.current &&
                !shareRef.current.contains(e.target)
            ) {
                setShowShare(false);
            }
        };

        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    if (loading) {
        return (
            <section className="py-10 md:py-20 bg-slate-50">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
                        <div className="h-[420px] md:h-[520px] rounded-[36px] bg-slate-200" />
                        <div>
                            <div className="h-12 w-3/4 bg-slate-200 rounded-xl mb-8" />
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 bg-slate-200 rounded-lg mb-4"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!product) {
        return (
            <section className="py-10 md:py-20 bg-slate-50 text-center">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-slate-800">Product Not Found</h2>
                    <p className="text-slate-600 mt-4">The requested product could not be located in our catalog.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-10 md:py-16 bg-slate-50 relative overflow-hidden">
            {/* Diagonal Watermark Across Entire Web Page */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none opacity-[0.03]">
                <p className="text-slate-900 font-extrabold text-[8vw] leading-none whitespace-nowrap -rotate-45 tracking-widest uppercase text-center">
                    Rajbiosis Private Limited
                </p>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <div className="container-custom relative z-10 space-y-10">
                
                {/* Breadcrumbs */}
                <div className="text-sm text-slate-500 font-medium">
                    Home / Products / <span className="text-slate-800">{product.title}</span>
                </div>

                {/* Main Balanced 2-Column Hero Grid */}
                <div className="grid lg:grid-cols-[480px_1fr] xl:grid-cols-[540px_1fr] gap-8 xl:gap-12 items-start">
                    
                    {/* LEFT COLUMN: Gallery + Request Quote Form */}
                    <div className="space-y-8">
                        
                        {/* Main Media Gallery Box */}
                        <div className="bg-white p-4 rounded-[28px] md:rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100">
                            <div className="relative h-[320px] sm:h-[380px] md:h-[420px] rounded-[20px] md:rounded-[28px] overflow-hidden bg-slate-50 flex items-center justify-center">
                                {selectedMedia === "video" && product.video ? (
                                    <video
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain p-4"
                                    >
                                        <source
                                            src={product.video}
                                            type="video/mp4"
                                        />
                                    </video>
                                ) : (
                                    <>
                                        {!imageLoaded && (
                                            <div className="absolute inset-0 bg-slate-100 animate-pulse" />
                                        )}

                                        <img
                                            src={selectedImage || product.image || "/placeholder.jpg"}
                                            alt={product.title}
                                            onLoad={() => setImageLoaded(true)}
                                            decoding="async"
                                            className={`w-full h-full object-contain p-4 transition duration-500 ${imageLoaded
                                                ? "opacity-100"
                                                : "opacity-0"
                                                }`}
                                            onError={(e) => {
                                                e.currentTarget.src = "/placeholder.jpg";
                                            }}
                                        />
                                    </>
                                )}
                            </div>

                            {/* Media Thumbnails */}
                            <div className="flex flex-wrap gap-3 mt-4">
                                {(product.images?.length
                                    ? product.images
                                    : [product.image || "/placeholder.jpg"]
                                ).map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedImage(img);
                                            setSelectedMedia("image");
                                        }}
                                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 relative transition-all ${selectedMedia === "image" &&
                                            selectedImage === img
                                            ? "border-red-600 shadow-md scale-105"
                                            : "border-gray-200 opacity-80 hover:opacity-100"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            decoding="async"
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = "/placeholder.jpg";
                                            }}
                                        />
                                    </button>
                                ))}

                                {product.video && (
                                    <button
                                        onClick={() => setSelectedMedia("video")}
                                        className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${selectedMedia === "video"
                                            ? "border-red-600 bg-red-50 text-red-600"
                                            : "border-gray-200 text-slate-600"
                                            }`}
                                    >
                                        <FaPlay size={16} />
                                        <span className="text-[10px] mt-1 font-semibold">Video</span>
                                    </button>
                                )}

                                {/* Download Brochure Thumbnail Button */}
                                <button
                                    onClick={handleDownloadBrochure}
                                    disabled={generatingPDF}
                                    className="w-16 h-16 rounded-xl border border-red-200 bg-red-50 flex flex-col items-center justify-center hover:bg-red-100 transition text-red-700 font-semibold disabled:opacity-50"
                                    title="Download Product Brochure PDF"
                                >
                                    <FaFilePdf size={18} className="text-red-600 mb-0.5" />
                                    <span className="text-[10px]">{generatingPDF ? "..." : "Brochure"}</span>
                                </button>
                            </div>
                        </div>

                        {/* REQUEST A QUOTE FORM CARD */}
                        <div className="bg-white rounded-[28px] md:rounded-[36px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Request A Quote
                                </h2>
                                <span className="bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                                    Fast Response
                                </span>
                            </div>

                            <p className="text-sm text-slate-500 mb-6">
                                Product:
                                <span className="font-semibold ml-1.5 text-slate-800">
                                    {product.title}
                                </span>
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Mobile Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="10-digit mobile number"
                                        maxLength={10}
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                phone: e.target.value.replace(/\D/g, ""),
                                            })
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
                                    />
                                </div>

                                {/* Prominent Red/Orange Gradient Submit Button */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 text-base tracking-wide mt-2"
                                >
                                    {submitting ? "Submitting Request..." : "Get Instant Quote"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Title, Specs, Description & Details */}
                    <div className="space-y-8">
                        
                        {/* Title Card */}
                        <div className="bg-white p-6 sm:p-8 rounded-[28px] md:rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100">
                            <div className="flex justify-between items-start gap-4">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-slate-900">
                                    {product.title}
                                </h1>

                                <div ref={shareRef} className="relative flex-shrink-0">
                                    <button
                                        onClick={handleNativeShare}
                                        className="w-12 h-12 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 transition text-slate-700"
                                        title="Share Product"
                                    >
                                        <FaShareAlt size={18} />
                                    </button>

                                    {showShare && (
                                        <div className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                                            <button
                                                onClick={handleCopy}
                                                className="w-full text-left px-3 py-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 text-sm font-medium text-slate-700"
                                            >
                                                <FaLink /> Copy Link
                                            </button>

                                            <button
                                                onClick={handleWhatsapp}
                                                className="w-full text-left px-3 py-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 text-sm font-medium text-slate-700"
                                            >
                                                <FaWhatsapp className="text-green-600" /> WhatsApp
                                            </button>

                                            <button
                                                onClick={handleFacebook}
                                                className="w-full text-left px-3 py-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 text-sm font-medium text-slate-700"
                                            >
                                                <FaFacebook className="text-blue-600" /> Facebook
                                            </button>

                                            <button
                                                onClick={handleInstagram}
                                                className="w-full text-left px-3 py-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 text-sm font-medium text-slate-700"
                                            >
                                                <FaInstagram className="text-pink-600" /> Instagram
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Spec Highlights */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Brand</span>
                                    <span className="font-bold text-slate-800 text-sm">{product.brand || "N/A"}</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Model</span>
                                    <span className="font-bold text-slate-800 text-sm">{product.model || "N/A"}</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Automation</span>
                                    <span className="font-bold text-slate-800 text-sm">{product.automation || "N/A"}</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Status</span>
                                    <span className="font-bold text-emerald-600 text-sm">{product.availability || "In Stock"}</span>
                                </div>
                            </div>

                            {/* Download Brochure CTA Button */}
                            <button
                                onClick={handleDownloadBrochure}
                                disabled={generatingPDF}
                                className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 mt-6 disabled:opacity-50 cursor-pointer text-base"
                            >
                                <FaDownload size={18} className="text-orange-400" />
                                {generatingPDF ? "Generating Brochure PDF..." : "Download Official Brochure (PDF)"}
                            </button>
                        </div>

                        {/* Product Description */}
                        <div className="bg-white p-6 sm:p-8 rounded-[28px] md:rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 space-y-4">
                            <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                                Product Description
                            </h3>

                            <p className="text-slate-600 leading-8 text-base md:text-lg">
                                {product.desc ||
                                    product.description ||
                                    "No description available."}
                            </p>

                            {/* Detailed Specifications Table */}
                            <div className="mt-6 overflow-x-auto">
                                <h4 className="text-base font-bold text-slate-800 mb-3">
                                    Technical Specifications
                                </h4>
                                <table className="w-full border border-slate-200 rounded-xl overflow-hidden text-left text-sm">
                                    <tbody>
                                        <tr className="bg-slate-50">
                                            <td className="border-b border-slate-200 p-3.5 font-bold text-slate-700 w-1/3">Brand</td>
                                            <td className="border-b border-slate-200 p-3.5 text-slate-600">{product.brand || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border-b border-slate-200 p-3.5 font-bold text-slate-700">Model</td>
                                            <td className="border-b border-slate-200 p-3.5 text-slate-600">{product.model || "N/A"}</td>
                                        </tr>
                                        <tr className="bg-slate-50">
                                            <td className="border-b border-slate-200 p-3.5 font-bold text-slate-700">Instrument Type</td>
                                            <td className="border-b border-slate-200 p-3.5 text-slate-600">{product.instrument || "Diagnostic Equipment"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border-b border-slate-200 p-3.5 font-bold text-slate-700">Usage</td>
                                            <td className="border-b border-slate-200 p-3.5 text-slate-600">{product.usage || "N/A"}</td>
                                        </tr>
                                        <tr className="bg-slate-50">
                                            <td className="border-b border-slate-200 p-3.5 font-bold text-slate-700">Automation Grade</td>
                                            <td className="border-b border-slate-200 p-3.5 text-slate-600">{product.automation || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border-b border-slate-200 p-3.5 font-bold text-slate-700">Capacity</td>
                                            <td className="border-b border-slate-200 p-3.5 text-slate-600">{product.capacity || "N/A"}</td>
                                        </tr>
                                        <tr className="bg-slate-50">
                                            <td className="border-b border-slate-200 p-3.5 font-bold text-slate-700">Throughput</td>
                                            <td className="border-b border-slate-200 p-3.5 text-slate-600">{product.throughput || "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

                {/* SEO Content Grid (Structured Cards below) */}
                <div className="bg-white p-6 sm:p-10 rounded-[28px] md:rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
                        Why Choose Raj Biosiss in {cityName}?
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">
                                Trusted Supplier in {cityName}
                            </h4>
                            <p className="text-slate-600 text-sm leading-6">
                                Raj Biosiss is a leading supplier and distributor of {product.title} in {cityName}, providing genuine biomedical equipment for hospitals and pathology labs.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">
                                Key Features & Performance
                            </h4>
                            <p className="text-slate-600 text-sm leading-6">
                                {product.title} offers high precision, fast analysis, low maintenance, and reliable diagnostic workflow for healthcare institutions.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">
                                Applications & Use Cases
                            </h4>
                            <p className="text-slate-600 text-sm leading-6">
                                Widely used in hospitals, clinical research institutes, pathology testing labs, diagnostic centres, and blood banks.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">
                                Installation & Service Support
                            </h4>
                            <p className="text-slate-600 text-sm leading-6">
                                We provide full technical support, on-site installation, operational training, and AMC maintenance assistance.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">
                                Competitive Pricing
                            </h4>
                            <p className="text-slate-600 text-sm leading-6">
                                Get competitive quotation for {product.title} in {cityName} with fast express delivery across India.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">
                                Guaranteed Quality
                            </h4>
                            <p className="text-slate-600 text-sm leading-6">
                                Certified diagnostic instruments built to meet international medical performance standards.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Structured FAQ Section */}
                <div className="bg-white p-6 sm:p-10 rounded-[28px] md:rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100">
                    <h3 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 border-b border-slate-100 pb-4">
                        Frequently Asked Questions
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-base text-slate-800">
                                What is {product.title} used for in {cityName}?
                            </h4>
                            <p className="text-slate-600 text-sm mt-2 leading-6">
                                It is used in hospitals, pathology laboratories and diagnostic centres for clinical testing and medical diagnostics.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-base text-slate-800">
                                How can I request a quotation for {product.title}?
                            </h4>
                            <p className="text-slate-600 text-sm mt-2 leading-6">
                                Simply fill out the Request A Quote form on this page or call our team directly at +91 9983123469.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-base text-slate-800">
                                Do you provide installation and staff training?
                            </h4>
                            <p className="text-slate-600 text-sm mt-2 leading-6">
                                Yes, our technical team provides on-site installation, setup, and comprehensive staff operation training.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-base text-slate-800">
                                Do you deliver across India?
                            </h4>
                            <p className="text-slate-600 text-sm mt-2 leading-6">
                                Yes, we supply and deliver diagnostic equipment across all cities and states in India with safe packaging.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}