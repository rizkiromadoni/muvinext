import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getReviews(tmdbId: number) {
  return await prisma.review.findMany({
   where: {
      tmdbId: tmdbId,
   },
    orderBy: { createdAt: "desc" },
  });
}

export async function createReview(tmdbId: number, formData: FormData) {
  const name = formData.get("name")?.toString();
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment")?.toString();

  if (!name || !comment || !rating) return;

  await prisma.review.create({
    data: { name, rating, comment, tmdbId },
  });

  revalidatePath("/");
}
