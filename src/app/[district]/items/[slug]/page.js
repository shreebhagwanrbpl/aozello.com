import ProductDetails from "../../../items/[slug]/ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { makeSlug, generateCanonicalUrl } from "@/lib/seo-utils";

export async function generateMetadata({ params }) {
    const { slug, district } = await params;
    const allProducts = await fetchFullCatalog();

    const districtName = (district || "jaipur")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const product = allProducts.find((p) => p.slug === slug || makeSlug(p.title) === slug);
    const productName = product?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${productName} Supplier in ${districtName} | Rajbiosis`;
    const description = `Buy ${productName} in ${districtName}. Trusted biomedical equipment supplier, dealer and distributor of ${productName} for hospitals, labs and diagnostic centers in ${districtName}.`;

    // Canonicalized to authoritative main product URL to consolidate ranking power
    const canonicalUrl = generateCanonicalUrl(`/items/${slug}`);

    return {
        title,
        description,
        keywords: [
            `${productName} ${districtName}`,
            `${productName} Supplier ${districtName}`,
            `${productName} Price ${districtName}`,
            `Biomedical Equipment ${districtName}`,
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
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function Page({ params }) {
    const { slug, district } = await params;
    const allProducts = await fetchFullCatalog();
    const product = allProducts.find((p) => p.slug === slug || makeSlug(p.title) === slug) || null;

    return (
        <ProductDetails
            slug={slug}
            district={district}
            product={product}
        />
    );
}