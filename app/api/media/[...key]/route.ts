import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const resolvedParams = await params;
  const key = resolvedParams.key.map((segment) => decodeURIComponent(segment)).join("/");

  const asset = await prisma.mediaAsset.findUnique({
    where: { key },
    select: {
      data: true,
      mimeType: true,
      byteSize: true,
      updatedAt: true,
    },
  });

  if (!asset) {
    return new Response("Not found", { status: 404 });
  }

  const ifModifiedSince = request.headers.get("if-modified-since");
  if (ifModifiedSince) {
    const modifiedSinceDate = new Date(ifModifiedSince);
    if (!Number.isNaN(modifiedSinceDate.getTime()) && asset.updatedAt <= modifiedSinceDate) {
      return new Response(null, {
        status: 304,
        headers: {
          "Cache-Control":
            "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable",
          "Vercel-CDN-Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
          "CDN-Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
          "Last-Modified": asset.updatedAt.toUTCString(),
        },
      });
    }
  }

  return new Response(asset.data, {
    status: 200,
    headers: {
      "Content-Type": asset.mimeType,
      "Content-Length": String(asset.byteSize),
      "Cache-Control":
        "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable",
      "Vercel-CDN-Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
      "CDN-Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
      "Last-Modified": asset.updatedAt.toUTCString(),
    },
  });
}
