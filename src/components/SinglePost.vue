<template>
    <main>
        <h1>Post</h1>      
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
            </div>
    </main>
</template>


<script>
import axios from "axios"

export default {
    name: "SinglePost",
    data() {
        return {
            post: [],
            user: [],
        }
    },
    created: function() {
        let id = this.$route.params.id;
        axios.get(`http://localhost:3000/api/posts/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            const resp = response.data
            const respuser = response.data.User
            this.post = resp
            this.user = respuser
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

</script>