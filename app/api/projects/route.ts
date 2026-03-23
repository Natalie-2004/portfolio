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

  type ProjectWithRelations = (typeof projects)[number];
  type ProjectPoint = ProjectWithRelations["points"][number];
  type ProjectImage = ProjectWithRelations["images"][number];

  const payload = projects.map((project: ProjectWithRelations) => ({
    slug: project.slug,
    title: project.title,
    tech: project.tech,
    status: project.status,
    detail: project.detail,
    showStatus: project.showStatus,
    points: project.points.map((point: ProjectPoint) => point.content),
    images: project.images.map((image: ProjectImage) => ({
      src: `/api/media/${image.media.key}`,
      alt: image.alt,
      width: image.width ?? undefined,
      height: image.height ?? undefined,
    })),
  }));

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
      "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
