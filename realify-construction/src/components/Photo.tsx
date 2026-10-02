"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** next/image with a calm sand-coloured fallback if a photo fails to load. */
export default function Photo({ className = "", alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={alt} className={`absolute inset-0 bg-sand ${className}`} />;
  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
