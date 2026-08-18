import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import {
  makeSlug,
  generateCanonicalUrl,
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo-utils";
import { FEATURED_BRANDS } from "@/lib/constants";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brandName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `${brandName} Laboratory Equipment Supplier in India | Rajbiosis`;
  const description = `Authorized supplier and distributor of ${brandName} biomedical equipment, clinical analyzers, reagents and diagnostic test kits across India.`;
  const canonicalUrl = generateCanonicalUrl(`/brand/${slug}`);

  return {
    title,
    description,
    keywords: [
      brandName,
      `${brandName} Supplier`,
      `${brandName} Dealer India`,
      `${brandName} Price`,
      `${brandName} Analyzers`,
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
    },
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const allProducts = await fetchFullCatalog();

  const brandName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const matchingProducts = allProducts.filter((p) => {
    const pBrandSlug = makeSlug(p.brand || "");
    return (
      pBrandSlug === slug ||
      (p.brand || "").toLowerCase().includes(brandName.toLowerCase())
    );
  });

  const canonicalUrl = generateCanonicalUrl(`/brand/${slug}`);
  const collectionSchema = generateCollectionPageSchema(
    `${brandName} Equipment Catalog`,
    `Certified ${brandName} biomedical instruments and diagnostic solutions supplied by Rajbiosis Private Limited.`,
    canonicalUrl
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/items" },
    { name: `${brandName} Products`, url: `/brand/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageBanner
        title={`${brandName} Equipment & Analyzers`}
        subtitle={`Discover original ${brandName} diagnostic systems, laboratory analyzers, reagents, and healthcare testing solutions.`}
      />

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container-custom flex items-center gap-2 text-xs md:text-sm text-slate-600">
          <Link href="/" className="hover:text-red-600 transition font-medium">
            Home
          </Link>
          <span>/</span>
          <Link href="/items" className="hover:text-red-600 transition font-medium">
            Products Catalog
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{brandName}</span>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Brand Authority Hub"
            title={`Genuine ${brandName} Medical Technology`}
            description={`Rajbiosis Private Limited supplies certified ${brandName} products backed by technical warranty, installation support, and original OEM reagents.`}
          />

          {/* Brand Educational Banner */}
          <div className="mt-8 mb-12 p-8 rounded-3xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed text-sm md:text-base">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Why Choose {brandName} Products from Rajbiosis?
            </h3>
            <p>
              {brandName} is recognized globally for manufacturing robust, accurate, and scalable diagnostic analyzers. As a dedicated biomedical equipment supplier, Rajbiosis Private Limited ensures fast pan-India delivery, expert installation by trained engineers, routine calibration, and competitive pricing for all {brandName} equipment and consumables.
            </p>
          </div>

          {/* Product Grid */}
          {matchingProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {matchingProducts.map((item, index) => (
                <ProductCard key={item.uid || index} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
              <p className="text-lg font-bold text-slate-700">
                No items currently listed under this brand filter.
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Explore our full catalog or contact us directly for specific {brandName} model inquiries.
              </p>
              <Link href="/items" className="inline-block mt-6 primary-btn">
                View Full Catalog
              </Link>
            </div>
          )}

          {/* Featured Brands Link Cluster */}
          <div className="mt-16 pt-10 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Explore Products by Manufacturer & Brand
            </h3>
            <div className="flex flex-wrap gap-3">
              {FEATURED_BRANDS.map((b) => {
                const bSlug = makeSlug(b);
                return (
                  <Link
                    key={b}
                    href={`/brand/${bSlug}`}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition border ${
                      bSlug === slug
                        ? "bg-red-600 text-white border-red-600 shadow-md"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    {b}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
