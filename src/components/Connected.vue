<template>
    <div class ="main">
        <h1>Connected</h1>
        <button @click="logout()">Se déconnecter</button>
    </div>
</template>

<script>
import router from '../router';
    export default {
        name: "Connected",
        methods: {
            logout() {
                localStorage.removeItem("token");
                router.push("/");
            }
        }
    }
</script>

<style>
</style>