import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    );
  }

  // If local path, pass through
  if (imageUrl.startsWith("/")) {
    return NextResponse.json({ dataUrl: imageUrl });
  }

  try {
    const res = await fetch(imageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Proxy fetch failed for ${imageUrl}: ${res.status}`);
      return NextResponse.json(
        { error: `Fetch failed with status ${res.status}` },
        { status: 500 }
      );
    }

    const arrayBuffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:${contentType};base64,${base64}`;

    return NextResponse.json({ dataUrl });
  } catch (err) {
    console.error("Proxy image error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
