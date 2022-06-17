import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";
import Navigation from "../components/Navigation";

const Inscription = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const[reponse, setReponse] = useState();
    const[reponsePseudo, setReponsePseudo] = useState();
    const[reponseEmail, setReponseEmail] = useState();
    const[reponsePassword, setReponsePassword] = useState();
    function creationDonnees(){
        let pseudo = document.querySelector(".pseudo").value;
        let email = document.querySelector(".email").value;
        let password = document.querySelector(".password").value;

        const data = new FormData();
        data.append('pseudo', pseudo);
        data.append('email', email);
        data.append('password', password);

        return data;
    }

    function messageValidation(){
        setReponse(<p className="messageValidation">Inscription reussi</p>)
        setReponsePseudo();
        setReponseEmail();
        setReponsePassword();
    }

    function messageErreur(error){
        setReponse(<p className="messageErreur">Echec inscription</p>)
        if(error.response.data.pseudo){
            setReponsePseudo(<p className="messageErreurInput">{error.response.data.pseudo}</p>)
        }else{
            setReponsePseudo()
        }if(error.response.data.email){
            setReponseEmail(<p className="messageErreurInput">{error.response.data.email}</p>)
        }else{
            setReponseEmail()
        }if(error.response.data.password){
            setReponsePassword(<p className="messageErreurInput">{error.response.data.password}</p>)
        }else{
            setReponsePassword()
        }
    }

    function envoiDonnees(){
        axios.post("http://127.0.0.1:8000/api/register", creationDonnees())
          .then(function (response) {
              setCookie('token', response.data.access_token,[]);
              messageValidation();
              document.location.href='http://localhost:3000/';
          })
          .catch(function (error) {
            messageErreur(error);
          });
    }
    
    return(
        <div className="divInscription">
        <Navigation/>
        {reponse}
        <form>
            <label for="pseudo">Pseudo</label>
            {reponsePseudo}
            <input type="text" className="pseudo" name="pseudo"></input>
            <label for="email">Email</label>
            {reponseEmail}
            <input type="text" className="email" name="email"></input>
            <label for="password">Mot de passe(doit contenir au moins 8 caracteres, 1 Majuscule, 1 minuscule, 1 chiffre et 1 caractere speciale)</label>
            {reponsePassword}
            <input type="password" className="password"></input>
            <button onClick={(e)=>{
                e.preventDefault();
                envoiDonnees();
            }}>S'inscrire</button>
        </form>
        </div>
    )
}

export default Inscription;