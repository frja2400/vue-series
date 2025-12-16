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