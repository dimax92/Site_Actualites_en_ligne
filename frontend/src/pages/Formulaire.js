import React, {useState, useEffect} from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import Navigation from "../components/Navigation";

const Formulaire = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const[reponse,setReponse] = useState();
    const[reponseTitre,setReponseTitre] = useState();
    const[reponseContenu,setReponseContenu] = useState();

    function creationObjetActualite(divSelection){
        let objetActualite = [];
        for(let i = 0; i < divSelection.children.length; i++){
            let objetActualiteSup = new Object();
            if(divSelection.children[i].children[0].className === "inputSousTitre"){
                objetActualiteSup["sous_titre"] = divSelection.children[i].children[0].value;
            }if(divSelection.children[i].children[0].className === "inputContenu"){
                objetActualiteSup["paragraphe"] = divSelection.children[i].children[0].value;
            }
            objetActualite.push(objetActualiteSup);
        }
        return objetActualite;
    }

    function creationDonnees(id, divSelection){
        let titre = document.querySelector(".titre").value;
        let contenu = JSON.stringify(creationObjetActualite(divSelection));

        const data = new FormData();
        data.append('user_id', id);
        data.append('titre', titre);
        data.append('contenu', contenu);

        return data;
    }

    function messageValidation(){
        setReponse(<p className="messageValidation">Creation Actualite reussi</p>)
        setReponseTitre();
        setReponseContenu();
      }
  
      function messageErreur(error){
        setReponse(<p className="messageErreur">Echec creation Actualite</p>)
        if(error.response.data.titre){
            setReponseTitre(<p className="messageErreurInput">{error.response.data.titre}</p>)
        }else{
            setReponseTitre()
        }if(error.response.data.contenu){
          setReponseContenu(<p className="messageErreurInput">{error.response.data.contenu}</p>)
        }else{
          setReponseContenu()
        }
      }

    function envoiDonnees(divSelection){
        axios.get("http://127.0.0.1:8000/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
          .then(function (response) {
            axios.post("http://127.0.0.1:8000/api/creationactualite/"+response.data, creationDonnees(response.data, divSelection), {
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
          .catch(function (error) {
          });
    }

    return (
        <div className="divFormulaire">
            <Navigation/>
            {reponse}
            <form className="formulaire">
            <label for="titre">Titre</label>
            {reponseTitre}
            <input className="titre" id="titre"></input>
            {reponseContenu}
            <div className="divSelection"></div>
            <label for="selection">Choisir</label>
            <div className="options">
                <select name="selection" id="selection">
                    <option value="">--Choisir une option--</option>
                    <option value="sous-titre">Sous-titre</option>
                    <option value="paragraphe">Paragraphe</option>
                </select>
                <i className="fas fa-solid fa-plus" onClick={e => {
                    let divSelection = document.querySelector(".divSelection");
                    let selection = document.querySelector("#selection");
                    if(selection.value === "sous-titre"){
                        let divTitre = document.createElement("div");
                        divTitre.className="divTitre";
                        divSelection.appendChild(divTitre);
                        let nouveauInput = document.createElement("input");
                        nouveauInput.className="inputSousTitre";
                        nouveauInput.placeholder="sous-titre";
                        divTitre.appendChild(nouveauInput);
                        let suppInput=document.createElement("i");
                        suppInput.className="fas suppInput fa-solid fa-plus";
                        divTitre.appendChild(suppInput);
                        suppInput.addEventListener("click",()=>{
                            divTitre.remove();
                        });
                    }if(selection.value === "paragraphe"){
                        let divParagraphe = document.createElement("div");
                        divParagraphe.className="divParagraphe";
                        divSelection.appendChild(divParagraphe);
                        let nouveauInput = document.createElement("textarea");
                        nouveauInput.className="inputContenu";
                        nouveauInput.placeholder="paragraphe";
                        divParagraphe.appendChild(nouveauInput);
                        let suppInput=document.createElement("i");
                        suppInput.className="fas suppInput fa-solid fa-plus";
                        divParagraphe.appendChild(suppInput);
                        suppInput.addEventListener("click",()=>{
                            divParagraphe.remove();
                        });
                    }
                    }}>
                </i>
            </div>
            <button onClick={e => {
                e.preventDefault();
                let divSelection = document.querySelector(".divSelection");
                envoiDonnees(divSelection)
            }}>Mettre en ligne</button>
            </form>
        </div>
    )
}

export default Formulaire;