<template>
    <header>
        <nav>
            <ul>
                <li><RouterLink to="/">Startsida</RouterLink></li>
                <li><RouterLink to="/serier">TV-Serier</RouterLink></li>
                <li><RouterLink to="/information">Information</RouterLink></li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
    
</style>