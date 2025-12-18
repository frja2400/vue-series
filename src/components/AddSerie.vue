<template>
    <!-- Stoppa sidomladdning och kör funktion addSerie -->
    <form @submit.prevent="addSerie">
        <label for="name">Namn på TV-serie:</label>
        <!-- Koppla inputfält till variabeln name -->
        <input id="name" type="text" v-model="name" />

        <label for="year">Premiärår:</label>
        <input id="year" type="number" v-model="year" />

        <label for="seen">Kryssa i om du har sett TV-serien:</label>
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
        error.value = 'Namn och år måste fyllas i!';
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


<style scoped>
form {
    margin: 2rem auto;
    padding: 2.5rem;
    background-color: rgba(3, 2, 3, 0.9);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    max-width: 600px;
}

form label {
    color: white;
}

form input[type="text"],
form input[type="number"] {
    width: 100%;
    padding: 0.9rem 1rem;
    border: 2px solid rgba(174, 72, 214, 0.3);
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-sizing: border-box;
    margin: 0.5rem 0 1.5rem 0;
}

form input[type="text"]:focus,
form input[type="number"]:focus {
    outline: none;
    border-color: rgb(174, 72, 214);
    box-shadow: 0 0 0 3px rgba(174, 72, 214, 0.2);
    background-color: white;
}

form input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
    accent-color: rgb(174, 72, 214);
    vertical-align: middle;
}

form button {
    width: 100%;
    margin-top: 2rem;
    padding: 1rem 2rem;
    background: rgb(130, 52, 161);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.05rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(174, 72, 214, 0.3);
}

form button:hover,
form button:active {
    background: rgb(174, 72, 214)
}

.error {
    max-width: 600px;
    margin: 1rem auto;
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