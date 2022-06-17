import React from "react";
import Navigation from "../components/Navigation";

const Accueil = () => {
    
    return(
        <div className="divAccueil">
        <Navigation/>
        <h1>Site de mise en ligne d'actualites en ligne</h1>
        <h2>Inscription</h2>
        <p>
            Pour vous inscrire il faut cliquer sur "Inscription" 
            dans la barre de navigation en haut de la page. Ensuite 
            vous aurez acces a un formulaire d'inscription. Vous 
            devez remplir le champ "Pseudo" avec un pseudonyme, le 
            champ "Email" avec votre adresse mail et le champ "Mot de passe" 
            avec un mot de passe (votre mot de passe doit contenir un minimum 
            de 8 caracteres, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractere 
            speciale). Une fois que vous avez rempli tous les champs 
            vous devez cliquer sur le bouton "S'inscrire".
        </p>
        <h2>Connexion</h2>
        <p>
            Pour vous connecter il faut cliquer sur "Connexion" 
            dans la barre de navigation en haut de la page. Ensuite 
            vous aurez acces a un formulaire de connexion. Vous 
            devez remplir le champ "Email" avec votre adresse mail et le champ 
            "Mot de passe" avec votre mot de passe. Une fois que vous avez rempli 
            tous les champs vous devez cliquer sur le bouton "Se connecter".
        </p>
        <h2>Creer son Actualite</h2>
        <p>
            Pour creer son Actualite il faut cliquer sur "Creer son Actualite" 
            dans la barre de navigation en haut de la page. Ensuite vous 
            aurez acces a un formulaire de mise en ligne de votre Actualite. 
            Premierement il faut remplir le champ "titre" avec le titre de votre 
            Actualite et deuxiemement il faut remplir le champ "contenu" 
            avec le contenu de votre actualite.
        </p>
        <h2>Modifier son Profil</h2>
        <p>
            Pour modifier son Profil il faut cliquer sur "Profil" 
            dans la barre de navigation en haut de la page. Pour modifier 
            son Profil il suffit de remplir le champ correspondant
            et appuyer sur le bouton "Modifier" du champ en question.
        </p>
        <h2>Desinscription</h2>
        <p>
            Pour se desinscrire il faut cliquer sur "Profil" 
            dans la barre de navigation en haut de la page. Pour 
            vous desinscrire appuyer sur le bouton "Se desinscrire" en bas de la page.
        </p>
        <h2>Rechercher une Actualite</h2>
        <p>
            Pour rechercher une Actualite il faut cliquer sur "Rechercher" 
            dans la barre de navigation en haut de la page. Remplissez 
            le champ de recherche avec votre requete puis cliquez sur "Rechercher".
        </p>
        <h2>Acceder a une Actualite</h2>
        <p>
            Pour acceder a un CV il faut cliquer sur un CV sous la barre de recherche.
        </p>
        </div>
    )
}

export default Accueil;