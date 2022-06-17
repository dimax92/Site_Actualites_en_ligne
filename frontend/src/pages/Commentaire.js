import React, {useState, useEffect} from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import Navigation from "../components/Navigation";

const Commentaire = (id) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const[reponse, setReponse] = useState();
    const[reponseCommentaire, setReponseCommentaire] = useState();
    const[commentaires, setCommentaires] = useState([]);

    function recevoirCommentaires(id){
        axios.get("http://127.0.0.1:8000/api/recuperationcommentaire/"+id)
        .then((result)=>{
            setCommentaires(result.data);
        })
        .catch((error)=>{})
    }

    useEffect(()=>{
        recevoirCommentaires(id);
    },[]);

    function creationDonnees(userId){
        let commentaire = document.querySelector("#inputCommentaire").value;

        const data = new FormData();
        data.append('user_id', userId);
        data.append('commentaire', commentaire);

        return data;
    }

    function messageValidation(){
        setReponse(<p className="messageValidation">Creation Commentaire reussi</p>)
        setReponseCommentaire();
    }
  
    function messageErreur(error){
        setReponse(<p className="messageErreur">Echec creation Commentaire</p>)
        if(error.response.data.message){
            setReponseCommentaire(<p className="messageErreurInput">{error.response.data.message}</p>)
        }else{
            setReponseCommentaire()
        }
    }

    function envoiDonneesCommentaire(id){
        axios.get("http://127.0.0.1:8000/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
        .then(function (response) {
            axios.post("http://127.0.0.1:8000/api/creationcommentaire/"+id, creationDonnees(response.data), {
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
            messageErreur(error);
        });
    }

    return(
        <div className="divCommentaire">
            {reponse}
            <form>
                {reponseCommentaire}
                <label for="inputCommentaire">Ecrire un commentaire</label>
                <textarea id="inputCommentaire"></textarea>
                <button onClick={(e)=>{
                    e.preventDefault();
                    envoiDonneesCommentaire(id);
                }}>Mettre en ligne</button>
            </form>
            <div className="commentaires">
                {commentaires.map((response)=>{
                    return (
                        <div className="commentaire">
                            <p className="pseudoCommentaire">{response.pseudo}</p>
                            <p className="contenuCommentaire">{response.commentaire}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Commentaire;