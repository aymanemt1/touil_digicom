<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Formation;
use App\Models\Module;
use App\Models\Reservation;
use Barryvdh\DomPDF\Facade\Pdf;
use Dompdf\Dompdf;
use Illuminate\Http\Request;

class ticketController extends Controller
{
  
    public function ticket(Request $request)
    {
        $nom = $request->input('nom');
        $prenom = $request->input('prenom');
        $email = $request->input('email');
        $telephone = $request->input('telephone');
        $date_validation = $request->input('date_validation');
        $time_validation = $request->input('time_validation');
        $valuesModel = $request->input('valuesModel');
        $formationId = $request->input('formationId');
    
        // Assuming you have a Client model with an email field
        $client = Client::where('email', $email)->first();
        $clientId = $client->id;
    
        // Assuming you have a Reservation model with client_id and formation_id fields
        $reservation = Reservation::where('client_id', $clientId)
                                    ->where('formation_id', $formationId)
                                    ->first();
        $reservationId = $reservation->id;
    
        // Assuming you have a Formation model with an id field
        $formation = Formation::find($formationId);
        $formationTitre = $formation->titre_fr;
    

            // Find the formation by ID
            $formation = Formation::find($formationId);
       
        
            $modulesNames = [];
        
            foreach ($valuesModel as $moduleId) {
                $module = Module::find($moduleId);
        
                $moduleName = $module ? $module->titre_fr : null;
        
                if ($moduleName) {
                    $modulesNames[] = $moduleName;
                }
            }

            $reservations = Reservation::where('formation_id', $formationId)->get();

            foreach ($reservations as $reservation) {
              $clientsWithPrices = $reservation->prix;
            }

        $data = [
        'nom' => $nom,
        'prenom' => $prenom,
        'email' => $email,
        'telephone' => $telephone,
        'date_validation' => $date_validation,
        'time_validation' => $time_validation,
        'formationTitre' => $formationTitre,
        'clientId' => $clientId,
        'formationId' => $formationId,
        'modulesNames' => $modulesNames,
        'reservationId' => $reservationId,
        'clientsWithPrices' => $clientsWithPrices,
    ];
        // Load the view template with ticket data
        $pdf = PDF::loadView('ticket', $data);
    
        // Return the PDF as a downloadable response
        return $pdf->download('ticket.pdf');
    }
    
  
}
