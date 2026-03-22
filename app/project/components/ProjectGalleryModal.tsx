"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ProjectImage } from "../share/data";

type ProjectGalleryModalProps = {
  title: string;
  images: ProjectImage[];
  open: boolean;
  onClose: () => void;
};

export default function ProjectGalleryModal({
  title,
  images,
  open,
  onClose,
}: ProjectGalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const imageCount = images.length;
  const currentImage = images[activeIndex];

  const canNavigate = imageCount > 1;

  const fallbackSize = useMemo(() => {
    return {
      width: currentImage?.width ?? 1920,
      height: currentImage?.height ?? 1080,
    };
  }, [currentImage?.height, currentImage?.width]);

  const showPreviousImage = () => {
    if (!canNavigate) return;
    setActiveIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  const showNextImage = () => {
    if (!canNavigate) return;
    setActiveIndex((prev) => (prev + 1) % imageCount);
  };

  useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
  }, [open, title]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, canNavigate, imageCount]);

  if (!open || imageCount === 0 || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image gallery`}
    >
      <div className="relative inline-block" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-black/65 p-2 text-white hover:bg-black/85 transition-colors"
          aria-label="Close gallery"
        >
          <X size={18} />
        </button>

        <div className="relative">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={fallbackSize.width}
            height={fallbackSize.height}
            className="h-auto w-[min(92vw,1100px)] max-h-[78vh] rounded-xl border border-white/25 shadow-2xl"
            priority
          />

          <button
            type="button"
            onClick={showPreviousImage}
            disabled={!canNavigate}
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/65 p-2 text-white hover:bg-black/85 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={showNextImage}
            disabled={!canNavigate}
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/65 p-2 text-white hover:bg-black/85 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <p className="mt-2 text-center text-sm text-white/85">
          {title} · {activeIndex + 1}/{imageCount}
        </p>
      </div>
    </div>
  );
}
