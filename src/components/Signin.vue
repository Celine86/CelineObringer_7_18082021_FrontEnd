<template>
    <main>
        <h1>SignIn</h1>
        <form @submit.prevent="submit" class="card">
            <div class="card__child">
                <label for="myUsername" class="card__input">Pseudonyme </label>
                <input type="text" v-model="myUsername">
            </div>
            <div class="card__child">
                <label for="myPassword" class="card__input">Mot de passe </label>
                <input type="text" v-model="myPassword">
            </div>
            <div class="card__child">
                <button class="card__btn">Se connecter</button>
            </div>
        </form>
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

<style scoped>
.card {
    border: 0.2rem solid #dc143c;
    border-radius: 2rem;
    background: #f2f2f2;
    padding: 2rem;
    margin: 2rem;
    max-width: 50rem;
}
.card__child {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0rem;
    padding: 0.5rem 0rem;
}
.card__btn {
    border: none;
    border-radius: 2rem;
    padding: 0.4rem 0.4rem;
    margin: 0.2rem 0.4rem;
    cursor: pointer;
    background-color: #000080;
    color: #f2f2f2;
    font-weight: bold;
    font-size: 1rem;
}
.card__input {
    color: #000080;
    font-weight: bold;
}
</style>