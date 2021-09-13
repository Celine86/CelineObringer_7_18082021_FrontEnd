<template>
    <main>
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
                    <p><a :href="'#/singlepost/' + post.id">Laisser un commentaire</a> || 
                        <a :href="'#/singlepost/' + post.id">Voir les commentaires</a></p>
                    </div>
                </div>
            </a>
            <div class="main__nav">
                <button class="main__nav--button">Ajouter un Post</button>
            </div>
        </div>

    </main>
</template>


<script>
import axios from "axios"

export default {
    name: "Posts",
    data() {
        return {
            posts: [],
        }
    },
    created() {
        axios.get("http://localhost:3000/api/posts/", { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            const resp = response.data
            this.posts = resp
        })
        .catch((error) => {
            alert(error.response.data.error);
        })
    }
}
</script>

<style scoped>
.wrap {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
</style>