import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";
import Navigation from "../components/Navigation";

const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const[reponse, setReponse] = useState();
    function creationDonnees(){
        let email = document.querySelector(".email").value;
        let password = document.querySelector(".password").value;

        const data = new FormData();
        data.append('email', email);
        data.append('password', password);

        return data;
    }

    function envoiDonnees(){
        axios.post("http://127.0.0.1:8000/api/login", creationDonnees())
          .then(function (response) {
              setCookie('token', response.data.access_token,[]);
              setReponse(<p className="messageValidation">{response.data.message}</p>);
              document.location.href='http://localhost:3000/';
          })
          .catch(function (error) {
            setReponse(<p className="messageErreur">{error.response.data.message}</p>)
          });
    }
    
    return(
        <div className="divLogin">
        <Navigation/>
        {reponse}
        <form>
            <label for="email">Email</label>
            <input type="text" className="email" name="email"></input>
            <label for="password">Mot de passe</label>
            <input type="password" className="password" name="password"></input>
            <button onClick={(e)=>{
                e.preventDefault();
                envoiDonnees();
            }}>Se connecter</button>
        </form>
        </div>
    )
}

export default Login;