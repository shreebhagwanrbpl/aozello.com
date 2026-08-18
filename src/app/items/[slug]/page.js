import ProductDetails from "./ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { makeSlug, generateCanonicalUrl } from "@/lib/seo-utils";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const allProducts = await fetchFullCatalog();
    const product = allProducts.find((p) => p.slug === slug || makeSlug(p.title) === slug);

    const productName = product?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const brandName = product?.brand ? `${product.brand} ` : "";
    const categoryName = product?.category || "Biomedical Equipment";

    const title = `${productName} Supplier in India | ${brandName}Price & Quotation | Rajbiosis`;
    const description = product?.desc || product?.description ||
        `Buy ${productName} at best price from Rajbiosis Private Limited. Trusted supplier, dealer and distributor of ${productName} for hospitals, clinical laboratories, pathology setups and diagnostic centers across India.`;

    const canonicalUrl = generateCanonicalUrl(`/items/${slug}`);
    const imageUrl = product?.images?.[0] || product?.image || "https://aozello.com/logo.png";
    const absoluteImageUrl = imageUrl.startsWith("http") ? imageUrl : `https://aozello.com${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;

    return {
        title,
        description,
        keywords: [
            productName,
            `${productName} Supplier`,
            `${productName} Dealer`,
            `${productName} Distributor`,
            `${productName} Manufacturer`,
            `${productName} Price`,
            `${productName} Quotation`,
            `${productName} Price in India`,
            `${productName} Supplier in India`,
            `${productName} Laboratory Equipment`,
            `${productName} Diagnostic Analyzer`,
            categoryName,
            "Biomedical Equipment Supplier",
            "Rajbiosis Private Limited",
        ],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "Rajbiosis Private Limited",
            type: "website",
            locale: "en_IN",
            images: [
                {
                    url: absoluteImageUrl,
                    width: 800,
                    height: 600,
                    alt: `${productName} - Rajbiosis Private Limited`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [absoluteImageUrl],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    const allProducts = await fetchFullCatalog();
    const product = allProducts.find((p) => p.slug === slug || makeSlug(p.title) === slug) || null;

    if (!product) {
        // Fallback product structure if slug matches generic text
        const fallbackName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        const fallbackProduct = {
            title: fallbackName,
            slug: slug,
            category: "Diagnostic Equipment",
            desc: `High performance ${fallbackName} for hospitals and pathology labs.`,
            brand: "Rajbiosis",
        };
        return <ProductDetails slug={slug} product={fallbackProduct} />;
    }

    return <ProductDetails slug={slug} product={product} />;
}