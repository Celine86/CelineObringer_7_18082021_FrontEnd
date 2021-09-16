<template>
    <main>
        <div class="card">
            <div class="card__child">
                <img alt="Groupomania logo" src="@/assets/icon.svg" class="card__child--logo"/>
            </div>
            <div class="card__child">
                <h1>Bienvenue !</h1>
                <p>Avant de vous inscrire nous vous invitons à consulter la <a class="link--red" :href="'#/charte'">charte d'utilisation</a>.<br>
                En vous inscrivant vous reconnaissez l'avoir lu et acceptée.<br>
                N'hésitez pas à contacter le Service Communication pour toute question.<br>
                Nous vous répondrons avec plaisir !</p>
            </div>
            <div class="card__child--nav">
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
h1 {
    line-height: 4rem;
}
.card__child--nav a {
    font-weight: bold;
    font-size: 1.2rem;
}
.card__btn {
    color: #f2f2f2;
}
.card__btn:hover {
    color: #f2f2f2;
}
</style>