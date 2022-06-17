<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actualites;
use Validator;
use Illuminate\Support\Facades\DB;

class ActualitesController extends Controller
{
    //
    public function store(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            "titre" => "required|string",
            "contenu" => "required|string|regex:#[a-z]#"
            ]
        );

        if($validator->fails()){
            return response()->json($validator->errors(), 401);       
        }

        $actualite = Actualites::create([
            "user_id" => $id,
            "titre" => $request->input("titre"),
            "contenu" => $request->input("contenu")
        ]);
        return response()->json(["message" => "actualite cree (vous avez jusqu'a 24 heures pour modifier votre actualite)"], 201);;
    }

    public function index()
    {
        return Actualites::all();
    }

    public function search(Request $request, $search)
    {
        if($search !== "-"){
            if($request->input("date") === "croissant"){
                return DB::select("SELECT * FROM `actualites` WHERE filtre_recherche(REPLACE('$search', '-', ' '), CONCAT(`titre`, ' ', transformation_objet(`contenu`))) = 10 ORDER BY `created_at` ASC ");
            }else if($request->input("date") === "decroissant"){
                return DB::select("SELECT * FROM `actualites` WHERE filtre_recherche(REPLACE('$search', '-', ' '), CONCAT(`titre`, ' ', transformation_objet(`contenu`))) = 10 ORDER BY `created_at` DESC ");
            }else{
                return DB::select("SELECT * FROM `actualites` WHERE filtre_recherche(REPLACE('$search', '-', ' '), CONCAT(`titre`, ' ', transformation_objet(`contenu`))) = 10 ");
            }
        }else{
            if($request->input("date") === "croissant"){
                return DB::select("SELECT * FROM `actualites` ORDER BY `created_at` ASC ");
            }else if($request->input("date") === "decroissant"){
                return DB::select("SELECT * FROM `actualites` ORDER BY `created_at` DESC ");
            }else{
                return DB::select("SELECT * FROM `actualites` ");
            }
        }
    }

    public function show($id)
    {
        $actualites = Actualites::findOrFail($id);
        return $actualites;
    }

    public function update(Request $request, $id)
    {
        $userIdRequete = intval($request->input("user_id"));

        $actualites = Actualites::firstWhere('id','=',$id);

        $userIdUpdate = $actualites->user_id;

        $validator = Validator::make($request->all(),[
            "titre" => "required|string",
            "contenu" => "required|string|regex:#[a-z]#"
            ]
        );

        if($validator->fails()){
            return response()->json($validator->errors(), 401);       
        }

        list($date, $horaire) = explode(" ", $actualites->created_at);
        list($annee, $mois, $jour) = explode("-", $date);
        list($heure, $minutes, $secondes) = explode(":", $horaire);
        $jour = $jour+1;
        $dateLimite = mktime($heure, $minutes, $secondes, $mois, $jour, $annee);
        $dateActuelle = mktime(date("H"), date("i"), date("s"), date("m"), date("d"), date("Y"));
        if($dateLimite >= $dateActuelle){
            if($userIdRequete === $userIdUpdate){
                $actualites->update([
                    "titre" => $request->input("titre"),
                    "contenu" => $request->input("contenu")
                ]);
                return response()->json(["message" => "modifier"], 201);  
            }else{
                return response()->json(["message" => "echec modification"], 401);  
            }
        }else{
            return response()->json(["message" => "le temps limite de modification est depasse"], 402);
        }

    }

    public function destroy(Request $request, $id)
    {
        $userIdRequete = intval($request->input("user_id"));
        $actualites = Actualites::firstWhere('id','=',$id);
        $userIdUpdate = $actualites->user_id;

        if($userIdRequete === $userIdUpdate){
            $actualites->delete();
            return response()->json(["message" => "supprimer"], 201);  
        }else{
            return response()->json(["message" => "echec suppression"], 401);  
        }
    }

    public function mesActualites($id)
    {
        return DB::select("SELECT * FROM `actualites` WHERE `user_id` = '$id' ");
    }
}
