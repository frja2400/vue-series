<template>
  <tr>
    <td>{{ serie.name }}</td>
    <td>{{ serie.year }}</td>
    <td>
      <input type="checkbox" disabled :checked="serie.seen" />
    </td>
    <td>
      <!-- Knapp i SerieItem-komponenten skickar id via emit till förälder -->
      <button @click="emits('deleteSerie', serie._id)">TA BORT</button>
    </td>
  </tr>
</template>

<script setup>
// Tar emot ett serie-objekt och visar tabellraden via props=tar emot data från föräldern.
const props = defineProps({
  serie: {
    type: Object,
    required: true
  }
})

// Skickar signaler till föräldern seriesView med emits.
const emits = defineEmits(["deleteSerie"]);
</script>

<style scoped>
button {
  border: none;
  background-color: rgb(130, 52, 161);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.7em;
  cursor: pointer;
  letter-spacing: 0.1em;
  margin: 0;
  transition: all 0.3s ease;
}

button:hover,
button:active {
    background: rgb(174, 72, 214)
}

td {
  padding: 0.8rem;
  border: 2px solid black;
  color: white;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}
</style>