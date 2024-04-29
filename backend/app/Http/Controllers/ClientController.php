<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ClientController extends Controller
{

    public function sendmailvalidation(Request $request) {
        $email = $request->email;
        $formationId = $request->formationId;

        $client = Client::where('email', $email)->first(); 
        if (!$client) {
            return response()->json(['message' => 'Client introuvable']); 
        } else {
            $reservation = Reservation::where('client_id', $client->id)
                                        ->where('formation_id', $formationId)
                                        ->first();
            if ($reservation) {
                return response()->json(['message' => 'Le client a déjà réservé cette formation']);
            } else {
                return response()->json(["message" => "Le client n'a pas réservé cette formation"]);
            }
        }
    }
    
}
