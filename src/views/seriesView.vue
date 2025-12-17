<template>
  <h2>TV-serier</h2>
  <!-- Renderar komponenten för formuläret och skickar en emit när serie har lagts till (som hämtar listan på nytt) -->
  <AddSerie @refresh-series="getSeries" />
  <table>
    <thead>
      <tr>
        <th>Namn</th>
        <th>År</th>
        <th>Sett</th>
        <th>Ta bort</th>
      </tr>
    </thead>
    <tbody>
      <!-- Loopar igenom listan, skapar en komponent per objekt (SerieItem) och skriver ut -->
      <SerieItem v-for="serie in series" :serie="serie" :key="serie._id" @delete-serie="deleteSerie" />
    </tbody>
  </table>
</template>

<script setup>
import SerieItem from '@/components/SerieItem.vue';
import AddSerie from '@/components/AddSerie.vue';
import { ref, onMounted } from 'vue';

// Skapar en reaktiv variabel som reagerar på ändringar. Den börjar som en tom array.
const series = ref([]);

// När seriesView-komponenten är färdigrenderad och visas så hämtas API:et med funktionen getSeries.
onMounted(() => {
  getSeries();
});

const getSeries = async () => {
  try {
    // Skickas via Vite-proxy till Render-servern för att förhindra CORS.
    const res = await fetch('/api/series');

    if (res.ok) {
      const data = await res.json();

      // Series sparas i state, är nu en lista med objekt.
      series.value = data.series;
    }

  } catch (error) {
    console.error('Error fetching series:', error);
  }
}

// Förälder (seriesView) tar emot id och anropar API för DELETE
const deleteSerie = async (id) => {
  try {
    const res = await fetch('/api/series/' + id, {
      method: "DELETE"
    });

    if (res.ok) {
      getSeries();
    }

  } catch (error) {
    console.error('Error deleting series:', error);
  }
}


</script>

<style scoped></style>