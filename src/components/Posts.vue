<template>
    <main>
        <h1>Posts</h1>
        <div v-for="post in posts" :key="post.id" class="card">
            <a :href="'#/singlepost/' + post.id">
                <div>
                    <div class="card__author">
                        <img :src="post.User.avatar" class="card__avatarimage">
                        <p>{{ post.User.username }}</p>
                    </div>
                    <div>
                        <h2>{{ post.title }}</h2>
                        <img :src="post.imageUrl" class="card__postimage">
                        <p>{{ post.content }}</p>
                    </div>
                </div>
            </a>
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


