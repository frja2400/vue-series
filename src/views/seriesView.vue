<template>
  <h2>TV-serier</h2>
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
      <!-- Loopar igenom listan, skapar en komponent per objekt (SerieItem)-->
      <SerieItem v-for="serie in series" :serie="serie" :key="serie._id" />

    </tbody>
  </table>
</template>

<script setup>
import SerieItem from '@/components/SerieItem.vue';
import { ref, onMounted } from 'vue';

// Skapar en reaktiv variabel som reagerar på ändringar. Den börjar som en tom array.
const series = ref([]);

// När seriesView är färdigrenderad och visas så hämtas API:et med funktionen getSeries.
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


</script>

<style scoped></style>