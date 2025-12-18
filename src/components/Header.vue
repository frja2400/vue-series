<template>
    <header>
        <div class="header-container">
            <h1>
                <RouterLink to="/">Laboration 3</RouterLink>
            </h1>

            <!--Menyknapp för att öppna mobilmeny-->
            <button class="menu-btn" id="menu-toggle">
                <span class="menu-icon">
                    <span class="bar"></span>
                    <span class="bar"></span>
                </span>
            </button>

            <nav id="nav-menu">
                <ul>
                    <li>
                        <RouterLink to="/">Startsida</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/serier">TV-Serier</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/information">Information</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="hero-banner">
        <div class="hero-content">
            <h2>MITT FRITIDSINTRESSE</h2>
        </div>
    </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';

window.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('nav ul');

    // Hamburgemeny
    menuBtn?.addEventListener('click', (e) => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('show');
        e.stopPropagation();
    });

    // Stäng menyn vid klick utanför
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('show');
        }
    });
});
</script>

<style scoped>
.hero-banner {
    background-image: url('/hero-banner.jpg');
    background-size: cover;
    background-position: center;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.hero-content {
    background-color: rgba(3, 2, 3, 0.8);
    padding: 1.5rem;
    color: white;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(3, 2, 3, 0.8);
    z-index: 1000;
    transition: background-color 0.3s ease;
    padding-bottom: 5px;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1850px;
    width: 100%;
    padding: 0.6em 3em 0.3em;
    margin: auto;
}

.header-container h1 a {
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
}

.header-container h1 {
    line-height: 1;
    display: flex;
    align-items: center;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 1.7rem;
}

nav ul li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1.1em;
    letter-spacing: 0.1em;
    transition: color 0.3s ease, text-decoration 0.3s ease;
}

.router-link-active,
nav a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
}

.menu-btn {
    display: none;
    cursor: pointer;
    background: none;
    border: none;
    z-index: 1100;
}

.menu-icon {
    position: relative;
    width: 30px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu-icon .bar {
    position: absolute;
    height: 3px;
    width: 100%;
    background-color: white;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.menu-icon .bar:nth-child(1) {
    transform: translateY(-6px);
}

.menu-icon .bar:nth-child(2) {
    transform: translateY(6px);
}

.menu-btn.active .bar:nth-child(1) {
    transform: rotate(45deg);
}

.menu-btn.active .bar:nth-child(2) {
    transform: rotate(-45deg);
}

@media screen and (max-width: 650px) {

    .menu-btn {
        display: block;
    }

    nav ul {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        flex-direction: column;
        text-align: right;
        display: none;
        padding: 10px;
        gap: 1.3rem;
        background-color: rgba(3, 2, 3, 0.8);
        z-index: 1000;
    }

    nav ul.show {
        display: flex;
    }

    .header-container {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        padding: 0.5em 1em;
    }

    .hero-banner {
        height: 200px;
    }

    .hero-content {
        padding: 0.5rem;
        width: 80%;
        margin-top: 30px;
    }

    h2 {
        font-size: 1.3em;
    }

    header {
        padding-bottom: 0;
    }
}
</style>