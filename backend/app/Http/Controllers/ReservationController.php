<?php

namespace App\Http\Controllers;

use App\Mail\ReservationMail;
use App\Models\Client;
use App\Models\Formation;
use App\Models\Module;
use App\Models\Reservation;
use App\Models\ReservationModule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller

{
    public function reservation(Request $request)
    {
        $nom = $request->input('nom');
        $prenom = $request->input('prenom');
        $email = $request->input('email');
        $telephone = $request->input('telephone');
        $ville = $request->input('ville');
        $date_naissance = $request->input('date_naissance');
        $numero_whatsapp = $request->input('numero_whatsapp');
        $niveau_etude = $request->input('niveau_etude');
        $experiences_formatives = $request->input('experiences_formatives');
        $date_validation = $request->input('date_validation');
        $time_validation = $request->input('time_validation');

        // Check if the email has already made a reservation for the formation
        $formationId = $request->input('formationId');

        $existingReservation = Reservation::where('formation_id', $formationId)
            ->whereHas('client', function ($query) use ($email) {
                $query->where('email', $email);
            })
            ->exists();

        if ($existingReservation) {
            return response()->json(['error' => 'This email has already made a reservation for this formation.'], 400);
        }
        $existingClient = Client::where('email', $email)->first();
    
        if ($existingClient) {
            // Client already exists, use the existing client
            $client = $existingClient;
        } else {
            // Create a new client
        $client = new Client();
        $client->nom = $nom;
        $client->prenom = $prenom;
        $client->date_naissance = $date_naissance;
        $client->ville = $ville;
        $client->email = $email;
        $client->numero_telephone = $telephone;
        $client->numero_whatsapp = $numero_whatsapp;
        $client->niveau_etude = $niveau_etude;
        $client->experiences_formatives = $experiences_formatives;
        $client->save();
    }

        // Create a new reservation
        $formation = Formation::find($formationId);

        if ($formation) {
            $modules = $formation->modules;
            $valuesModel = $request->input('valuesModel');
            $valuesModelCount = count($valuesModel);
            $countModules = $formation->modules->count();
            $totalPrice = 0;
            
            if (count($valuesModel) === 0) {
                $modulePrices = $formation->modules->pluck('prix');
                $totalPrice = $modulePrices->sum();
            } else {
                foreach ($formation->modules as $module) {
                    if (in_array($module->id, $valuesModel)) {
                        $totalPrice += $module->prix;
                    }
                }
            }

            $reservation = new Reservation();
            $reservation->client_id = $client->id;
            $reservation->formation_id = $formationId;
            $reservation->date_validation = $date_validation;
            $reservation->time_validation = $time_validation;
            $reservation->prix = $totalPrice;
            $reservation->validate = 0;
            $reservation->save();

            // Create reservation modules for selected modules
            foreach ($modules as $module) {
                if (in_array($module->id, $valuesModel)) {
                    $reservationModule = new ReservationModule();
                    $reservationModule->reservation_id = $reservation->id;
                    $reservationModule->module_id = $module->id;
                    $reservationModule->save();
                }
            }
        }

        return response()->json(['message' => 'Client, reservation, and reservation modules added successfully'], 200);
    }
    public function sendEmailreservation(Request $request){

        $formationId = $request->formationId;
        $moduleIds = $request->valuesModel;
        
        // Find the formation by ID
        $formation = Formation::find($formationId);
       
        $reservations = Reservation::where('formation_id', $formationId)->get();

foreach ($reservations as $reservation) {
  $clientsWithPrices = $reservation->prix;
}

        $formationName = $formation ? $formation->titre_fr : null;
    
        $modulesNames = [];
    
        foreach ($moduleIds as $moduleId) {
            $module = Module::find($moduleId);
    
            $moduleName = $module ? $module->titre_fr : null;
    
            if ($moduleName) {
                $modulesNames[] = $moduleName;
            }
        }
    
        Mail::to('moutouteayman10@gmail.com')->send(new ReservationMail($request, $formationName, $modulesNames,$clientsWithPrices));
        
        return response()->json(['message' => 'Email sent successfully']);
}
}


