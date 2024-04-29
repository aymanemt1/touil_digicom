<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactFormController extends Controller
{
    public function sendEmail(Request $request)
    {
    
        Mail::to('Touildigicom@gmail.com')->send(new ContactFormMail($request));
        
        return response()->json(['message' => 'Email sent successfully']);
    }
    
}
