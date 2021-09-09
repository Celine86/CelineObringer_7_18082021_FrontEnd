<template>
    <div class ="main">
        <h1>SignUp</h1>
        <form @submit.prevent="submit">
            <label for="myUsername">Username: </label>
            <input type="text" v-model="myUsername">
            <label for="myEmail">Email: </label>
            <input type="text" v-model="myEmail">
            <label for="myPassword">Password: </label>
            <input type="text" v-model="myPassword">
            <button>S'inscrire</button>
        </form>
    </div>
</template>

<script>
//import urlApi from "../services/conf"
//import axios from "axios"
import userServices from '../services/userServices';
import router from '../router';


    export default {
        name: "Signup",
        data: function () {
            return {
                myUsername: "",
                myEmail: "",
                myPassword: "",
            }
        }, 
        methods: {
            submit() {
            const myUsername = this.myUsername
            const myEmail = this.myEmail
            const myPassword = this.myPassword
            userServices.signupUser({ email: myEmail, username: myUsername, password: myPassword})
            .then(function (response) {
                console.log(response);
                if (response.statusText==="Created") {
                    userServices.signinUser({ username: myUsername, password: myPassword})
                    .then(function (response) {
                        localStorage.setItem("token", response.data.token);
                        router.push("/connected");
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            }
        }
    }
</script>

<style>
</style>