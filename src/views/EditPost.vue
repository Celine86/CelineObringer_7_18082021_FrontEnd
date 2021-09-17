<template>
    <main>  
        <h1 class="title">Modifier un Post</h1>
        <form @submit.prevent enctype="multipart/form-data" class="card">
            <div class="card__child">
                <label for="editTitle" class="card__input">Titre </label>
                <input type="text" v-model="editTitle">
            </div>
            <div class="card__child">
                <label for="editContent" class="card__input">Message </label>
                <textarea id="editContent" v-model="editContent" rows="10" cols="50" resize:none></textarea>
            </div>
                <img :src="editImage" class="card__postimage">
                <label class="card__post--file">Modifier l'image ?</label>
                <input @change="modifyFile()" type="file" ref="file" name="image" id="File" accept=".jpg, .jpeg, .gif, .png" class="card__btn">
                <input value="Valider" type="submit" @click="modifyPost()" class="card__btn">
        </form>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
        <div class="message" v-if="message != ''"> {{ message }} </div>
    </main>
</template>

<script>
import api from "../services/api";
import router from "../router"
export default {
    name: "EditPost",
    data() {
        return {            
            editTitle: "",
            editContent: "",
            editImage: "",
            error: "",
            message: "",
            authorID: "",
            userID: "",
            userRole: "",
        }
    },
    methods: {
        modifyFile() {
            this.file = this.$refs.file.files[0];
            this.avatar = URL.createObjectURL(this.file);
        },
        modifyPost() {
            const formData = new FormData()
            formData.set("image", this.file)
            formData.set("title", this.editTitle.toString())
            formData.set("content", this.editContent.toString())
            let id = this.$route.params.id;
            api.put(`/api/posts/${id}`, formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                if (response.status === 200) {
                    this.message = response.data.message
                    router.push("/posts");
                }
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        }
    },
    created() {
        let id = this.$route.params.id;
        api.get(`/api/posts/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            this.editTitle = response.data.title
            this.editContent = response.data.content
            this.editImage = response.data.imageUrl
            let authorID =  response.data.User.id
            let userID = localStorage.getItem("userId")
            let userRole = localStorage.getItem("role")
            if (userID === authorID || userRole === "true") {
                this.message = "Vous pouvez modifer le post si vous le souhaitez"
            } else {
                router.push("/posts");
            }
        })
        .catch((error) => {
            this.error = error.response.data.error
        })
    }
}
</script>