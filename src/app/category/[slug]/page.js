import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  makeSlug,
  generateCanonicalUrl,
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo-utils";
import { MAIN_CATEGORIES } from "@/lib/constants";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = MAIN_CATEGORIES.find((c) => c.slug === slug) || {
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: `Browse advanced ${slug.replace(/-/g, " ")} equipment, analyzers, and diagnostic solutions from Rajbiosis Private Limited.`,
  };

  const title = `${category.name} Supplier & Distributor in India | Rajbiosis`;
  const description = `${category.description} High precision instruments, genuine OEM reagents, warranty and prompt technical support across India.`;
  const canonicalUrl = generateCanonicalUrl(`/category/${slug}`);

  return {
    title,
    description,
    keywords: [
      category.name,
      `${category.name} Supplier`,
      `${category.name} Price in India`,
      `${category.name} Distributor`,
      "Biomedical Equipment",
      "Laboratory Equipment",
      "Diagnostic Analyzers",
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

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const allProducts = await fetchFullCatalog();

  const categoryObj = MAIN_CATEGORIES.find((c) => c.slug === slug);
  const categoryName = categoryObj
    ? categoryObj.name
    : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Filter products by matching category name or slug
  const matchingProducts = allProducts.filter((p) => {
    const pCatSlug = makeSlug(p.category || "");
    const pSubCatSlug = makeSlug(p.subCategory || "");
    return (
      pCatSlug === slug ||
      pSubCatSlug === slug ||
      (p.category || "").toLowerCase().includes(categoryName.toLowerCase())
    );
  });

  const canonicalUrl = generateCanonicalUrl(`/category/${slug}`);
  const collectionSchema = generateCollectionPageSchema(
    `${categoryName} Equipment Hub`,
    `Comprehensive collection of ${categoryName} supplied by Rajbiosis Private Limited across India.`,
    canonicalUrl
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/items" },
    { name: categoryName, url: `/category/${slug}` },
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
        title={`${categoryName} Solutions`}
        subtitle={
          categoryObj?.description ||
          `High quality ${categoryName} instruments, analyzers, and consumables for pathology laboratories, hospitals, and diagnostic institutions across India.`
        }
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
          <span className="text-slate-900 font-bold">{categoryName}</span>
        </div>
      </div>

      {/* Main Catalog & Educational Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Topical Category Hub"
            title={`High Precision ${categoryName} Equipment`}
            description={`Explore our certified range of ${categoryName} instruments, designed for medical accuracy, speed, and long-term operating durability.`}
          />

          {/* Educational Overview Card */}
          <div className="mt-8 mb-12 p-8 rounded-3xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed text-sm md:text-base">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Understanding {categoryName} in Modern Clinical Diagnostics
            </h3>
            <p className="mb-4">
              {categoryName} forms the backbone of reliable medical diagnostics, allowing pathology laboratories, hospital ICU setups, and clinical testing centers to evaluate vital health indicators with precision. Rajbiosis Private Limited supplies genuine, quality-tested instruments backed by comprehensive installation, calibration, and AMC/CMC technical support across India.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1">Key Applications</h4>
                <p className="text-xs text-slate-600">Hospitals, Pathology Labs, Blood Banks & Emergency Diagnostic Centers.</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1">Service & Support</h4>
                <p className="text-xs text-slate-600">24/7 technical hotline, express OEM reagent delivery & annual maintenance.</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1">Quality Standards</h4>
                <p className="text-xs text-slate-600">ISO-certified manufacturing compliance and genuine manufacturer warranty.</p>
              </div>
            </div>
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
                No items currently listed under this specific category view.
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Browse our complete product catalog or contact our technical team for custom quotations.
              </p>
              <Link href="/items" className="inline-block mt-6 primary-btn">
                View Full Catalog
              </Link>
            </div>
          )}

          {/* Category Internal Linking Cluster */}
          <div className="mt-16 pt-10 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Explore Related Biomedical Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {MAIN_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition border ${
                    cat.slug === slug
                      ? "bg-red-600 text-white border-red-600 shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
