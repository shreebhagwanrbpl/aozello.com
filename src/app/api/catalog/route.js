import { fetchFullCatalog, fetchCategoriesTree } from "@/lib/data-fetcher-server";
import { WEBSITE_ID, COMPANY_ID } from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [products, categories] = await Promise.all([
      fetchFullCatalog({ websiteId: WEBSITE_ID, companyId: COMPANY_ID }),
      fetchCategoriesTree({ websiteId: WEBSITE_ID, companyId: COMPANY_ID }),
    ]);

    return Response.json(
      { success: true, companyId: COMPANY_ID, websiteId: WEBSITE_ID, products, categories },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Catalog API error:", error);
    return Response.json(
      { success: false, products: [], categories: [], error: error.message || "Catalog unavailable" },
      { status: 500 }
    );
  }
}

