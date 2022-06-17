import React, {useState, useEffect} from "react";
import axios from "axios";
import Navigation from "../components/Navigation";

const Recherche = () => {
    const[data, setData] = useState([]);

    function recevoirDonnees(){
        axios.get("http://127.0.0.1:8000/api/actualites")
        .then((result)=>{
            setData(result.data);
        })
        .catch((error)=>{})
    };

    function remplacementEspacesTirets(espaces){
        let espacesSplit=espaces.split(" ");
        let nouveauEspaces=[];
        for(let i=0; i<=espacesSplit.length-1; i++){
            if(espacesSplit[i]!==""){
                nouveauEspaces.push(espacesSplit[i]);
            }
        };
        return nouveauEspaces.join("-");
    };

    function croissantDecroissant(valeurTri){

        const data = new FormData();
        data.append('date', valeurTri);

        return data;
    }

    function rechercheDonnees(recherche, valeurTri){
        axios.post("http://127.0.0.1:8000/api/search/-"+recherche, croissantDecroissant(valeurTri))
        .then((result)=>{
            setData(result.data);
        })
        .catch((error)=>{})
    };

    useEffect(()=>{recevoirDonnees()},[]);

    return (
        <div className="divRecherche">
            <Navigation/>
            <form>
                <input className="inputRecherche" type="text"></input>
                <button onClick={(e)=>{
                    e.preventDefault();
                    rechercheDonnees(remplacementEspacesTirets(document.querySelector(".inputRecherche").value), "");
                }}>Rechercher</button>
            </form>
            <div className="divFiltre">
                <button onClick={(e)=>{
                    e.preventDefault();
                    rechercheDonnees(remplacementEspacesTirets(document.querySelector(".inputRecherche").value), "croissant");
                }}>Tri date Croissant</button>
                <button onClick={(e)=>{
                    e.preventDefault();
                    rechercheDonnees(remplacementEspacesTirets(document.querySelector(".inputRecherche").value), "decroissant");
                }}>Tri date Decroissant</button>
            </div>
            <div className="divMap">
                {data.map((resultat)=>{
                    return(
                        <a href={remplacementEspacesTirets(resultat.titre)+"-"+resultat.id}>
                            <p>{resultat.titre}</p>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default Recherche;