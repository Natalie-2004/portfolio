import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
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

  return new Response(asset.data, {
    status: 200,
    headers: {
      "Content-Type": asset.mimeType,
      "Content-Length": String(asset.byteSize),
      "Cache-Control": "public, max-age=31536000, immutable",
      "Last-Modified": asset.updatedAt.toUTCString(),
    },
  });
}
