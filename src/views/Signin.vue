<template>
    <main>
        <h1 class="title">Se connecter</h1>
        <form @submit.prevent class="card">
            <div class="card__child">
                <label for="myUsername" class="card__input">Pseudonyme </label>
                <input type="text" v-model="myUsername" name="myUsername" id="myUsername">
            </div>
            <div class="card__child">
                <label for="myPassword" class="card__input">Mot de passe </label>
                <input type="password" v-model="myPassword" name="myPassword" id="myPassword">
            </div>
            <div class="card__child">
                <button @click="submit()" class="card__btn" :class="{'card__btn--disabled' : !checkFields}" :disabled="!checkFields">Se connecter</button>
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
    name: "Signin",
    data() {
        return {
            myUsername: "",
            myPassword: "",
            error: "",
            message: "",
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
            api.post(`/api/users/login`, { username: this.myUsername, password: this.myPassword})
            .then((response) => {
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("userId",response.data.userId)
                localStorage.setItem("role",response.data.role)
                this.message = response.data.message
                location.reload();
                //router.go()                 
                //router.push("/posts");
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        }
    },
    created() {
        if (localStorage.getItem("userId") != null) { 
            router.push("/posts");
        }
    }
}
</script>
