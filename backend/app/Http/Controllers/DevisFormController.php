<?php

namespace App\Http\Controllers;

use App\Mail\DevisFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class DevisFormController extends Controller
{
    public function sendDevis(Request $request)
    {
    
        Mail::to('Touildigicom@gmail.com')->send(new DevisFormMail($request));
        
        return response()->json(['message' => 'E-mail envoyé avec succès']);
    }
}
