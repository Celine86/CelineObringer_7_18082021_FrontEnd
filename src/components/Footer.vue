<template>
    <footer>
        <div class="nav">
            <router-link to="/charte">Charte d'utilisation</router-link>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
    }
</script>

<style scoped>
footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
}
.nav a{
    font-size: 0.8rem;
}
.nav a:hover{
    font-size: 0.8rem;
}
</style>