<template>
    <div class ="main">
        <h1>Connected</h1><br>
        <h2>Username : {{username}}</h2><br>
        <h2>Email: {{email}}</h2><br>
        <h2>Avatar: {{avatar}}</h2><br>
        <img :src="avatar"><br><br>
        <form @submit.prevent="updateAvatar()" enctype="multipart/form-data">
            <label for="File">Nouvel Avatar</label><br>
            <input @change="modifyFile()" type="file" ref="file" name="image" id="File" accept=".jpg, .jpeg, .gif, .png"><br>
            <button type="submit">Valider</button>
        </form>

        <button @click="logout()">Se déconnecter</button>
        <button @click="deleteAccount()">Supprimer mon compte</button>
    </div>
</template>

<script>
import router from '../router';
import axios from 'axios';

    export default {
        name: "Connected",
        data() {
            return {
                username: "",
                email: "",
                avatar: "",
                file: null,
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
                axios.put("http://127.0.0.1:3000/api/users/profils/" + localStorage.getItem("userId"), formData, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")} });
                router.go();
            },
            deleteAccount() {
                axios.delete("http://127.0.0.1:3000/api/users/profils/" + localStorage.getItem("userId"), { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")} })
                localStorage.clear()
                router.push("/");
            },
        },
        created: function() {
            axios.get("http://127.0.0.1:3000/api/users/profils/" + localStorage.getItem("userId"),{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
            .then(user => {
                console.log(user.data.userInfos);
                this.username = user.data.userInfos.username;
                this.email = user.data.userInfos.email;
                this.avatar = user.data.userInfos.avatar;
            })
            .catch(function(error) {
                console.log(error);
            })
        },
    }
</script>

<style>
</style>