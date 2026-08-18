import { generateCanonicalUrl } from "@/lib/seo-utils";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const canonicalUrl = generateCanonicalUrl(`/${district}`);

  return {
    title: `Biomedical & Diagnostic Equipment Supplier in ${districtName} | Rajbiosis`,

    description: `Rajbiosis Private Limited is the trusted supplier and distributor of clinical analyzers, laboratory instruments, pathology equipment, and reagents in ${districtName}.`,

    keywords: [
      `Biomedical Equipment Supplier in ${districtName}`,
      `Diagnostic Machines ${districtName}`,
      `Laboratory Equipment Supplier ${districtName}`,
      `Pathology Equipment ${districtName}`,
      `Biomedical Supplier ${districtName}`,
      `CBC Machine Price ${districtName}`,
      `Hematology Analyzer ${districtName}`,
      "Rajbiosis Private Limited"
    ],

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: `Biomedical & Diagnostic Equipment Supplier in ${districtName} | Rajbiosis`,
      description: `Leading diagnostic laboratory equipment and reagent supplier in ${districtName}.`,
      url: canonicalUrl,
      siteName: "Rajbiosis Private Limited",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `Biomedical Equipment in ${districtName} | Rajbiosis`,
      description: `Diagnostic equipment supplier in ${districtName}.`,
    }
  };
}

export default function DistrictLayout({ children }) {
  return children;
}