"use client";

import Image from "next/image";
import React, { useState } from "react";

const ImageFallback = ({
  defaultSrc,
  fallback,
  alt,
  width,
  height,
  className,
  ...props
}: {
  defaultSrc: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => {
  const [src, setSrc] = useState(defaultSrc);

  return (
   <Image src={src} alt={alt} width={width} height={height} className={className} onError={() => setSrc(fallback)} />
  )
};

export default ImageFallback;
