import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { useCookies } from 'react-cookie';

const MesActualites = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const[titre, setTitre] = useState();
    const[contenu, setContenu] = useState();
    const[data, setData] = useState([]);
    const[reponse,setReponse] = useState();

    function recevoirDonnees(){
        axios.get("http://127.0.0.1:8000/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
        .then((response)=>{
            axios.get("http://127.0.0.1:8000/api/mesactualites/"+response.data, {
                headers: {
                    'Authorization': "Bearer "+cookies.token
                  }
            })
            .then((result)=>{
                setData(result.data)
            })
            .catch((error)=>{})
        })
        .catch((error)=>{})
    }

    useEffect(()=>{
        recevoirDonnees();
    },[]);

    function creationDonneesSuppression(id){
        const data = new FormData();
        data.append('user_id', id);
        return data;
    }

    function suppressionDonnees(id){
        axios.get("http://127.0.0.1:8000/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
        .then((response)=>{
            axios.post("http://127.0.0.1:8000/api/destroy/"+id, creationDonneesSuppression(response.data), {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': "Bearer "+cookies.token
                }
            })
            .then(function (result) {
                setReponse(<p className="messageValidation">Suppression Actualite reussi</p>);
                document.location.href='http://localhost:3000/MesActualites';
            })
            .catch(function (error) {
                setReponse(<p className="messageErreur">Echec suppression Actualite</p>);
            });
        })
    }
    
    return (
        <div className="divMesActualites">
            <Navigation/>
            {reponse}
            <div className="actualitesMap">
            {data.map((resultat)=>{
                return(
                    <div className="actualite">
                        <p>{resultat.titre}</p>
                        <div className="supprimerModifier">
                        <a href={"Modification/"+resultat.id}>
                            <button>Modifier</button>
                        </a>
                        <button onClick={(e)=>{
                            e.preventDefault();
                            suppressionDonnees(resultat.id);
                        }}>Supprimer</button>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default MesActualites;