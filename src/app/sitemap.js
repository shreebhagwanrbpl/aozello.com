import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { makeSlug } from "@/lib/seo-utils";
import { MAIN_CATEGORIES, FEATURED_BRANDS } from "@/lib/constants";

export const revalidate = 3600; 
export default async function sitemap() {
  const baseUrl = "https://aozello.com";
  const urls = [];
  const currentDate = new Date();

  urls.push(
    { url: baseUrl, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/items`, lastModified: currentDate, changeFrequency: "daily", priority: 0.9 }
  );

  MAIN_CATEGORIES.forEach((cat) => {
    urls.push({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  FEATURED_BRANDS.forEach((brand) => {
    urls.push({
      url: `${baseUrl}/brand/${makeSlug(brand)}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  try {
    
    const products = await fetchFullCatalog();
    const uniqueSlugs = new Set();

    products.forEach((product) => {
      if (!product.slug || uniqueSlugs.has(product.slug)) return;
      uniqueSlugs.add(product.slug);

      urls.push({
        url: `${baseUrl}/items/${product.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    });


    const districtSnap = await getDocs(
      collection(db, "websites", "aozellocom", "districts")
    );

    districtSnap.docs.forEach((docSnap) => {
      const data = docSnap.data();
      const slug = data.slug || makeSlug(data.district || docSnap.id);

      if (!slug) return;
      

      urls.push({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error("[Sitemap Generation Error]:", error);
  }

  return urls;
}