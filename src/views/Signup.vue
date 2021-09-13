<template>
    <main>
        <h1>SignUp</h1>
        <form @submit.prevent class="card">
            <div class="card__child">
                <label for="myUsername" class="card__input">Pseudonyme </label>
                <input type="text" v-model="myUsername">
            </div>
            <div class="card__child">
                <label for="myEmail" class="card__input">Email </label>
                <input type="text" v-model="myEmail">
            </div>
            <div class="card__child">
                <label for="myPassword" class="card__input">Mot de passe</label>
                <input type="text" v-model="myPassword">
            </div>
            <div class="card__child">
                <button @click="submit()" 
                class="card__btn" 
                :class="{'card__btn--disabled' : !checkFields}"
                :disabled="!checkFields">
                S'inscrire</button>
            </div>
        </form>
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
            axios.post('http://localhost:3000/api/users/signup', { email: myEmail, username: myUsername, password: myPassword })
            .then(function (response) {
                //console.log(response);
                if (response.statusText==="Created") {
                    alert("Votre compte a été créé vous allez être redirigé vers votre profil")
                    axios.post('http://localhost:3000/api/users/login', { username: myUsername, password: myPassword })
                    .then(function (response) {
                        localStorage.setItem("token",response.data.token)
                        localStorage.setItem("userId",response.data.userId)
                        localStorage.setItem("username",response.data.username)
                        localStorage.setItem("email",response.data.email)
                        localStorage.setItem("avatar",response.data.avatar)
                        localStorage.setItem("role",response.data.role)                    
                        router.push("/useraccount");
                    })
                    .catch(function(error){
                        alert(error.response.data.error);
                    })
                }
            })
            .catch(function (error) {
                alert(error.response.data.error);
            })
        }
    }
}
</script>

<style scoped>

</style>