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
                <div class="main__nav">
                    <button class="main__nav--button">Modifier</button>
                    <button class="main__nav--button">Supprimer</button>
                </div>
                <div v-for="comment in comments" :key="comment.id" class="card__child">
                    <div class="card__author">
                        <img :src="comment.User.avatar" class="card__avatarimage">
                        <p>{{ comment.User.username }}</p>
                    </div>
                    <div><p>{{ comment.comment }}</p>
                    </div>                    
                    <div class="main__nav">
                        <button class="main__nav--button">Modifier</button>
                        <button class="main__nav--button">Supprimer</button>
                    </div>
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
            comments: [],
        }
    },
    created: function() {
        let id = this.$route.params.id;
        axios.get(`http://localhost:3000/api/posts/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            const resp = response.data
            this.post = resp
            const respuser = response.data.User
            this.user = respuser
            const respcomment = response.data.Comments
            this.comments = respcomment
        })
        .catch((error) => {
            alert(error.response.data.error);
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
    padding: 0.2rem 0.2rem;
    margin: 0.2rem 0.2rem 0rem 0.2rem;
    background-color: #f2f2f2;
    color: #000080;
    font-weight: lighter;
}
.main__nav--button:hover {
    padding: 0.2rem 0.2rem;
    margin: 0.2rem 0.2rem 0rem 0.2rem;
    font-weight: lighter;
}
.card__child {
    border: 0.2rem solid #dc143c;
    padding: 0.5rem 0.5rem;
}
</style>