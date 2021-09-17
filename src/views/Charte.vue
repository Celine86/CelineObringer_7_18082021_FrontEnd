<template>
    <header>
        <div class="card">
            <h1>Charte</h1>
            <p class="text">La charte ci-dessous régit les règles d'utilisation du réseau social d'entreprise.<br>
            Merci d'en prendre connaissance avant de vous inscrire.<br>
            Toute inscription sur le réseau social d'entreprise vaut acceptation de la présente charte.</p>
            <ol>
                <li>La réglementation <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees" target="_blank">RGPD</a> s'applique sur le réseau d'entreprise.</li>
                <li>Le respect du règlement intérieur d'entreprise s'applique.</li>
                <li>Tout contenu discriminatoire ou allant à l'encontre des lois sera supprimé sans délais et son auteur pourra, selon la gravité du contenu, faire l'objet d'une sanction RH.</li>
                <li>Un admin peut modifier le contenu d'un Post ou d'un Commentaire si cela s'avère nécessaire. Le nom de la personne ayant modifié un Post ou Commentaire apparaîtra en bas à gauche de la publication.</li>
                <li>Un admin peut supprimer votre compte si votre comportement n'est pas approprié et ce après au moins 3 avertissements.</li>
                <li>Vous pouvez à tout moment supprimer votre compte. Lors de la suppression d'un profil tout le contenu associé est également supprimé (posts, commentaires, etc).</li>
                <li>Votre compte et tout le contenu associé (posts, commentaires, etc) sera supprimé lors de votre départ de l'entreprise.</li>
                <li>Merci de rester poli et courtois dans vos échanges. Vous pouvez vous taquiner entre vous mais soyez certain que vos taqueneries seront bien perçues par votre interlocuteur.</li>
                <li>Merci de ne pas spoiler les fins de films, jeux, séries, etc. durant les 6 mois suivant leur sortie.</li>
            </ol>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Charte",
    }
</script>

<style scoped>
h1 {
    line-height: 4rem;
}
ol li {
    color: #000080;
}
.text {
    padding: 1rem;
}
a {
    color: #dc143c;
}
</style>