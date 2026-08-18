import {
  SITE_URL,
  COMPANY_NAME,
  DEFAULT_PHONE,
  DEFAULT_PHONE_RAW,
  DEFAULT_EMAIL,
  DEFAULT_ADDRESS,
  DEFAULT_SEO_QUALITY_THRESHOLD
} from "./constants";

export function makeSlug(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function generateCanonicalUrl(path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: DEFAULT_PHONE,
      contactType: "sales & customer service",
      email: DEFAULT_EMAIL,
      areaServed: "IN",
      availableLanguage: ["en", "hi"]
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, 200 Feet Bypass Rd",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302021",
      addressCountry: "IN"
    },
    sameAs: [
      "https://www.instagram.com/rajbiosisindia/",
      "https://www.facebook.com/rajbiosispvtltd/"
    ]
  };
}

export function generateLocalBusinessSchema(districtName = "Jaipur") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${COMPANY_NAME} - ${districtName}`,
    image: `${SITE_URL}/logo.png`,
    "@id": `${SITE_URL}/#localbusiness-${makeSlug(districtName)}`,
    url: `${SITE_URL}/${makeSlug(districtName)}`,
    telephone: DEFAULT_PHONE,
    email: DEFAULT_EMAIL,
    priceRange: "₹₹-₹₹₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: districtName,
      addressRegion: "India",
      addressCountry: "IN"
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: districtName
    },
    description: `Leading supplier and distributor of biomedical equipment, diagnostic analyzers, hematology instruments, and laboratory reagents in ${districtName}.`
  };
}

export function generateProductSchema(product, districtName = "") {
  if (!product) return null;

  const productName = product.title || "Biomedical Equipment";
  const image = product.images?.[0] || product.image || `${SITE_URL}/logo.png`;
  const formattedImage = image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;

  const locationSuffix = districtName ? ` in ${districtName}` : " in India";
  const description = product.desc || product.description || `Buy ${productName} from trusted biomedical supplier${locationSuffix}. Direct quotation, genuine OEM quality, installation and AMC support available.`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${productName}${districtName ? ` - ${districtName}` : ""}`,
    image: [formattedImage],
    description,
    sku: product.uid || product.slug || makeSlug(productName),
    mpn: product.model || product.slug || makeSlug(productName),
    brand: {
      "@type": "Brand",
      name: product.brand || COMPANY_NAME
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      price: product.price || "On Request",
      lowPrice: "1000",
      highPrice: "500000",
      offerCount: "1",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: COMPANY_NAME
      }
    }
  };
}

export function generateFaqSchema(faqs = []) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(itemList = []) {
  if (!itemList || itemList.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`
    }))
  };
}

export function generateCollectionPageSchema(title, description, url) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`
  };
}

/**
 * Programmatic SEO Quality Gate (0 - 100)
 * Evaluates technical, content, link, and intent signals to determine indexability.
 */
export function evaluateSeoQualityScore(pageData = {}) {
  let score = 0;

  // Technical SEO (Max 20)
  if (pageData.hasCanonical) score += 10;
  if (pageData.hasValidRobots) score += 10;

  // Content Quality (Max 20)
  const wordCount = pageData.wordCount || 0;
  if (wordCount > 300) score += 20;
  else if (wordCount > 150) score += 10;
  else if (wordCount > 50) score += 5;

  // Search Intent (Max 15)
  if (pageData.hasClearIntent) score += 15;
  else if (pageData.title) score += 10;

  // Internal Linking (Max 10)
  const linkCount = pageData.internalLinkCount || 0;
  if (linkCount >= 5) score += 10;
  else if (linkCount >= 2) score += 5;

  // Metadata (Max 10)
  if (pageData.hasUniqueTitle) score += 5;
  if (pageData.hasUniqueMetaDescription) score += 5;

  // Structured Data (Max 10)
  if (pageData.hasStructuredData) score += 10;

  // Performance / Images (Max 10)
  if (pageData.hasOptimizedImages) score += 5;
  if (pageData.hasAltAttributes) score += 5;

  // Local / Entity Relevance (Max 5)
  if (pageData.hasEntityRelevance) score += 5;

  return {
    score,
    isIndexable: score >= DEFAULT_SEO_QUALITY_THRESHOLD,
    reasons: {
      technical: pageData.hasCanonical && pageData.hasValidRobots,
      content: wordCount > 150,
      links: linkCount >= 2,
      metadata: pageData.hasUniqueTitle && pageData.hasUniqueMetaDescription
    }
  };
}
