import { getTVGenres } from "@/models/tmdb/genreModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
   try {
      const result = await getTVGenres();
      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.json({ error: "Failed to fetch genres" }, { status: 500 });
   }
}