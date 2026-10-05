import { WEBSITE_ID, COMPANY_ID } from "./catalog-utils.js";

export const ADMIN_API_BASE_URL = (
  process.env.ADMIN_API_BASE_URL ||
  process.env.ADMIN_API_URL ||
  "https://admin.rajbiosis.app"
).replace(/\/+$/, "");

function buildUrl(pathname, params = {}) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const url = new URL(`${ADMIN_API_BASE_URL}${path}`);

  Object.entries({
    websiteId: WEBSITE_ID,
    companyId: COMPANY_ID,
    ...params,
  }).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

export async function adminFetch(pathname, options = {}, params = {}) {
  const controller = new AbortController();
  const timeoutMs = options.timeout || 35000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const fetchOptions = {
      ...options,
      signal: options.signal || controller.signal,
      next: options.next || { revalidate: 300 }, // 5 minutes cache by default in Next.js
      headers: {
        Accept: "application/json",
        ...(options.headers || {}),
      },
    };

    // If cache option is explicitly provided, use it
    if (options.cache) {
      fetchOptions.cache = options.cache;
    }

    const response = await fetch(buildUrl(pathname, params), fetchOptions);
    clearTimeout(timer);

    const text = await response.text();
    let body = null;

    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }

    if (!response.ok || body?.success === false || body?.ok === false) {
      throw new Error(
        `Admin API ${response.status}: ${
          typeof body === "string" ? body : JSON.stringify(body)
        }`
      );
    }

    return body;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

export async function postAdminQuery(endpoint, payload = {}) {
  return adminFetch(endpoint, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      websiteId: WEBSITE_ID,
      companyId: COMPANY_ID,
      ...payload,
    }),
  });
}

export async function submitAdminQuery(endpoint, payload = {}) {
  return postAdminQuery(endpoint, payload);
}

export async function fetchAdminSiteData(pageType, district = "") {
  return adminFetch("/api/site-data", { next: { revalidate: 300 } }, {
    type: pageType,
    pageType,
    district,
  });
}

export async function fetchCatalogPayloadFromAdmin() {
  const json = await adminFetch("/api/catalog", { next: { revalidate: 300 } });
  const products = Array.isArray(json?.products)
    ? json.products
    : Array.isArray(json?.data?.products)
      ? json.data.products
      : Array.isArray(json?.data)
        ? json.data
        : Array.isArray(json)
          ? json
          : [];

  const categories = Array.isArray(json?.categories)
    ? json.categories
    : Array.isArray(json?.data?.categories)
      ? json.data.categories
      : [];

  return { products, categories, raw: json };
}

export async function fetchCatalogFromAdmin() {
  const { products } = await fetchCatalogPayloadFromAdmin();
  return products;
}

