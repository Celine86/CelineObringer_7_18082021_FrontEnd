<template>
    <main>  
        <h1 class="title">Les Posts !</h1>
        <div class="card">
            <div class="card__author">
                <img :src="user.avatar" class="card__avatarimage">
                <p>{{ user.username }}</p>
            </div>
            <div>
                <p>{{ comment.comment }}</p>
            </div>
            <div class="main__nav">
                <a :href="'#/editcomment/' + comment.id" class="main__nav--button" :hidden="!checkFields">Modifier</a>
                <button @click="deleteComment()" class="main__nav--button" :hidden="!checkFields">Supprimer</button>
            </div>
            <div class="information">
                <p class="information--p"> {{ comment.modifiedBy }} </p>
            </div>
        </div>
        <div class="message" v-if="message != ''"> {{ message }} </div>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
import api from "../services/api";
import router from '../router';
export default {
    name: "SingleComment",
    data() {
        return {
            comment: [],
            user: [],
            userID: "",
            userRole: "",
            authorID: "",
            error: "",
            message: "",
        }
    },
    computed: { 
        checkFields: function() {
            if (this.userID === this.authorID || this.userRole === "true") {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {
        deleteComment() {
            let id = this.$route.params.id;
            api.delete(`/api/posts/comment/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
            .then((response) => {
                this.message = response.data.message
                router.push("/posts")
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        }
    },
    created() {
        let id = this.$route.params.id;
        api.get(`/api/posts/comment/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            this.comment = response.data
            this.user = response.data.User
            this.authorID = response.data.User.id
            this.userID = localStorage.getItem("userId")
            this.userRole = localStorage.getItem("role")
        })
        .catch((error) => {
            this.error = error.response.data.error
        })
    }
}
</script>

<style scoped>
.main__nav{
    justify-content: flex-end;
    padding-bottom: 0rem;
    padding-top: 2rem;
}
.main__nav--button {
    padding: 0.2rem 0.2rem;
    margin: 0.2rem 0.2rem 0rem 0.2rem;
    background-color: #ffffff;
    color: #000080;
    font-weight: lighter;
}
.main__nav--button:hover {
    padding: 0.2rem 0.2rem;
    margin: 0.2rem 0.2rem 0rem 0.2rem;
    font-weight: lighter;
}
</style>