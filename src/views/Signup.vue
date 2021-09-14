<template>
    <main>
        <form @submit.prevent class="card">
            <div class="card__child">
                <label for="myUsername" class="card__input">Pseudonyme </label>
                <input type="text" v-model="myUsername">
            </div>
            <div class="card__child">
                <label for="myEmail" class="card__input">Email </label>
                <input type="email" v-model="myEmail">
            </div>
            <div class="card__child">
                <label for="myPassword" class="card__input">Mot de passe</label>
                <input type="password" v-model="myPassword">
            </div>
            <div class="card__child">
                <button 
                @click="submit()" 
                class="card__btn" 
                :class="{'card__btn--disabled' : !checkFields}"
                :disabled="!checkFields">S'inscrire</button>
            </div>
        </form>
            <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
import router from '../router';
import axios from 'axios';
export default {
    name: "Signup",
    data: function () {
        return {
            myUsername: "",
            myEmail: "",
            myPassword: "",
            error: "",
        }
    },
    computed: { 
        checkFields: function() {
            if (this.myEmail != "" && this.myUsername != "" && this.myPassword != "") {
            return true;
            } else {
            return false;
            }
        },
    },
    methods: {
        submit() {
            const myUsername = this.myUsername
            const myEmail = this.myEmail
            const myPassword = this.myPassword
            axios.post('http://127.0.0.1:3000/api/users/signup', { email: myEmail, username: myUsername, password: myPassword })
            .then((response) => {
                if (response.status === 201) {
                    axios.post('http://localhost:3000/api/users/login', { username: myUsername, password: myPassword })
                    .then((response) => {
                        localStorage.setItem("token",response.data.token)
                        localStorage.setItem("userId",response.data.userId)
                        localStorage.setItem("username",response.data.username)
                        localStorage.setItem("email",response.data.email)
                        localStorage.setItem("avatar",response.data.avatar)
                        localStorage.setItem("role",response.data.role)                    
                        router.push("/useraccount");

                    })
                    .catch((error) => {
                        this.error = error.response.data.error
                    }) 
                }
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