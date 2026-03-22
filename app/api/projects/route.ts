import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      points: {
        orderBy: { sortOrder: "asc" },
      },
      images: {
        orderBy: { sortOrder: "asc" },
        include: {
          media: {
            select: {
              key: true,
            },
          },
        },
      },
    },
  });

  const payload = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    tech: project.tech,
    status: project.status,
    detail: project.detail,
    showStatus: project.showStatus,
    points: project.points.map((point) => point.content),
    images: project.images.map((image) => ({
      src: `/api/media/${image.media.key}`,
      alt: image.alt,
      width: image.width ?? undefined,
      height: image.height ?? undefined,
    })),
  }));

  return NextResponse.json(payload);
}
