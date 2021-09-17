<template>
    <header>
        <a :href="'/'" ><img alt="Groupomania logo" src="@/assets/logoblack.png" /></a>
        <div class="nav">
            <router-link to="/posts">Posts</router-link> || 
            <router-link to="/users">Annuaire</router-link> || 
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
.nav a{
    font-size: 1.2rem;
}
.nav a:hover{
    font-size: 1.2rem;
}
.card__btn {
  background-color: rgba(255, 255, 255, 0);
  color: #000080; 
}
.card__btn:hover {
  color: #dc143c; 
}
</style>