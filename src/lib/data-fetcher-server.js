import {
  fetchFullCatalog as fetchFullCatalogRaw,
  fetchCategoriesTree as fetchCategoriesTreeRaw,
  fetchCatalogCategories as fetchCatalogCategoriesRaw,
  fetchHomeData,
  fetchContactData,
  fetchServicesData,
  fetchDistrictData,
  fetchDistricts,
  fetchSitePage,
  fetchDocCached,
} from "./data-fetcher";

export const dynamic = "force-dynamic";

export async function fetchFullCatalog(options = {}) {
  return fetchFullCatalogRaw(options);
}

export async function fetchCategoriesTree(options = {}) {
  return fetchCategoriesTreeRaw(options);
}

export async function fetchCatalogCategories(options = {}) {
  return fetchCatalogCategoriesRaw(options);
}

export {
  fetchHomeData,
  fetchContactData,
  fetchServicesData,
  fetchDistrictData,
  fetchDistricts,
  fetchSitePage,
  fetchDocCached,
};
