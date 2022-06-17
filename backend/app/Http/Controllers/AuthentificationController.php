<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use Validator;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;

class AuthentificationController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'pseudo' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ]
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 401);       
        }

        $user = User::create([
            'pseudo' => $request->pseudo,
            'email' => $request->email,
            'password' => Hash::make($request->password)
         ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['data' => $user,'access_token' => $token, 'token_type' => 'Bearer', ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()
                ->json(['message' => 'Email ou mot de passe incorrect'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['message' => 'Connexion reussi','access_token' => $token, 'token_type' => 'Bearer', ]);
    }

    // method for user logout and delete token
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }

    public function update(Request $request, $id)
    {
        $cv = User::firstWhere('id','=',$id);

        if($request->has("pseudo")){
            $validator = Validator::make($request->all(),[
                'pseudo' => 'required|string|max:255|unique:users'
            ]);
    
            if($validator->fails()){
                return response()->json($validator->errors(), 401);       
            }
            $cv->update(
                ["pseudo" => $request->input("pseudo")]
            );
            return response()
            ->json(['message' => "pseudo modifie"]);
        }
        if($request->has("email")){
            $validator = Validator::make($request->all(),[
                'email' => 'required|string|email|max:255|unique:users'
            ]);
    
            if($validator->fails()){
                return response()->json($validator->errors(), 401);       
            }
            $cv->update(
                ["email" => $request->input("email")]
            );
            return response()
            ->json(['message' => "email modifie"]);
        }
        if($request->has("password")){
            $validator = Validator::make($request->all(),[
                'password' => [
                    'required',
                    'string',
                    Password::min(8)
                        ->mixedCase()
                        ->letters()
                        ->numbers()
                        ->symbols()
                        ->uncompromised(),
                ]
            ]);
    
            if($validator->fails()){
                return response()->json($validator->errors(), 401);       
            }
            $cv->update(
                ['password' => Hash::make($request->password)]
            );
            return response()
            ->json(['message' => "mot de passe modifie"]);
        }

        return $cv;
    }

    public function destroy($id)
    {
        DB::table('actualites')->where('user_id', '=', $id)->delete();
        DB::table('commentaires')->where('user_id', '=', $id)->delete();
        User::destroy($id);
    }

    public function profile(Request $request) {
        return auth()->user()->id;
    }
}