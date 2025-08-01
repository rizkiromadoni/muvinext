import { getMoviesByGenre } from "@/models/tmdb/movieModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
   const genreId = searchParams.get("genreId");
   const page = searchParams.get("page") || "1";
   
   if (!genreId) {
      return NextResponse.json({ error: "Genre ID is required" }, { status: 400 });
   }
   
   try {
      const movies = await getMoviesByGenre(genreId, page);
      return NextResponse.json(movies);
   } catch (error) {
      return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
   }
}