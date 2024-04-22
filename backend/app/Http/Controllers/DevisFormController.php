<?php

namespace App\Http\Controllers;

use App\Mail\DevisFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class DevisFormController extends Controller
{
    public function sendDevis(Request $request)
    {
    
        Mail::to('moutouteayman10@gmail.com')->send(new DevisFormMail($request));
        
        return response()->json(['message' => 'Email sent successfully']);
    }
}
