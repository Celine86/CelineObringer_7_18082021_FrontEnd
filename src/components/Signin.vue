<template>
    <div class ="main">
        <h1>SignIn</h1>
        <form @submit.prevent="submit">
            <label for="myUsername">Username: </label>
            <input type="text" v-model="myUsername">
            <label for="myPassword">Password: </label>
            <input type="text" v-model="myPassword">
            <button>Se connecter</button>
        </form>
    </div>
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
            }
        },
        methods: {
            submit() {
                axios.post('http://localhost:3000/api/users/login', { username: this.myUsername, password: this.myPassword})
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
        }
    }
</script>

<style>
</style>