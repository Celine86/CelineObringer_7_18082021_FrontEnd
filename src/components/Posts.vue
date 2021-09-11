<template>
    <div class ="main">
        <h1>Posts</h1>
        <div v-for="post in posts" :key="post.id" class="post">
            <a :href="'#/singlepost/' + post.id">
                <div>
                    <h3>title : {{ post.title }}</h3><br>
                    <h3>content : {{ post.content }}</h3><br>
                    <img :src="post.imageUrl" class="responsive__postimage"><br>
                    <p>username : {{ post.User.username }}</p><br>
                    <p>email : {{ post.User.email }}</p><br>
                    <img :src="post.User.avatar" class="responsive__avatarimage"><br>
                </div>
            </a>
        </div>

    </div>
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
            console.log(error)
        })
    }
}

</script>


