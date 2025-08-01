export default function fetchTmdb(endpoint: string) {
   return fetch(`https://api.themoviedb.org/3${endpoint}`, {
      method: "GET",
      headers: {
         accept: 'application/json',
         Authorization: `Bearer ${process.env.TMDB_API_KEY}`
       }
   }).then(res => res.status === 200 ? res.json() : null)
}