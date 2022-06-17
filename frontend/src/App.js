import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Contenu from "./pages/Contenu";
import Formulaire from "./pages/Formulaire";
import Inscription from "./pages/Inscription";
import Login from "./pages/Login";
import MesActualites from "./pages/MesActualites";
import Modification from "./pages/Modification";
import Profil from "./pages/Profil";
import Recherche from "./pages/Recherche";

const App=()=>{
    return(
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Accueil/>}/>
        <Route exact path="/Inscription" element={<Inscription/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/Formulaire" element={<Formulaire/>}/>
        <Route exact path="/Recherche" element={<Recherche/>}/>
        <Route exact path="/:titre-:id/" element={<Contenu/>}/>
        <Route exact path="/MesActualites" element={<MesActualites/>}/>
        <Route exact path="/Modification/:id/" element={<Modification/>}/>
        <Route exact path="/Profil" element={<Profil/>}/>
      </Routes>
   </BrowserRouter>
    );
};
export default App;
