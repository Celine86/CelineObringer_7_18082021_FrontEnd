<template>
    <div class ="main">
        <h1>Post</h1>      
            <div class="post">
                <h3>title : {{ post.title }}</h3><br>
                <h3>content : {{ post.content }}</h3><br>
                <img :src="post.imageUrl" class="responsive__postimage"><br>
                <p>username : {{ post.User.username }}</p><br>
                <p>email : {{ post.User.email }}</p><br>
                <img :src="post.User.avatar" class="responsive__avatarimage"><br>
            </div>
    </div>
</template>


<script>
import axios from "axios"

export default {
    name: "SinglePost",
    data() {
        return {
            post: [],
        }
    },
    created: function() {
        let id = this.$route.params.id;
        axios.get(`http://localhost:3000/api/posts/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            const resp = response.data
            this.post = resp
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

</script>