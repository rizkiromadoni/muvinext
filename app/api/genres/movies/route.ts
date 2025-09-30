import { getMovieGenres } from "@/models/tmdb/genreModel";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const result = await getMovieGenres();
      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.json({ error: "Failed to fetch genres" }, { status: 500 });
   }
}