import { Suspense } from "react";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "./ProductsClient";

export const revalidate = 3600; // Revalidate cache every hour

export default async function ProductsPage({ district = null, city = null }) {
  // Fetch full catalog from server cache
  const allProducts = await fetchFullCatalog();

  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading products...</div>}>
      <ProductsClient
        initialProducts={allProducts}
        district={district}
        city={city}
      />
    </Suspense>
  );
}