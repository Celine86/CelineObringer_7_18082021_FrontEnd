<template>
    <header>
        <img alt="Groupomania logo" src="@/assets/logoblack.png" />
        <div class="nav">
            <router-link to="/">Accueil</router-link> || 
            <router-link to="/posts">Les Posts</router-link> ||
            <router-link to="/useraccount">Mon Compte</router-link>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",
    }
</script>

<style scoped>
header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 10vh; 
}
.nav {
    margin: 1rem;
    color: #000080;
}
.nav a{
    font-size: 1.2rem;
    text-transform: uppercase;
    color: #dc143c;
    font-weight: bold;
}
.nav a:hover{
    font-size: 1.2rem;
    text-transform: uppercase;
    color: #000080;
    font-weight: bold;
}
</style>