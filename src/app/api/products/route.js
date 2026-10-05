import { fetchFullCatalog, fetchCatalogCategories } from "@/lib/data-fetcher-server";
import { WEBSITE_ID } from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const mode = new URL(request.url).searchParams.get("mode");
    const data =
      mode === "categories"
        ? await fetchCatalogCategories({ websiteId: WEBSITE_ID })
        : await fetchFullCatalog({ websiteId: WEBSITE_ID });

    return Response.json(
      { success: true, websiteId: WEBSITE_ID, data, products: mode === "categories" ? [] : data },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Products API error:", error);
    return Response.json(
      { success: false, data: [], products: [], error: error.message || "Products unavailable" },
      { status: 500 }
    );
  }
}

