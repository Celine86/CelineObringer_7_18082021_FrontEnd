<template>
    <footer>
        <div class="nav">
            <router-link to="/charte">Charte d'utilisation</router-link> || 
            <router-link to="/users">Annuaire</router-link>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
    }
</script>

<style scoped>
footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
}
.nav {
    margin: 1rem;
    color: #000080;
}
.nav a{
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #000080;
    font-weight: bold;
}
.nav a:hover{
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #dc143c;
    font-weight: bold;
}
</style>