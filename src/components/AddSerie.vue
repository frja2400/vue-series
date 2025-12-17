<template>
    <!-- Stoppa sidomladdning och kör funktion addSerie -->
    <form @submit.prevent="addSerie">
        <label for="name">Namn</label>
        <!-- Koppla inputfält till variabeln name -->
        <input id="name" type="text" v-model="name" />

        <label for="year">År:</label>
        <input id="year" type="number" v-model="year" />

        <label for="seen">Sett:</label>
        <!-- Ikryssad: true, annars false -->
        <input id="seen" type="checkbox" v-model="seen" />

        <button type="submit">LÄGG TILL</button>
    </form>

    <!-- If-sats: error visas endast om error innehåller text -->
    <p class="error" v-if="error">{{ error }}</p>
</template>

<script setup>
// Importerar ref för rekativa variabler
import { ref } from 'vue';

const name = ref('');
const year = ref('');
const seen = ref(false);
const error = ref('');

// Tillåt komponent att skicka ett event till sin förälder
const emit = defineEmits(['refreshSeries']);

// Funktion som körs när formuläret skickas
const addSerie = async () => {
    if (!name.value || !year.value) {
        error.value = 'Namn och år måste fyllas i';
        return;
    }

    // Rensa felmeddelanden när allt är ok
    error.value = '';

    // Skapar objekt som skickas till API, matchar MongoDB-schema.
    const data = {
        name: name.value,
        year: Number(year.value),
        seen: seen.value
    };

    // Skickar POST-anrop till REST API och konverterar objektet till JSON.
    try {
        const res = await fetch('/api/series', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            // Skickat eventet till föräldern så att listan uppdateras.
            emit('refreshSeries');

            // Töm formuläret
            name.value = '';
            year.value = '';
            seen.value = false;
        }
    } catch (err) {
        console.error('Error adding series:', err);
    }
};
</script>


<style scoped></style>