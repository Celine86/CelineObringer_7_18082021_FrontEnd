<template>
    <main>
        <div class="main__nav">
            <button class="main__nav--button" @click="reload()">Recharger les Posts</button>
            <a :href="'#/addpost/'" class="main__nav--button"> Ajouter un post </a>
        </div>
        <div v-for="post in posts" :key="post.id" class="wrap">
            <a :href="'#/singlepost/' + post.id" >
                <div class="card">
                    <div class="card__author">
                        <img :src="post.User.avatar" class="card__avatarimage">
                        <p>{{ post.User.username }}</p>
                    </div>
                    <div>
                        <h2>{{ post.title }}</h2>
                        <img :src="post.imageUrl" class="card__postimage">
                        <p>{{ post.content }}</p>
                    </div>
                    <div class="card__child--nav">
                        <p><a :href="'#/addcomment/' + post.id">Commenter</a> || 
                        <a :href="'#/singlepost/' + post.id">Voir</a></p>
                    </div>
                    <div>
                        <p class="important--blue">Post commenté <span class="important--red">{{ post.Comments.length }}</span> fois</p>
                    </div>
                    <div class="information">
                        <p class="information--p"> {{ post.modifiedBy }} </p>
                    </div>
                </div>
            </a>
            <div class="main__nav">
                <a :href="'#/addpost/'" class="main__nav--button"> Ajouter un post </a>
            </div>
        </div>
            <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>


<script>
import api from "../services/api";

export default {
    name: "Posts",
    data() {
        return {
            posts: [],
            error: "",
        }
    },
    methods: {
        reload() {
            location.reload();
        }
    }, 
    created() {
        api.get(`/api/posts/`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            this.posts = response.data
        })
        .catch((error) => {
            this.error = error.response.data.error
        })
    }
}
</script>

<style scoped>
.card__child--nav {
    padding-bottom: 2rem;
}
</style>