<template>
    <div class ="main">
        <h1>Post</h1>      
            <div class="post">
                <h3>title : {{ post.title }}</h3><br>
                <h3>content : {{ post.content }}</h3><br>
                <img :src="post.imageUrl" class="responsive__postimage"><br>
                <p>username : {{ user.username }}</p><br> 
                <p>email : {{ user.email }}</p><br>
                <img :src="user.avatar" class="responsive__avatarimage"><br>
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
            user: [],
        }
    },
    created: function() {
        let id = this.$route.params.id;
        axios.get(`http://localhost:3000/api/posts/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            const resp = response.data
            console.log(response.data)
            const respuser = response.data.User
            console.log(response.data.User)
            this.post = resp
            this.user = respuser
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

</script>