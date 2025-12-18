<template>
  <h2>TV-serier</h2>
  <!-- Renderar komponenten för formuläret och skickar en emit när serie har lagts till (som hämtar listan på nytt) -->
  <AddSerie @refresh-series="getSeries" />


  <!-- Visas när series är hämtade -->
  <section class="table-section">
    <!-- Visas medan API:et laddas -->
    <p class="loading" v-if="loading">Listan laddas...</p>
    <div class="table-container" v-else>
      <table>
        <thead>
          <tr>
            <th>Namn</th>
            <th>Premiärår</th>
            <th>Sett</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- Loopar igenom listan, skapar en komponent per objekt (SerieItem) och skriver ut -->
          <SerieItem v-for="serie in series" :serie="serie" :key="serie._id" @delete-serie="deleteSerie" />
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import SerieItem from '@/components/SerieItem.vue';
import AddSerie from '@/components/AddSerie.vue';
import { ref, onMounted } from 'vue';

// Skapar en reaktiv variabel som reagerar på ändringar. Den börjar som en tom array.
const series = ref([]);

const loading = ref(true);

// När seriesView-komponenten är färdigrenderad och visas så hämtas API:et med funktionen getSeries.
onMounted(() => {
  getSeries();
});

const getSeries = async () => {
  loading.value = true;
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
  } finally {
    loading.value = false; // Laddning klar
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

<style scoped>
.table-section {
  width: 100%;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  min-width: 600px;
  border: 2px solid black;
}

th {
  padding: 0.8rem;
  text-align: left;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: white;
  background: rgb(130, 52, 161);
}

tbody tr:nth-child(even) {
  background-color: rgba(3, 2, 3, 0.8);
}

tbody tr:nth-child(odd) {
  background-color: rgba(3, 2, 3, 0.9);
}

.loading {
  max-width: 600px;
  margin: 2rem auto;
  background-color: rgba(3, 2, 3, 0.9);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  border-left: 5px solid rgb(174, 72, 214);
  font-weight: 400;
  font-size: 0.95rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
</style>