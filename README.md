# Frontend-del med Vue som använder mitt REST API

Detta repository innehåller ett Vue-projekt som använder ett eget REST API för att kunna lista TV-serier i en tabell. Du kan även addera nya serier och ta bort befintliga. Det finns tre undersidor:
- Startsidan med information om innehållet på webbplatsen.
- Undersida där alla TV-serier listas i en tabell samt formulär där man kan addera nya TV-serier.
- Undersida med en sammanfattning om mina tankar kring Vue.

## Funktioner

- Hämtar TV-serier från REST API:t (byggt med Node.js och MongoDB) och visar dem i en tabell.
- Möjlighet att radera TV-serier från tabellen. 
- Möjlighet att addera nya TV-serier via ett formulär som skickas till backend med POST.
- Enkel formulärvalidering med tydliga felmeddelanden.

## REST API-endpoints

- `GET /api/series` för att hämta alla serieobjekt.
- `DELETE /api/series/:id` för att radera ett specifikt serieobjekt.
- `POST /api/series` för att addera ett nytt serieobjekt.

En liveversion av API:t finns tillgänglig på följande URL: https://dt193g-lab2-2.onrender.com/

## Kom igång

Följ dessa steg för att köra projektet lokalt:

   ```bash
   git clone <https://github.com/frja2400/vue-series.git>
   cd <vue-series>
   npm install
   npm run dev
   ```
