<template>
    <main>
        <div v-for="user in users" :key="user.id" class="card">
            <a :href="'#/singleuser/' + user.id" >
                <h2>{{ user.username }}</h2>
                <img :src="user.avatar" class="card__avatar"><br>                    
                <h3>{{ user.email }}</h3>
            </a>
        </div>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
// import axios from "axios"
import api from "../services/api";
export default {
    name: "Users",
    data() {
        return {
            users: [],
            error: "",
        }
    },
    created() {
        api.get(`/api/users/profils`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            this.users = response.data
        })
        .catch((error) => {
            this.error = error.response.data.error
        })
    }
}
</script>

<style scoped>
main {
    flex-direction: row;
    flex-wrap: wrap;
}
.card {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: space-around;
    margin: 0.5rem;
    padding: 0.5rem;
}
.card__avatar {
    max-width: 10rem;
    margin: 0 2rem;
}
</style>