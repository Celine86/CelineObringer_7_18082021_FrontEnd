<template>
    <main>  
        <div class = "card">
            <div class="card__child">
                <label for="editComment" class="card__input">Message </label>
                <textarea id="editComment" v-model="editComment" rows="10" cols="50" resize:none></textarea>
            </div>
            <div>
                <input value="Valider" type="submit" @click="modifyComment()">
            </div>
        </div>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
        <div class="message" v-if="message != ''"> {{ message }} </div>
    </main>
</template>

<script>
import axios from "axios"
//import router from "../router"
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
            axios.put(`http://localhost:3000/api/posts/comment/${id}`, {"comment": this.editComment }, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                console.log(response.status)
                if (response.status === 200) {
                    this.message = response.data.message
                    //router.push(`/singlepost/${id}`);
                }
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        }

    },
    created() {
        let id = this.$route.params.id;
        axios.get(`http://localhost:3000/api/posts/comment/${id}`, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(response => {
            console.log(response.data)
            this.editComment = response.data.comment
        })
        .catch((error) => {
            this.error = error.response.data.error
        })
    }
}
</script>

<style scoped>
</style>