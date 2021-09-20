<template>
    <header>
        <a :href="'#/posts'" v-if="username != ''"><img alt="Groupomania logo" src="@/assets/logoblack.png" /></a>
        <a :href="'/'" v-else><img alt="Groupomania logo" src="@/assets/logoblack.png" /></a>
        <div class="nav" v-if="username != ''">
            <router-link to="/posts">Posts</router-link> || 
            <router-link to="/users">Annuaire</router-link> || 
            <router-link to="/useraccount">Profil</router-link> 
        </div>
            <span  v-if="username != ''">Bienvenue {{ username }} !</span>
        <div>
            <button class="card__btn" @click="logout()" v-if="username != ''">Déconnexion</button>
            <router-link class="card__btn" to="/signin" v-else>Connexion</router-link>
        </div>
            <div class="message" v-if="message != ''"> {{ message }} </div>
            <div class="alert" v-if="error != ''"> {{ error }} </div>
    </header>
</template>

<script>
import api from "../services/api";
import router from '../router';
export default {
    name: "Header",
    data() {
        return {
            username: "",
            error: "",
            message: "",
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            router.go();
        },
    },
    created() {
        if (localStorage.getItem("userId") != null) {
            api.get(`/api/users/profils/` + localStorage.getItem("userId"),{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
            .then(user => {
                this.username = user.data.userInfos.username;
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        } else {
            this.username = "";
        }
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
span {
    color: #000080;
    font-weight: bold;
    font-size: 1.4rem;
}
</style>