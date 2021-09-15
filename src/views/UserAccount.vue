<template>
    <main>
        <div class="card">
            <h1>Bonjour {{username}} !</h1><br>
            <h3>{{email}}</h3><br>
            <img :src="avatar" class="card__avatar"><br>
            <form @submit.prevent enctype="multipart/form-data" class ="card__options">
                <label for="File" class="card__avatar--file">Nouvel Avatar</label>
                <input @change="modifyFile()" type="file" ref="file" name="image" id="File" accept=".jpg, .jpeg, .gif, .png" class="card__btn">
                <input value="Valider l'Avatar" type="submit" @click="updateAvatar()" class="card__btn">
            </form>
            <div class ="card__options">
                <button @click="logout()" class="card__btn">Se déconnecter</button>
                <button @click="deleteAccount()" class="card__btn">Supprimer mon compte</button>
            </div>
            <div>
                <label for="delete">Etes-vous sûr de vouloir supprimer votre compte ? </label>
                <input type="checkbox" id="delete" name="delete">
            </div>
        </div>
        <div class="message" v-if="message != ''"> {{ message }} </div>
        <div class="alert" v-if="error != ''"> {{ error }} </div>
    </main>
</template>

<script>
import router from '../router';
import axios from 'axios';
export default {
    name: "UserAccount",
    data() {
        return {
            username: '',
            email: '',
            avatar: '',
            file: null,
            error: '',
            message: '',
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("avatar");
            localStorage.removeItem("role");
            router.push("/");
        },
        modifyFile() {
            this.file = this.$refs.file.files[0];
            this.avatar = URL.createObjectURL(this.file);
        },
        updateAvatar() {
            const formData = new FormData();
            formData.append("image", this.file);
            axios.put("http://127.0.0.1:3000/api/users/profils/" + localStorage.getItem("userId"), formData, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")} })
            .then(() => {
                location.reload();
            })
            .catch((error) => {
                this.error = error.response.data.error
            })
        },
        deleteAccount() {
            if (document.getElementById('delete').checked) {
                axios.delete("http://127.0.0.1:3000/api/users/profils/" + localStorage.getItem("userId"), { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")} })
                .then(() => {
                    localStorage.clear()
                    router.push("/");
                })
                .catch((error) => {
                    this.error = error.response.data.error
                })
            } else {
                this.message = "Merci de cocher la case si vous souhaitez réellement supprimer votre compte"
                //location.reload();
            }
        },
    },
    created: function() {
        axios.get("http://127.0.0.1:3000/api/users/profils/" + localStorage.getItem("userId"),{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(user => {
            this.username = user.data.userInfos.username;
            this.email = user.data.userInfos.email;
            this.avatar = user.data.userInfos.avatar;
        })
        .catch((error) => {
            this.error = error.response.data.error
        })
    },
}
</script>

<style scoped>
.card {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: space-around;
}
.card__avatar {
    width: 100%;
    max-width: 25rem;
    height: auto;
}
.card__btn {
    border: 0.15rem solid #dc143c;
    padding: 0.2rem 0.4rem;
    margin: 0.2rem 0.4rem;
    cursor: pointer;
    background-color: #f2f2f2;
    color: #000080;
    font-weight: bold;
    font-size: 1rem;
}
.card__avatar--file {
    border: 0.15rem solid #dc143c;
    padding: 0.2rem 0.4rem;
    margin: 0.2rem 0.4rem;
    cursor: pointer;
    background-color: #f2f2f2;
    color: #000080;
    font-weight: bold;
    font-size: 1rem;
}
input[type="file"] {
    display: none;
}
.card__options {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 0.5rem 0;
}
</style>