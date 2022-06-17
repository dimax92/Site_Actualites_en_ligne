<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commentaire;
use App\Models\Actualites;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\DB;

class CommentairesController extends Controller
{
    //
    public function store(Request $request, $id)
    {
        $actualites = Actualites::firstWhere('id','=',$id);
        $userIdActualite = $actualites->user_id;

        $userId = intval($request->input("user_id"));
        $user = User::firstWhere('id', '=', $userId);
        $pseudo = $user->pseudo;
        $validator = Validator::make($request->all(),[
            "commentaire" => "required|string"
            ]
        );

        if($validator->fails()){
            return response()->json($validator->errors(), 401);       
        }

        if($userIdActualite !== $userId){
            $commentaire = Commentaire::create([
                "user_id" => $userId,
                "actualite_id" => $id,
                "pseudo" => $pseudo,
                "commentaire" => $request->input("commentaire")
            ]);
            return response()->json(["message" => "commentaire cree"], 201);
        }else{
            return response()->json(["message" => "vous ne pouvez pas mettre de commentaire sur votre actualite"], 401);
        }
    }

    public function index($id)
    {
        return DB::select("SELECT * FROM `commentaires` WHERE `actualite_id` = '$id' ");
    }

}
