import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "../lib/prisma";
import { projectData, projectDataDetail } from "../app/project/share/data";

const MIME_BY_EXTENSION: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

function getMimeType(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase();
  return MIME_BY_EXTENSION[extension] ?? "application/octet-stream";
}

function toPublicFilePath(src: string): string {
  return path.join(process.cwd(), "public", src.replace(/^\//, ""));
}

async function upsertMediaFromFile(key: string, absoluteFilePath: string) {
  const fileBuffer = await readFile(absoluteFilePath);
  const fileName = path.basename(absoluteFilePath);
  const mimeType = getMimeType(absoluteFilePath);

  return prisma.mediaAsset.upsert({
    where: { key },
    update: {
      fileName,
      mimeType,
      byteSize: fileBuffer.length,
      data: fileBuffer,
    },
    create: {
      key,
      fileName,
      mimeType,
      byteSize: fileBuffer.length,
      data: fileBuffer,
    },
    select: { id: true, key: true },
  });
}

async function seedProjects() {
  await prisma.projectImage.deleteMany();
  await prisma.projectPoint.deleteMany();
  await prisma.project.deleteMany();
  await prisma.mediaAsset.deleteMany({
    where: {
      OR: [
        { key: { startsWith: "images/projects/" } },
        { key: "docs/Natalie_resume.pdf" },
      ],
    },
  });

  const detailBySlug = new Map(projectDataDetail.map((detail) => [detail.slug, detail]));

  for (const [projectIndex, project] of projectData.entries()) {
    const detail = detailBySlug.get(project.slug);

    const createdProject = await prisma.project.create({
      data: {
        slug: project.slug,
        title: project.title,
        tech: project.tech,
        status: project.status,
        detail: project.detail,
        showStatus: project.showStatus ?? true,
        sortOrder: projectIndex,
        summary: detail?.summary,
        overview: detail?.overview?.trim() ?? null,
        context: detail?.context,
        duration: detail?.duration,
        role: detail?.role ?? [],
        challenges: detail?.challenges ?? [],
        solutions: detail?.solutions ?? [],
        outcomes: detail?.outcomes ?? [],
      },
      select: { id: true, slug: true },
    });

    if (project.points.length > 0) {
      await prisma.projectPoint.createMany({
        data: project.points.map((content, pointIndex) => ({
          projectId: createdProject.id,
          content,
          sortOrder: pointIndex,
        })),
      });
    }

    if (project.images?.length) {
      for (const [imageIndex, image] of project.images.entries()) {
        const mediaKey = image.src.replace(/^\//, "");
        const absoluteFilePath = toPublicFilePath(image.src);
        const media = await upsertMediaFromFile(mediaKey, absoluteFilePath);

        await prisma.projectImage.create({
          data: {
            projectId: createdProject.id,
            mediaId: media.id,
            alt: image.alt,
            width: image.width,
            height: image.height,
            sortOrder: imageIndex,
          },
        });
      }
    }
  }
}

async function seedResumePdf() {
  const resumePath = path.join(process.cwd(), "public", "Natalie_resume.pdf");
  await upsertMediaFromFile("docs/Natalie_resume.pdf", resumePath);
}

async function main() {
  await seedProjects();
  await seedResumePdf();
  console.log("Seed completed: projects, project images, and resume PDF.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
