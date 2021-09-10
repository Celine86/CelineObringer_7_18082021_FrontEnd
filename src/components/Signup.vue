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
        methods: {
            submit() {
            const myUsername = this.myUsername
            const myEmail = this.myEmail
            const myPassword = this.myPassword
            axios.post('http://localhost:3000/api/users/signup', { email: myEmail, username: myUsername, password: myPassword })
            .then(function (response) {
                console.log(response);
                if (response.statusText==="Created") {
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