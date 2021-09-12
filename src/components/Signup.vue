<template>
    <main>
        <h1>SignUp</h1>
        <form @submit.prevent="submit" class="card">
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
                <button class="card__btn">S'inscrire</button>
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

<style scoped>
.card {
    display: flex;
    flex-direction: column;
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