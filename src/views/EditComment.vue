<template>
    <main>  
        <div class = "card">
            <div class="card__child">
                <label for="editComment" class="card__input">Message </label>
                <textarea id="editComment" v-model="editComment" rows="10" cols="50" resize:none></textarea>
            </div>
            <div>
                <input value="Valider" type="submit" @click="modifyComment()" class="card__btn">
            </div>
        </div>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
        <div class="message" v-if="message != ''"> {{ message }} </div>
    </main>
</template>

<script>
// import axios from "axios"
import api from "../services/api";
import router from "../router"
export default {
    name: "EditPost",
    data() {
        return {            
            editComment: "",
            error: "",
            message: "",
        }
    },
    methods: {
        modifyComment() {
            let id = this.$route.params.id;
            api.put(`/api/posts/comment/${id}`, {"comment": this.editComment }, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                if (response.status === 200) {
                    this.message = response.data.message
                    router.push(`/singlecomment/${id}`);
                }
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        }
    },
    created() {
        let id = this.$route.params.id;
        api.get(`/api/posts/comment/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            console.log(response)
            console.log(response.data.User.id)
            this.editComment = response.data.comment
            let authorID =  response.data.User.id
            let userID = localStorage.getItem("userId")
            let userRole = localStorage.getItem("role")
            if (userID === authorID || userRole === "true") {
                this.message = "Vous pouvez modifer le commentaire si vous le souhaitez"
            } else {
                router.push("/");
            }
        })
        .catch((error) => {
            this.error = error.response.data.error
        })
    }
}
</script>