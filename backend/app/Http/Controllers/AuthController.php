<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class AuthController extends Controller
{
   
    public function signup(Request $request){
        $fullname = $request->input('fullname');
        $email = $request->input('email');
        $password = $request->input('password');

        $admin = new Admin();
        $admin->fullname = $fullname;
        $admin->email = $email;
        $admin->password = bcrypt($password);
        $admin->save();

        $token = Str::random(60);
        $admin->api_token = hash('sha256', $token);
        $admin->save();

        return response()->json(['message' => 'User registered successfully', 'admin' => $admin, 'token' => $token], 201);

    }

    public function signin(Request $request){
     
        $credentials = ['email' => $request->email, 'password' => $request->password];

         $admindata = Admin::where('email',$request->email)->get();
        if (!Auth::attempt($credentials)) {
                        return response()->json([
                                'status' => 404,
                                'message' => 'Email or password incorrect',
                            ], 404);
                        } else {

                          $admin = Admin::where('email', $request->email)->first();
                                $token = Str::random(60);
        
                                $admin->api_token = hash('sha256', $token);
        
                                if ($admin) {
                        return response()->json([
                            'status' => 200,
                            'valid' => true,
                            'admin' =>  $admin,
                            'token' => $token
                        ], 200);
                    } else {
                            return response()->json([
                                    'status' => 500,
                                    'message' => 'Failed to save token',
                                ], 500);
                            }
                        }
            }


            public function logout(Request $request)
            {
                if ($request->user()) {
                    $request->user()->tokens()->delete();
                }
                return response()->json([], 204);
            }


}
