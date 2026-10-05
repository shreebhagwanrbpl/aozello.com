import {
  COMPANY_ID,
  WEBSITE_ID,
  makeSlug,
  isItemVisibleOnWebsite,
} from "./catalog-utils.js";
import {
  adminFetch,
  fetchCatalogPayloadFromAdmin,
} from "./admin-api.js";

export { makeSlug };

function normalizeProduct(product = {}, fallbackIdx = 0) {
  const title = product.title || product.name || "Biomedical Equipment";

  const images =
    Array.isArray(product.images) && product.images.length
      ? product.images
      : product.image
        ? [product.image]
        : product.imageUrl
          ? [product.imageUrl]
          : product.imgUrl
            ? [product.imgUrl]
            : [];

  const fallbackId = `${makeSlug(title) || "product"}-${fallbackIdx}`;

  return {
    ...product,
    id: product.id || product.uid || product.productId || fallbackId,
    productId: product.productId || product.id || product.uid || fallbackId,
    uid: product.uid || product.id || product.productId || fallbackId,
    title,
    name: title,
    slug: product.slug || makeSlug(title),
    price: product.price ?? "",
    desc: product.desc ?? product.description ?? "",
    description: product.description ?? product.desc ?? "",
    category: product.category || "Diagnostic & Laboratory Equipment",
    categoryId:
      product.categoryId ||
      product.categoryID ||
      makeSlug(product.category || "diagnostic"),
    subCategory:
      product.subCategory ||
      product.subcategory ||
      product.category ||
      "General",
    subcategoryId:
      product.subcategoryId ||
      product.subCategoryId ||
      makeSlug(
        product.subCategory ||
          product.subcategory ||
          product.category ||
          "general"
      ),
    companyId: product.companyId || COMPANY_ID,
    images,
    image: images[0] || product.image || "",
    video: product.video || "",
    pdf: product.pdf || "",
    brand: product.brand || "",
    model: product.model || "",
    capacity: product.capacity || "",
    throughput: product.throughput || "",
    instrument: product.instrument || "",
    usage: product.usage || "",
    parameters: product.parameters || "",
    automation: product.automation || "",
    availability: product.availability || "",
    size: product.size || "",
    isPublished: product.isPublished !== false,
    websiteIds: Array.isArray(product.websiteIds) ? product.websiteIds : product.websiteIds,
  };
}

function unwrapSiteData(json) {
  return json?.data ?? json?.pages ?? json ?? null;
}

// -------------------------------------------------------------
// In-Memory Global Cache & In-Flight Promise Deduplication
// -------------------------------------------------------------
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

let catalogCache = {
  products: null,
  categories: null,
  timestamp: 0,
  promise: null,
};

const siteDataCache = new Map();
const siteDataPromises = new Map();

async function getCachedCatalogPayload({ companyId = COMPANY_ID, websiteId = WEBSITE_ID } = {}) {
  const now = Date.now();

  // Return existing valid cache
  if (
    catalogCache.products &&
    catalogCache.categories &&
    now - catalogCache.timestamp < CACHE_TTL_MS
  ) {
    return {
      products: catalogCache.products,
      categories: catalogCache.categories,
    };
  }

  // If already fetching in-flight, return the same promise to prevent concurrent hammering
  if (catalogCache.promise) {
    return catalogCache.promise;
  }

  // Start fresh fetch with promise deduplication
  catalogCache.promise = (async () => {
    try {
      const payload = await fetchCatalogPayloadFromAdmin();
      const rawProducts = Array.isArray(payload.products) ? payload.products : [];
      const rawCategories = Array.isArray(payload.categories) ? payload.categories : [];

      // 1. Process and normalize products
      const filteredProducts = rawProducts
        .filter((item) => isItemVisibleOnWebsite(item, websiteId))
        .map((item, idx) => normalizeProduct(item, idx));

      // 2. Process and normalize categories
      let processedCategories = [];
      if (rawCategories.length > 0) {
        processedCategories = rawCategories
          .filter((cat) => isItemVisibleOnWebsite(cat, websiteId))
          .map((category) => ({
            ...category,
            id: category.id || category.categoryId || makeSlug(category.name || category.category || "general"),
            name: category.name || category.category || category.title || "General",
            category: category.category || category.name || category.title || "General",
            slug: category.slug || makeSlug(category.name || category.category || "general"),
            subcategories: Array.isArray(category.subcategories)
              ? category.subcategories
                  .filter((sub) => isItemVisibleOnWebsite(sub, websiteId))
                  .map((sub) => ({
                    ...sub,
                    id: sub.id || sub.subcategoryId || makeSlug(sub.name || sub.subCategory || "general"),
                    name: sub.name || sub.subCategory || "General",
                    subCategory: sub.subCategory || sub.name || "General",
                    slug: sub.slug || makeSlug(sub.name || sub.subCategory || "general"),
                    productsCount:
                      sub.productsCount ??
                      (Array.isArray(sub.products) ? sub.products.length : 0),
                  }))
              : [],
            totalProductsCount:
              category.totalProductsCount ??
              (Array.isArray(category.products) ? category.products.length : 0),
          }));
      }

      // If categories not in payload or empty, derive from products
      if (processedCategories.length === 0 && filteredProducts.length > 0) {
        const categoryMap = new Map();

        for (const product of filteredProducts) {
          const categoryId = product.categoryId || makeSlug(product.category || "general");
          const categoryName = product.category || categoryId;

          if (!categoryMap.has(categoryId)) {
            categoryMap.set(categoryId, {
              id: categoryId,
              name: categoryName,
              category: categoryName,
              slug: makeSlug(categoryName),
              products: [],
              subcategories: new Map(),
            });
          }

          const category = categoryMap.get(categoryId);
          category.products.push(product);

          const subcategoryId = product.subcategoryId || makeSlug(product.subCategory || "general");
          const subcategoryName = product.subCategory || subcategoryId;

          if (!category.subcategories.has(subcategoryId)) {
            category.subcategories.set(subcategoryId, {
              id: subcategoryId,
              name: subcategoryName,
              subCategory: subcategoryName,
              slug: makeSlug(subcategoryName),
              products: [],
              productsCount: 0,
            });
          }

          const subcategory = category.subcategories.get(subcategoryId);
          subcategory.products.push(product);
          subcategory.productsCount += 1;
        }

        processedCategories = [...categoryMap.values()].map((cat) => ({
          ...cat,
          subcategories: [...cat.subcategories.values()],
          totalProductsCount: cat.products.length,
        }));
      }

      // Store in global cache
      catalogCache.products = filteredProducts;
      catalogCache.categories = processedCategories;
      catalogCache.timestamp = Date.now();

      return {
        products: filteredProducts,
        categories: processedCategories,
      };
    } catch (err) {
      console.error("Admin catalog fetch error:", err);
      // If stale cache exists, serve stale data instead of failing
      if (catalogCache.products && catalogCache.categories) {
        console.warn("Serving stale cached catalog data due to fetch failure");
        return {
          products: catalogCache.products,
          categories: catalogCache.categories,
        };
      }
      return { products: [], categories: [] };
    } finally {
      catalogCache.promise = null;
    }
  })();

  return catalogCache.promise;
}

export async function fetchFullCatalog(options = {}) {
  const { products } = await getCachedCatalogPayload(options);
  return products || [];
}

export async function fetchCategoriesTree(options = {}) {
  const { categories } = await getCachedCatalogPayload(options);
  return categories || [];
}

export async function fetchCatalogCategories(options = {}) {
  const tree = await fetchCategoriesTree(options);
  return tree.map((category) => category.name || category.category || category.id);
}

export async function fetchSitePage(pageType, websiteId = WEBSITE_ID) {
  const cacheKey = `${websiteId}:${COMPANY_ID}:${pageType}`;
  const now = Date.now();

  const cached = siteDataCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (siteDataPromises.has(cacheKey)) {
    return siteDataPromises.get(cacheKey);
  }

  const promise = (async () => {
    try {
      const json = await adminFetch(
        "/api/site-data",
        { next: { revalidate: 300 } },
        { type: pageType, pageType, websiteId, companyId: COMPANY_ID }
      );
      const unwrapped = unwrapSiteData(json);
      siteDataCache.set(cacheKey, { data: unwrapped, timestamp: Date.now() });
      return unwrapped;
    } catch (error) {
      console.error(`Admin MongoDB ${pageType} fetch failed:`, error);
      if (cached) {
        console.warn(`Serving stale cached ${pageType} data due to error`);
        return cached.data;
      }
      return null;
    } finally {
      siteDataPromises.delete(cacheKey);
    }
  })();

  siteDataPromises.set(cacheKey, promise);
  return promise;
}

export async function fetchDocCached(pathValue) {
  const parts = String(pathValue || "").split("/");
  const pageIndex = parts.indexOf("pages");
  if (pageIndex >= 0 && parts[pageIndex + 1]) {
    return fetchSitePage(parts[pageIndex + 1]);
  }
  return null;
}

export async function fetchHomeData() {
  return fetchSitePage("home");
}

export async function fetchContactData() {
  return fetchSitePage("contact");
}

export async function fetchServicesData() {
  return fetchSitePage("services");
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  const cacheKey = `${WEBSITE_ID}:${COMPANY_ID}:district:${district}`;
  const now = Date.now();

  const cached = siteDataCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (siteDataPromises.has(cacheKey)) {
    return siteDataPromises.get(cacheKey);
  }

  const promise = (async () => {
    try {
      const json = await adminFetch(
        "/api/site-data",
        { next: { revalidate: 300 } },
        {
          type: "district",
          pageType: "district",
          district,
          websiteId: WEBSITE_ID,
          companyId: COMPANY_ID,
        }
      );
      const unwrapped = unwrapSiteData(json);
      siteDataCache.set(cacheKey, { data: unwrapped, timestamp: Date.now() });
      return unwrapped;
    } catch (error) {
      console.error("Admin MongoDB district fetch failed:", error);
      if (cached) return cached.data;
      return null;
    } finally {
      siteDataPromises.delete(cacheKey);
    }
  })();

  siteDataPromises.set(cacheKey, promise);
  return promise;
}

export async function fetchDistricts({ companyId = COMPANY_ID, websiteId = WEBSITE_ID } = {}) {
  const cacheKey = `${websiteId}:${companyId}:districts`;
  const now = Date.now();

  const cached = siteDataCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (siteDataPromises.has(cacheKey)) {
    return siteDataPromises.get(cacheKey);
  }

  const promise = (async () => {
    try {
      const json = await adminFetch(
        "/api/site-data",
        { next: { revalidate: 300 } },
        {
          type: "districts",
          pageType: "districts",
          websiteId,
          companyId,
        }
      );

      const data = json?.data ?? json?.districts ?? json;
      if (!Array.isArray(data)) return [];

      const result = data.map((district, idx) => ({
        id: district.id || district.slug || `dist-${idx}`,
        ...district,
        slug:
          district.slug ||
          district.id ||
          makeSlug(district.district || district.name || `dist-${idx}`),
      }));

      siteDataCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    } catch (error) {
      console.error("Admin MongoDB districts fetch failed:", error);
      if (cached) return cached.data;
      return [];
    } finally {
      siteDataPromises.delete(cacheKey);
    }
  })();

  siteDataPromises.set(cacheKey, promise);
  return promise;
}

