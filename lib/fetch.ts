export default function maFetch(endpoint: string) {
   return fetch(endpoint, {
      method: "GET",
      headers: {
         accept: 'application/json',
       }
   }).then(res => res.status === 200 ? res.json() : null)
}