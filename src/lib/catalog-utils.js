/**
 * Single source of truth for this website's catalog identity.
 * Keep WEBSITE_ID fixed for this website so MongoDB/Admin API mapping is stable.
 */
export const WEBSITE_ID = "aozellocom";
export const COMPANY_ID = "rajbiosis";

export function normalizeDomainId(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[.\-\s]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

export function isExactWebsiteMatch(itemWebsiteId, targetWebsiteId = WEBSITE_ID) {
  return normalizeDomainId(itemWebsiteId) === normalizeDomainId(targetWebsiteId);
}

export function isItemVisibleOnWebsite(item, targetWebsiteId = WEBSITE_ID) {
  if (!item || typeof item !== "object") return false;
  if (item.isPublished === false) return false;

  const status = String(item.status || "").trim().toLowerCase();
  if (status === "inactive" || status === "draft") return false;

  if (Array.isArray(item.websiteIds)) {
    if (item.websiteIds.length === 0) return false;
    if (item.websiteIds.some((id) => normalizeDomainId(id) === "all")) return true;
    return item.websiteIds.some((id) => isExactWebsiteMatch(id, targetWebsiteId));
  }

  // Legacy records without websiteIds remain visible unless explicitly hidden.
  return true;
}

export const isItemVisibleForWebsite = isItemVisibleOnWebsite;
export const normalizeId = normalizeDomainId;

export function visibilityWithParents(item, category, subcategory, targetWebsiteId = WEBSITE_ID) {
  if (category && !isItemVisibleOnWebsite(category, targetWebsiteId)) return false;
  if (subcategory && !isItemVisibleOnWebsite(subcategory, targetWebsiteId)) return false;
  return isItemVisibleOnWebsite(item, targetWebsiteId);
}

export function makeSlug(text = "") {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
