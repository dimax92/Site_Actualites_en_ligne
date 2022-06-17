import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { useCookies } from 'react-cookie';

const Profil = () => {
    const[cookies, setCookie, removeCookie] = useCookies();
    const[reponse, setReponse] = useState();
    const[reponsePseudo, setReponsePseudo] = useState();
    const[reponseEmail, setReponseEmail] = useState();
    const[reponsePassword, setReponsePassword] = useState();

    function modificationDonnees(nomClass, nom){
        let donnees = document.querySelector(nomClass).value;

        const data = new FormData();
        data.append(nom, donnees);

        return data;
    }

    function suppressionProfil(){
        axios.get("http://127.0.0.1:8000/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
        .then((result)=>{
            axios.post("http://127.0.0.1:8000/api/suppressionprofil/"+result.data, {
                data: {
                    popo: "salut"
                }
            }, {
                headers: {
                    'Authorization': "Bearer "+cookies.token
                }
            })
              .then(function (response) {
                setReponse(<p className="messageValidation">Desinscription reussi</p>);
                document.location.href='http://localhost:3000/';
              })
              .catch(function (error) {
                setReponse(<p className="messageErreur">Echec desinscription</p>)
              });
        })
        .catch((error)=>{})
    }


    function deconnexion(){
        axios.post("http://127.0.0.1:8000/api/logout",{
            data: {
                nom: "popo"
            }}, {
            headers: {
                "Authorization": "Bearer "+cookies.token
              }
        })
          .then(function (response) {
          })
          .catch(function (error) {
          });
    }

    function messageValidation(){
        setReponse(<p className="messageValidation">Modification reussi</p>)
        setReponsePseudo();
        setReponseEmail();
        setReponsePassword();
    }

    function messageErreur(error){
        setReponse(<p className="messageErreur">Echec modification</p>)
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

    function envoiDonneesModification(nomClass, nom){
        axios.get("http://127.0.0.1:8000/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
        .then((response)=>{
            axios.post("http://127.0.0.1:8000/api/updateprofil/"+response.data, modificationDonnees(nomClass, nom), {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': "Bearer "+cookies.token
                }
            })
              .then(function (response) {
                messageValidation();
              })
              .catch(function (error) {
                messageErreur(error);
              });
        })
        .catch((error)=>{})
    }
    
    return (
        <div className="divProfil">
            <Navigation/>
            {reponse}
            <form>
                <label for="pseudo">Pseudo</label>
                {reponsePseudo}
                <input type="text" className="pseudo"></input>
                <button onClick={(e)=>{
                    e.preventDefault();
                    envoiDonneesModification(".pseudo", "pseudo");
                }}>Modifier pseudo</button>
            </form>
            <form>
                <label for="email">Email</label>
                {reponseEmail}
                <input type="text" className="email"></input>
                <button onClick={(e)=>{
                    e.preventDefault();
                    envoiDonneesModification(".email", "email");
                }}>Modifier Mail</button>
            </form>
            <form>
                <label for="password">Mot de passe(doit contenir au moins 8 caracteres, 1 Majuscule, 1 minuscule, 1 chiffre et 1 caractere speciale)</label>
                {reponsePassword}
                <input type="password" className="password"></input>
                <button onClick={(e)=>{
                    e.preventDefault();
                    envoiDonneesModification(".password", "password");
                }}>Modifier Mot de passe</button>
            </form>
            <button className="desinscription" onClick={(e)=>{
                    e.preventDefault();
                    suppressionProfil();
                }}>Se desinscrire</button>
        </div>
    )
}

export default Profil;