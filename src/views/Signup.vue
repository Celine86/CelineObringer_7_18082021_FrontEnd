<template>
    <main>
        <h1 class="title">Créer un compte</h1>
        <form @submit.prevent class="card">
            <div class="card__child">
                <label for="myEmail" class="card__input" :hidden="checkFields2">Email </label>
                <input type="email" v-model="myEmail" name="myEmail" id="myEmail" :hidden="checkFields2">
            </div>
            <div class="card__child">
                <label for="myUsername" class="card__input">Pseudonyme </label>
                <input type="text" v-model="myUsername" name="myUsername" id="myUsername">
            </div>
            <div class="card__child">
                <label for="myPassword" class="card__input">Mot de passe</label>
                <input type="password" v-model="myPassword" name="myPassword" id="myPassword">
            </div>
            <div class="card__child">
                <button @click="submit()" class="card__btn" :class="{'card__btn--disabled' : !checkFields}" :disabled="!checkFields" :hidden="checkFields2">S'inscrire</button>
                <button @click="signin()" class="card__btn" :hidden="!checkFields2">Se connecter</button>
            </div>
        </form>
            <div class="message" v-if="message != ''"> {{ message }} </div>
            <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
import api from "../services/api";
import router from '../router';
export default {
    name: "Signup",
    data: function () {
        return {
            myUsername: "",
            myEmail: "",
            myPassword: "",
            error: "",
            message: "",
            created: "",
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
        checkFields2: function() {
            if (this.created != "") {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {
        submit() {
            api.post(`/api/users/signup`, { email: this.myEmail, username: this.myUsername, password: this.myPassword })
            .then((response) => {
                if (response.status === 201) {
                    this.message = response.data.message
                    this.created = "created"
                }
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        },
        signin() {
            api.post(`/api/users/login`, { username: this.myUsername, password: this.myPassword})
            .then((response) => {
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("userId",response.data.userId)
                localStorage.setItem("role",response.data.role)
                this.message = response.data.message                 
                router.push("/posts");
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        }
    }
}
</script>