<template>
    <main>
        <div class="card">
            <h2>{{ user.username }}</h2>
                <img :src="user.avatar" class="card__avatar"><br>                    
            <h3>{{ user.email }}</h3>
            <div class="card__admin">
                <button @click="deleteAccount()" class="card__btn" :hidden="!checkFields">Supprimer le Compte</button>
                <div>
                    <label for="delete" :hidden="!checkFields">Etes-vous sûr de vouloir supprimer ce compte ? </label>
                    <input type="checkbox" id="delete" name="delete" :hidden="!checkFields">
                </div>
            </div>
        </div>
        <div class="message" v-if="message != ''"> {{ message }} </div>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
import router from '../router';
import axios from "axios"

export default {
    name: "SingleUser",
    data() {
        return {
            user: [],
            error: "",
            userRole: "",
            message: "",
        }
    },
    computed: { 
        checkFields: function() {
            if (this.userRole === "true") {
            return true;
            } else {
            return false;
            }
        },
    },
    methods: {
        deleteAccount() {
            if (document.getElementById('delete').checked) {
                let id = this.$route.params.id;
                axios.delete(`http://127.0.0.1:3000/api/users/profils/${id}`, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")} })
                .then(() => {
                    router.push("/");
                })
                .catch((error) => {
                    this.error = error.response.data.error
                })
            } else {
                this.message = "Merci de cocher la case si vous souhaitez réellement supprimer ce compte"
                //location.reload();
            }
        },
    },
    created() {
        let id = this.$route.params.id;
        axios.get(`http://localhost:3000/api/users/profils/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            const resp = response.data.userInfos
            this.user = resp
            this.userRole = localStorage.getItem("role")
        })
        .catch((error) => {
            this.error = error.response.data.error
        })
    }
}
</script>

<style scoped>
.card {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: space-around;
    margin: 0.5rem;
    padding: 0.5rem;
}
.card__avatar {
    width: 100%;
    max-width: 20rem;
    height: auto;
    margin: 0 2rem;
}
.card__admin {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 1rem;
}
</style>