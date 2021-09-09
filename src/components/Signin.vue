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
import userServices from '../services/userServices';
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
                userServices.signinUser({ username: this.myUsername, password: this.myPassword})
                .then(function (response) {
                    localStorage.setItem("token", response.data.token);
                    router.push("/connected");
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