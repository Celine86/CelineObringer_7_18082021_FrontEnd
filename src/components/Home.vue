<template>
    <main>
        <h1>Home</h1>
        <div class="card">
            <div class="card__child">
                <img alt="Groupomania logo" src="@/assets/icon.svg" class="card__child--logo"/>
            </div>
            <div class="card__child">
                <h2>Bienvenue !</h2><br>
                <p>Avant de vous inscrire nous vous invitons à consulter la charte et prendre connaissance de la réglementation RGPD.<br>
                En vous inscrivant vous reconnaissez avoir lu et accepté la charte !</p>
            </div>
            <div class="card__child">
                <p><router-link to="/signup">Créer un compte</router-link> || 
                <router-link to="/signin">Se connecter</router-link></p>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        Name: "Home"
    }
</script>

<style scoped>
.card {
    border: 0.2rem solid #dc143c;
    border-radius: 2rem;
    background: #f2f2f2;
    padding: 2rem;
    margin: 2rem;
    max-width: 50rem;
}
.card__child {
    margin: 0.5rem 0rem;
    padding: 0.5rem 0rem;
}
.card__child--logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 20rem;
    height: auto;
}
.card__child a {
    color: #dc143c;
}
.card__child a:hover {
    color: #000080;
    text-decoration: none;
}
</style>