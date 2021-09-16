<template>
    <main>
        <div class="card">
            <div class="card__child">
                <label for="comment" class="card__input">Message </label>
                <textarea id="comment" v-model="comment" rows="10" cols="50" resize:none></textarea>
            </div>
                <input value="Valider" type="submit" @click="addComment()" class="card__btn" :class="{'card__btn--disabled' : !checkFields}" :disabled="!checkFields">
        </div>
            <div class="message" v-if="message != ''"> {{ message }} </div>
            <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
import api from "../services/api";
import router from '../router';
export default {
    name: "AddComment",
    data() {
        return {
            currentUserId: "",
            comment: "",
            error: "",
            message: "",
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
            api.post(`/api/posts/${id}/comment`, { "UserId": this.currentUserId, "comment": this.comment }, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                this.comment = ""
                this.UserId = ""
                this.message = response.data.message
                router.push(`/singlepost/${id}`);
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