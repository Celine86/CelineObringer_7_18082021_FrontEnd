<template>
    <main>  
        <div class="card">
            <div class="card__author">
                <img :src="user.avatar" class="card__avatarimage">
                <p>{{ user.username }}</p>
            </div>
            <div>
                <p>{{ comment.comment }}</p>
            </div>
            <div class="main__nav">
                <a :href="'#/editcomment/' + comment.id" class="main__nav--button" :class="{'main__nav--button--disabled' : !checkFields}" :disabled="!checkFields">Modifier</a>
                <button @click="deleteComment()" class="main__nav--button" :class="{'main__nav--button--disabled' : !checkFields}" :disabled="!checkFields">Supprimer</button>
            </div>
            <div class="information">
                <p class="information--p">Commentaire Modifié par {{ comment.modifiedBy }} </p>
            </div>
        </div>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
import router from '../router';
import axios from "axios"

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
            axios.delete(`http://localhost:3000/api/posts/comment/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
            .then(() => {
                router.push("/posts")
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        }
    },
    created: function() {
        let id = this.$route.params.id;
        axios.get(`http://localhost:3000/api/posts/comment/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            const resp = response.data
            this.comment = resp
            const respuser = response.data.User
            this.user = respuser
            const authorID = response.data.User.id
            this.authorID = authorID
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
    background-color: #f2f2f2;
    color: #000080;
    font-weight: lighter;
}
.main__nav--button--disabled {
    padding: 0.2rem 0.2rem;
    margin: 0.2rem 0.2rem 0rem 0.2rem;
    background-color: #f2f2f2;
    color: #dc143c;
    font-weight: lighter;
}
.main__nav--button:hover {
    padding: 0.2rem 0.2rem;
    margin: 0.2rem 0.2rem 0rem 0.2rem;
    font-weight: lighter;
}
.main__nav--button--disabled:hover {
    cursor: not-allowed;
    padding: 0.2rem 0.2rem;
    margin: 0.2rem 0.2rem 0rem 0.2rem;
    font-weight: lighter;
}
</style>