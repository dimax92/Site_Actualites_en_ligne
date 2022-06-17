import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { useCookies } from 'react-cookie';

const Modification = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const[reponse,setReponse] = useState();
    const[reponseTitre,setReponseTitre] = useState();
    const[reponseContenu,setReponseContenu] = useState();

    const[titre, setTitre] = useState();
    const[contenu, setContenu] = useState([]);

    let { id } = useParams();

    function recevoirDonnees(id){
        axios.get("http://127.0.0.1:8000/api/actualites/"+id)
        .then((result)=>{
            setTitre(result.data.titre);
            setContenu(JSON.parse(result.data.contenu));
        })
        .catch((error)=>{})
    }

    useEffect(()=>{
        recevoirDonnees(id);
    },[]);

    function creationParagrapheSousTitre(){
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
    }

    function messageValidation(){
        setReponse(<p className="messageValidation">Actualite modifie</p>)
        setReponseTitre();
        setReponseContenu();
    }
  
    function messageErreur(error){
        setReponse(<p className="messageErreur">Echec modification Actualite</p>)
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

    function envoiDonnees(divSelection){
        axios.get("http://127.0.0.1:8000/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
        .then(function (response) {
            axios.post("http://127.0.0.1:8000/api/update/"+id, creationDonnees(response.data, divSelection), {
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
        <div className="divModification">
            <Navigation/>
            {reponse}
            <form>
                <label for="titre">Titre</label>
                {reponseTitre}
                <input className="titre" id="titre" defaultValue={titre}></input>
                <label for="divSelection">Contenu</label>
                {reponseContenu}
                <div className="divSelection" id="divSelection">
                    {contenu.map((response)=>{
                        if(response.sous_titre){
                            return (
                                <div className="divTitre">
                                    <input className="inputSousTitre" defaultValue={response.sous_titre} placeholder="sous-titre"></input>
                                    <i className="fas suppInput fa-solid fa-plus" onClick={(e)=>{
                                        e.target.parentElement.remove()
                                    }}></i>
                                </div>
                            )
                        }else{
                            return (
                                <div className="divParagraphe">
                                    <textarea className="inputContenu" defaultValue={response.paragraphe} placeholder="paragraphe"></textarea>
                                    <i className="fas suppInput fa-solid fa-plus" onClick={(e)=>{
                                        e.target.parentElement.remove()
                                    }}></i>
                                </div>
                            )
                        }
                    })}
                </div>
                <label for="selection">Choisir</label>
                <div className="options">
                    <select name="selection" id="selection">
                        <option value="">--Choisir une option--</option>
                        <option value="sous-titre">Sous-titre</option>
                        <option value="paragraphe">Paragraphe</option>
                    </select>
                    <i className="fas fa-solid fa-plus" onClick={e => {
                        creationParagrapheSousTitre();
                    }}>
                    </i>
                </div>
            <button onClick={e => {
                e.preventDefault();
                let divSelection = document.querySelector(".divSelection");
                envoiDonnees(divSelection)
            }}>Modifier</button>
            </form>
        </div>
    )
}

export default Modification;