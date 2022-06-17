import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import Commentaire from "./Commentaire";

const Contenu = () => {
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
    
    return (
        <div className="divContenu">
            <Navigation/>
            <h1>{titre}</h1>
            {contenu.map((response)=>{
                if(response.sous_titre){
                    return (<h2>{response.sous_titre}</h2>)
                }else{
                    return (<p>{response.paragraphe}</p>)
                }
            })}
            {Commentaire(id)}
        </div>
    )
}

export default Contenu;