<template>
    <main>
        <div class="main__nav">
            <button class="main__nav--button" @click="reload()">Recharger les Posts</button>
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
                        <p class="information--p">Post Modifié par {{ post.modifiedBy }} </p>
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
import axios from "axios"

export default {
    name: "Posts",
    data() {
        return {
            posts: [],
            error: "",
            modifiedBy: "",
        }
    },
    methods: {
        reload() {
            location.reload();
        }
    }, 
    created() {
        axios.get("http://localhost:3000/api/posts/", { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            const resp = response.data
            this.posts = resp
        })
        .catch((error) => {
            this.error = error.response.data.error
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
.important--red {
    color: #dc143c;
}
.important--blue {
    font-size: 1rem;
    font-weight: bold;
    color: #000080;
}
.card__child--nav {
    padding-bottom: 2rem;
}
</style>