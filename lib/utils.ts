import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFKD") // pisahin aksen/diakritik (misal é -> e)
    .replace(/[\u0300-\u036f]/g, "") // hapus tanda aksen
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // ganti non-alfanumerik dengan "-"
    .replace(/^-+|-+$/g, ""); // hapus "-" di awal/akhir
}