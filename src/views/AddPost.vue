<template>
    <main>
        <h1 class="title">Ajouter un Post</h1>
        <form @submit.prevent enctype="multipart/form-data" class="card">
            <div class="card__child">
                <label for="title" class="card__input">Titre </label>
                <input type="text" v-model="title">
            </div>
            <div class="card__child">
                <label for="content" class="card__input">Message </label>
                <textarea id="content" v-model="content" rows="10" cols="50" resize:none></textarea>
            </div>
                <label class="card__post--file">Ajouter une image ?</label>
                <input @change="modifyFile()" type="file" ref="file" name="image" id="File" accept=".jpg, .jpeg, .gif, .png" class="card__btn">
                <input value="Valider" type="submit" @click="addPost()" class="card__btn" :class="{'card__btn--disabled' : !checkFields}" :disabled="!checkFields">
        </form>
        <div class="message" v-if="message != ''"> {{ message }} </div>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
import api from "../services/api";
import router from '../router';
export default {
    name: "AddPost",
    data() {
        return {
            currentUserId: "",
            title: "",
            content: "",
            file: null,
            error: "",
            message: "",
        }
    },
    computed: { 
        checkFields: function() {
            if (this.title != "" && this.content != "") {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {
        modifyFile() {
            this.file = this.$refs.file.files[0];
            this.avatar = URL.createObjectURL(this.file);
        },
        addPost() {
            const formData = new FormData()
            formData.set("image", this.file)
            formData.set("title", this.title.toString())
            formData.set("content", this.content.toString())
            formData.set("UserId", this.currentUserId.toString())
            api.post(`/api/posts/create/`, formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                this.file = null
                this.title = ""
                this.content = ""
                this.UserId = ""
                this.message = response.data.message
                router.push("/posts");
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        }
    },
    created() {
        this.currentUserId = localStorage.getItem("userId")
    }
}
</script>

<style scoped>
input[type="file"] {
    font-size: bold;
}
</style>