import {
  fetchHomeData,
  fetchContactData,
  fetchServicesData,
  fetchDistrictData,
  fetchSitePage,
} from "@/lib/data-fetcher-server";
import { WEBSITE_ID } from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const page =
    params.get("page") ||
    params.get("pageType") ||
    params.get("type") ||
    "home";
  const district = params.get("district");

  try {
    let data = null;

    if (district || page === "district") {
      data = await fetchDistrictData(district);
    } else if (page === "home") {
      data = await fetchHomeData();
    } else if (page === "contact") {
      data = await fetchContactData();
    } else if (page === "services") {
      data = await fetchServicesData();
    } else {
      data = await fetchSitePage(page, WEBSITE_ID);
    }

    return Response.json(
      { success: true, websiteId: WEBSITE_ID, pageType: page, data: data || {} },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Site data API error:", error);
    return Response.json(
      { success: false, error: error.message || "Site data unavailable", data: null },
      { status: 500 }
    );
  }
}

