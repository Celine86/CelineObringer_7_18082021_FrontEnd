<template>
    <main>
        <div class="card">
            <div class="card__child">
                <img alt="Groupomania logo" src="@/assets/icon.svg" class="card__child--logo"/>
            </div>
            <div class="card__child">
                <h1>Bienvenue !</h1>
                <p>Avant de vous inscrire nous vous invitons à consulter la charte d'utilisation.<br>
                En vous inscrivant vous reconnaissez l'avoir lu et acceptée !<br>
                N'hésitez pas à envoyer un e-mail à contecter le Service Communication pour toute question.<br>
                Nous vous répondrons avec plaisir !</p>
            </div>
            <div class="card__child--nav--home">
                <router-link class="card__btn" to="/signup">Inscription</router-link> 
                <router-link class="card__btn" to="/signin">Connexion</router-link>
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
.card__child--nav--home {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    padding-top: 2.5rem;
}
.card__child--logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 20rem;
    height: auto;
}
h1 {
    line-height: 4rem;
}
a {
    font-weight: bold;
    font-size: 1.2rem;
}
</style>