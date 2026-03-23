import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "../lib/prisma";

async function upsertResumePdf() {
  const resumePath = path.join(process.cwd(), "public", "Natalie_resume.pdf");
  const fileBuffer = await readFile(resumePath);
  const fileName = path.basename(resumePath);

  await prisma.mediaAsset.upsert({
    where: { key: "docs/Natalie_resume.pdf" },
    update: {
      fileName,
      mimeType: "application/pdf",
      byteSize: fileBuffer.length,
      data: fileBuffer,
    },
    create: {
      key: "docs/Natalie_resume.pdf",
      fileName,
      mimeType: "application/pdf",
      byteSize: fileBuffer.length,
      data: fileBuffer,
    },
  });
}

async function main() {
  await upsertResumePdf();
  console.log("Resume PDF upserted to MediaAsset.");
}

main()
  .catch((error) => {
    console.error("Resume seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
