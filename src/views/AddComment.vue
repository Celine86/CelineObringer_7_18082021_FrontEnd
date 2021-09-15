<template>
    <main>
        <div class="card">
            <div class="card__child">
                <label for="comment" class="card__input">Message </label>
                <textarea id="comment" v-model="comment" rows="10" cols="50" resize:none></textarea>
            </div>
                <input value="Valider" type="submit" @click="addComment()" class="card__btn" :class="{'card__btn--disabled' : !checkFields}" :disabled="!checkFields">
            </div>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
import router from '../router';
import axios from "axios"

export default {
    name: "AddComment",

    data() {
        return {
            currentUserId: "",
            comment: "",
            error: "",
        }
    },

    computed: { 
        checkFields: function() {
            if (this.comment != "") {
            return true;
            } else {
            return false;
            }
        },
    },

    methods: {
        addComment() {
            let id = this.$route.params.id;
            axios.post(`http://localhost:3000/api/posts/${id}/comment`, { "UserId": this.currentUserId, "comment": this.comment }, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then(() => {
                this.comment = ""
                this.UserId = ""
                router.push(`/singlepost/${id}`);
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        }
    },
    created: function() {
        this.currentUserId = localStorage.getItem("userId")
    }
}
</script>

<style scoped>
textarea {
    resize: none;
}
</style>