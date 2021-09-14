<template>
    <main>
        <form @submit.prevent class="card">
            <div class="card__child">
                <label for="myUsername" class="card__input">Pseudonyme </label>
                <input type="text" v-model="myUsername">
            </div>
            <div class="card__child">
                <label for="myPassword" class="card__input">Mot de passe </label>
                <input type="text" v-model="myPassword">
            </div>
            <div class="card__child">
                <button @click="submit()" 
                class="card__btn" 
                :class="{'card__btn--disabled' : !checkFields}"
                :disabled="!checkFields">
                Se connecter</button>
            </div>
        </form>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
import axios from 'axios';
import router from '../router';
export default {
    name: "Signin",
    data() {
        return {
            myUsername: "",
            myPassword: "",
            error: "",
        }
    },
    computed: { 
        checkFields: function() {
            if (this.myUsername != "" && this.myPassword != "") {
            return true;
            } else {
            return false;
            }
        },
    },
    methods: {
        submit() {
            axios.post('http://localhost:3000/api/users/login', { username: this.myUsername, password: this.myPassword})
            .then((response) => {
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("userId",response.data.userId)
                localStorage.setItem("username",response.data.username)
                localStorage.setItem("email",response.data.email)
                localStorage.setItem("avatar",response.data.avatar)
                localStorage.setItem("role",response.data.role)                 
                router.push("/posts");
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        }
    }
}
</script>

<style scoped>
</style>