<template>
    <main>  
        <div class="card">
            <div class="card__author">
                <img :src="user.avatar" class="card__avatarimage">
                <p>{{ user.username }}</p>
            </div>
            <div>
                <h2>{{ post.title }}</h2>
                <img :src="post.imageUrl" class="card__postimage">
                <p>{{ post.content }}</p>
            </div>
            <div class="main__nav">
                <a :href="'#/addcomment/' + post.id" class="main__nav--button"> Ajouter un commentaire </a>
                <a :href="'#/editpost/' + post.id" class="main__nav--button" :class="{'main__nav--button--disabled' : !checkFields}" :hidden="!checkFields">Modifier</a>
               <button class="main__nav--button" @click="deletePost()" :class="{'main__nav--button--disabled' : !checkFields}" :hidden="!checkFields">Supprimer</button>
            </div>
                <div class="information">
                    <p class="information--p">Post Modifié par {{ post.modifiedBy }} </p>
                </div>
            <div v-for="comment in comments" :key="comment.id" class="card__child">
                <a :href="'#/singlecomment/' + comment.id" >
                    <div class="card__author">
                        <img :src="comment.User.avatar" class="card__avatarimage">
                        <p>{{ comment.User.username }}</p>
                    </div>
                    <div>
                        <p>{{ comment.comment }}</p>
                    </div> 
                    <div class="information">
                        <p class="information--p">Commentaire Modifié par {{ comment.modifiedBy }} </p>
                    </div>
                </a> 
            </div>
        </div>
        <div class="message" v-if="message != ''"> {{ message }} </div>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>


<script>
// import axios from "axios"
import api from "../services/api";
import router from '../router';
export default {
    name: "SinglePost",
    data() {
        return {
            post: [],
            user: [],
            comments: [],
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
        deletePost() {
            let id = this.$route.params.id;
            api.delete(`/api/posts/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
            .then((response) => {
                this.message = response.data.message
                router.push("/posts")
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        },
    },
    created: function() {
        let id = this.$route.params.id;
        api.get(`/api/posts/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            this.post = response.data
            this.user = response.data.User
            this.comments = response.data.Comments
            this.authorID =  response.data.User.id
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
}
.main__nav--button {
    border: 0.1rem solid #000080;
    padding: 0.2rem 0.2rem;
    margin: 1.5rem 0.2rem 0rem 0.2rem;
    background-color: #f2f2f2;
    color: #000080;
    font-weight: lighter;
}
.main__nav--button--disabled {
    border: 0.1rem solid #dc143c;
    padding: 0.2rem 0.2rem;
    margin: 1.5rem 0.2rem 0rem 0.2rem;
    background-color: #f2f2f2;
    color: #dc143c;
    font-weight: lighter;
}
.main__nav--button:hover {
    border: 0.1rem solid #dc143c;
    padding: 0.2rem 0.2rem;
    margin: 1.5rem 0.2rem 0rem 0.2rem;
    font-weight: lighter;
}
.main__nav--button--disabled:hover {
    border: 0.1rem solid #000080;
    cursor: not-allowed;
    padding: 0.2rem 0.2rem;
    margin: 1.5rem 0.2rem 0rem 0.2rem;
    font-weight: lighter;
}
.card__child {
    border: 0.2rem solid #dc143c;
    padding: 0.5rem 0.5rem;
}
.card__child:hover {
    border: 0.2rem solid #000080;
    padding: 0.5rem 0.5rem;
}
</style>