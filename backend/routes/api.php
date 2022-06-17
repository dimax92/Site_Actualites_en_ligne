<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthentificationController;
use App\Http\Controllers\ActualitesController;
use App\Http\Controllers\CommentairesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthentificationController::class, 'register']);
Route::post('/login', [AuthentificationController::class, 'login']);
Route::get("/actualites", [ActualitesController::class, "index"]);
Route::get("/actualites/{id}", [ActualitesController::class, "show"]);
Route::post("/search/{search}", [ActualitesController::class, "search"]);
Route::get("/recuperationcommentaire/{id}", [CommentairesController::class, "index"]);

//Protecting Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', [AuthentificationController::class, 'profile']);
    Route::post('/logout', [AuthentificationController::class, 'logout']);
    Route::post('/updateprofil/{id}', [AuthentificationController::class, 'update']);
    Route::post('/suppressionprofil/{id}', [AuthentificationController::class, 'destroy']);
    Route::post("/creationactualite/{id}", [ActualitesController::class, "store"]);
    Route::post("/destroy/{id}", [ActualitesController::class, "destroy"]);
    Route::post("/creationcommentaire/{id}", [CommentairesController::class, "store"]);
    Route::post("/update/{id}", [ActualitesController::class, "update"]);
    Route::get("/mesactualites/{id}", [ActualitesController::class, "mesActualites"]);
});