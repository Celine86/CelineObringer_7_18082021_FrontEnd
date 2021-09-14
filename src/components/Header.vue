<template>
    <header>
        <img alt="Groupomania logo" src="@/assets/logoblack.png" />
        <div class="nav">
            <router-link to="/">Accueil</router-link> || 
            <router-link to="/posts">Posts</router-link> || 
            <router-link to="/useraccount">Profil</router-link> 
        </div>
        <div>
            <router-link class="card__btn" to="/signin">Connexion</router-link>
            <button class="card__btn" @click="logout()">Déconnexion</button>
        </div>
    </header>
</template>

<script>
import router from '../router';
export default {
    name: "Header",
    methods: {
        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("avatar");
            localStorage.removeItem("role");
            router.push("/");
        },
    }
}
</script>

<style scoped>
header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 25vh;
}
.nav {
    margin: 1rem;
    color: #000080;
}
.nav a{
    font-size: 1.2rem;
    text-transform: uppercase;
    color: #000080;
    font-weight: bold;
}
.nav a:hover{
    font-size: 1.2rem;
    text-transform: uppercase;
    color: #dc143c;
    font-weight: bold;
}
</style>