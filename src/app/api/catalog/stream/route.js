import { fetchFullCatalog } from "@/lib/data-fetcher-server";

export const dynamic = "force-dynamic";

function fingerprint(products) {
  const list = Array.isArray(products) ? products : [];
  return list
    .map((p) => [
      p.id || p.uid || p.productId || p.slug || "",
      p.updatedAt || p.updated_at || p.updatedOn || "",
      p.isPublished === false ? "0" : "1",
    ].join("|"))
    .sort()
    .join("||");
}

export async function GET(request) {
  const encoder = new TextEncoder();
  let timer;
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event, data) => {
        if (closed) return;
        try {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        } catch {
          closed = true;
        }
      };

      let lastFingerprint = "";

      const check = async () => {
        if (closed) return;

        try {
          const products = await fetchFullCatalog();
          const nextFingerprint = fingerprint(products);

          if (!lastFingerprint) {
            lastFingerprint = nextFingerprint;
            send("ready", { updatedAt: new Date().toISOString(), count: products.length });
          } else if (nextFingerprint !== lastFingerprint) {
            lastFingerprint = nextFingerprint;
            send("catalog-changed", { updatedAt: new Date().toISOString(), count: products.length });
          }
        } catch (error) {
          send("error", { message: error.message || "Catalog sync failed" });
        }
      };

      await check();
      timer = setInterval(check, 60000); // Check once per minute

      request.signal?.addEventListener("abort", () => {
        closed = true;
        clearInterval(timer);
        try { controller.close(); } catch {}
      });
    },

    cancel() {
      closed = true;
      clearInterval(timer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

