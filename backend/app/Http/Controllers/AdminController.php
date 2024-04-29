<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\Client;
use App\Models\Module;
use App\Models\Formateur;
use App\Models\Formation;
use App\Models\Reservation;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class AdminController extends Controller
{

    // Functions Formations
    public function fetchFormations() {
        $formations = Formation::all();
        return response()->json($formations);
    }
    public function fetchFormationsById(Request $request) {

        $formation = Formation::find($request->id);
        return response()->json($formation);
    }
    public function updateFormation(Request $request, $id) {
        $formation = Formation::find($id);
        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }
        $formation->update($request->all());
        return response()->json(['message' => 'Formation mise à jour avec succès']);
    }


    public function storeFormation(Request $request) {
        $requestData = $request->all();

        $requestData['capacite'] = (int) $requestData['capacite'];
        if ($request->hasFile('cover')) {
            $profileImage = $request->file('cover');
            $imageName = date('His') . '.' . $profileImage->getClientOriginalExtension();

            $profileImage->move(public_path('storage/formations/cover'), $imageName);

            $requestData['cover'] = $imageName;
        }

        if ($request->hasFile('affiche')) {
            $profileImage = $request->file('affiche');
            $imageName = date('His') . '.' . $profileImage->getClientOriginalExtension();

            $profileImage->move(public_path('storage/formations/affiche'), $imageName);

            $requestData['affiche'] = $imageName;
        }

        $formation = Formation::create($requestData);

        return response()->json(['message' => 'Formation créée avec succès'], 201);
    }

    public function getformationimages($imagecover,$imageaffiche)
    {
        $imagePath = public_path('formations/cover' . $imagecover);
        $imagePath2 = public_path('formations/affiche' . $imageaffiche);

        if (file_exists($imagePath)) {
            return response()->file($imagePath);
        }else {
            return response()->json(['message' => 'file not existe']);
        }

        if (file_exists($imagePath2)) {
            return response()->file($imagePath2);
        }else {
            return response()->json(['message' => 'file not existe']);
        }
    }

    



    public function deleteFormation($id)
{
    $formation = Formation::find($id);

    if (!$formation) {
        return response()->json(['message' => 'Formation not found'], 404);
    }

    $formation->modules()->delete();
    $formation->delete();

    return response()->json(['message' => 'Formation and associated modules deleted successfully'], 200);
}

    public function fetchTrashedFormations()
    {
        $trashedFormations = Formation::onlyTrashed()->get();
        return response()->json($trashedFormations, 200);
    }
    public function restoreTrashedFormation($id)
    {
        $formation = Formation::onlyTrashed()->find($id);
        if (!$formation) {
            return response()->json(['message' => 'Trashed formation not found'], 404);
        }
        $formation->restore();
        return response()->json(['message' => 'Formation restaurée avec succès'], 200);
    }
    public function forceDeleteTrashedFormation($id)
    {
        $formation = Formation::onlyTrashed()->find($id);
        if (!$formation) {
            return response()->json(['message' => 'Trashed formation not found'], 404);
        }
        $formation->forceDelete();
        return response()->json(['message' => 'Formation supprimée définitivement avec succès'], 200);
    }




    // Functions Formateur
    public function fetchFormateurs() {
        $formateurs = Formateur::all();
        return response()->json($formateurs);
    }




    public function fetchFormateurById(Request $request) {
        $formateur = Formateur::find($request->id);
        return response()->json($formateur);
    }

    public function updateFormateur(Request $request, $id) {
        $formateur = Formateur::find($id);
        if ($formateur) {
            
        $formateur->nom = $request->input('nom');
        $formateur->prenom = $request->input('prenom');
        $formateur->email = $request->input('email');
        $formateur->specialite = $request->input('specialite');
        
        if ($request->hasFile('profile')) {
            $profileImage = $request->file('profile');
            $imageName = date('His') . '.' . $profileImage->getClientOriginalExtension();
            
            $profileImage->move(public_path('/storage/news'), $imageName);
            
            $formateur['profile'] = $imageName;

        }
      
        $formateur->update($request->all());

    }else{
        return response()->json(['message' => 'Formateur not found'], 404);

    }
    
        return response()->json(['message' => 'Formateur mise à jour avec succès']);
    }
    

    
    public function storeFormateur(Request $request)
    {
        $requestData = $request->all();

        if ($request->hasFile('profile')) {
            $profileImage = $request->file('profile');
            $imageName = date('His') . '.' . $profileImage->getClientOriginalExtension();

            $profileImage->move(public_path('storage/formateurs'), $imageName);

            $requestData['profile'] = $imageName;
        }

        Formateur::create($requestData);

        return response()->json(['message' => 'Formateur créé avec succès'], 201);
    }


    public function getFormateurImage($imageName)
    {
        $imagePath = public_path('formateurs/' . $imageName);

        if (file_exists($imagePath)) {
            return response()->file($imagePath);
        }else {
            return response()->json(['message' => 'file not existe']);
        }
    }


public function deleteFormateur($id)
{
    $formateur = Formateur::find($id);

    if (!$formateur) {
        return response()->json(['message' => 'Formateur not found'], 404);
    }

    return response()->json(['message' => 'VOUS NE POUVEZ PAS SUPPRIMER CE FORMATEUR APRÈS AVOIR SUPPRIMÉ LE MODULE'], 200);
}

    public function fetchTrashedFormateurs() {
        $trashedFormateurs = Formateur::onlyTrashed()->get();
        return response()->json($trashedFormateurs, 200);
    }

    public function restoreTrashedFormateur($id) {
        $formateur = Formateur::onlyTrashed()->find($id);
        if (!$formateur) {
            return response()->json(['message' => 'Trashed formateur not found'], 404);
        }
        $formateur->restore();
        return response()->json(['message' => 'Formateur restauré avec succès'], 200);
    }

    public function forceDeleteTrashedFormateur($id) {
        $formateur = Formateur::onlyTrashed()->find($id);
        if (!$formateur) {
            return response()->json(['message' => 'Trashed formateur not found'], 404);
        }
        $formateur->forceDelete();
        return response()->json(['message' => 'Formateur supprimé définitivement avec succès'], 200);
    }



    // Functions Modules
    public function fetchModules() {
        $modules = Module::with('formation', 'formateur')->get();
        return response()->json($modules);
    }

    public function fetchModuleById(Request $request) {
        $module = Module::find($request->id);
        return response()->json($module);
    }

    public function updateModule(Request $request, $id) {
        $module = Module::find($id);
        if (!$module) {
            return response()->json(['message' => 'Module not found'], 404);
        }
        $module->update($request->all());
        return response()->json(['message' => 'Module mise à jour avec succès']);
    }

    public function storeModule(Request $request) {
        $module = Module::create($request->all());
        return response()->json(['message' => 'Module créé avec succès'], 201);
    }

    public function deleteModule($id)
    {
        $module = Module::find($id);

        if (!$module) {
            return response()->json(['message' => 'Module not found'], 404);
        }
        $formateur = $module->formateur;
        $module->delete();
    
        $formateur->delete();
    
        return response()->json(['message' => 'Module and associated formateur deleted successfully'], 200);
    }

    public function fetchTrashedModules()
    {
        $trashedModules = Module::onlyTrashed()->with('formateur', 'formation')->get();
        return response()->json($trashedModules, 200);
    }

    public function restoreTrashedModule($id)
    {
        $module = Module::onlyTrashed()->find($id);
        if (!$module) {
            return response()->json(['message' => 'Trashed module not found'], 404);
        }
        $module->restore();
        return response()->json(['message' => 'Module restauré avec succès'], 200);
    }

    public function forceDeleteTrashedModule($id)
    {
        $module = Module::onlyTrashed()->find($id);
        if (!$module) {
            return response()->json(['message' => 'Trashed module not found'], 404);
        }
        $module->forceDelete();
        return response()->json(['message' => 'Module supprimé définitivement avec succès'], 200);
    }




    // Functions Reservations
    public function fetchReservations()
    {
        $reservations = Reservation::with(['formation', 'client', 'modules',])->get();
        return response()->json($reservations);
    }

    public function fetchReservationById(Request $request) {
    $reservation = Reservation::find($request->id);
    return response()->json($reservation);
    }

    public function updateReservation(Request $request, $id) {
    $reservation = Reservation::find($id);
    if (!$reservation) {
        return response()->json(['message' => 'Reservation not found'], 404);
    }
    $reservation->update($request->all());
    return response()->json(['message' => 'Reservation mise à jour avec succès']);
    }

    public function storeReservation(Request $request) {
        $client_id = $request->input('client_id');
        $formation_id = $request->input('formation_id');
        $date_validation = $request->input('date_validation');
        $time_validation = $request->input('time_validation');
        $prix = $request->input('prix');



        $existingReservation = Reservation::where('client_id', $request->input('client_id'))
                                           ->where('formation_id', $request->input('formation_id'))
                                           ->first();
        if ($existingReservation) {
            return response()->json(['message' => 'Client has already reserved this formation'], 400);
        }
        $formation = Formation::find($formation_id);
        $modulePrices = $formation->modules->pluck('prix');
        $totalPrice = $modulePrices->sum();
    
        $existingReservation = new Reservation();
        $existingReservation->client_id = $client_id;
        $existingReservation->formation_id = $formation_id;
        $existingReservation->date_validation = $date_validation;
        $existingReservation->time_validation = $time_validation;
        $existingReservation->prix = $totalPrice;
        $existingReservation->save();

        return response()->json(['message' => 'Reservation créée avec succès'], 201);
    }
    

    public function deleteReservation($id)
    {
        $reservation = Reservation::find($id);
        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }
        $reservation->delete();
        return response()->json(['message' => 'Reservation déplacée vers la corbeille'], 200);
    }

    public function fetchTrashedReservations()
    {
        $trashedReservations = Reservation::onlyTrashed()->get();
        return response()->json($trashedReservations, 200);
    }

    public function restoreTrashedReservation($id)
    {
        $reservation = Reservation::onlyTrashed()->find($id);
        if (!$reservation) {
            return response()->json(['message' => 'Trashed reservation not found'], 404);
        }
        $reservation->restore();
        return response()->json(['message' => 'Reservation restaurée avec succès'], 200);
    }

    public function forceDeleteTrashedReservation($id)
    {
        $reservation = Reservation::onlyTrashed()->find($id);
        if (!$reservation) {
            return response()->json(['message' => 'Trashed reservation not found'], 404);
        }
        $reservation->forceDelete();
        return response()->json(['message' => 'Reservation supprimée définitivement avec succès'], 200);
    }

    public function checkReservation(Request $request) {
        $client_id = $request->input('client_id');
        $formation_id = $request->input('formation_id');
    
        $reservation = Reservation::where('client_id', $client_id)
                                  ->where('formation_id', $formation_id)
                                  ->first();
    
        if ($reservation) {
            if ($reservation->validate == 0) {
                $reservation->update([
                    'validate' => 1
                ]);
    
                $formation = Formation::find($formation_id);
                if ($formation) {
                    $formation->update([
                        'capacite' => $formation->capacite - 1
                    ]);
                }
            } elseif ($reservation->validate == 1) {
                $reservation->update([
                    'validate' => 0
                ]);
    
                $formation = Formation::find($formation_id);
                if ($formation) {
                    $formation->update([
                        'capacite' => $formation->capacite + 1
                    ]);
                }
            }
    
            return response()->json([
                'exists' => true,
                'reservation' => $reservation,
            ]);
        } else {
            return response()->json(['exists' => false]);
        }
    }
    
    

    // Functions Clients
    public function fetchClients()
    {
        $clients = Client::all();
        return response()->json($clients);
    }

    public function fetchClientById(Request $request)
    {
        $client = Client::find($request->id);
        return response()->json($client);
    }

    public function updateClient(Request $request, $id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }
        $client->update($request->all());
        return response()->json(['message' => 'Client mis à jour avec succès']);
    }

    public function storeClient(Request $request)
    {
        $client = Client::create($request->all());
        return response()->json(['message' => 'Client créé avec succès'], 201);
    }

    public function deleteClient($id)
    {
        $client = Client::find($id);
    
        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }
    
        if ($client->reservations()->exists()) {
            return response()->json(['message' => 'Client has reservations and cannot be deleted'], 400);
        }
    
        $client->delete();
        return response()->json(['message' => 'Client déplacé vers la corbeille'], 200);
    }
    
    public function fetchTrashedClients()
    {
        $trashedClients = Client::onlyTrashed()->get();
        return response()->json($trashedClients, 200);
    }

    public function restoreTrashedClient($id)
    {
        $client = Client::onlyTrashed()->find($id);
        if (!$client) {
            return response()->json(['message' => 'Trashed client not found'], 404);
        }
        $client->restore();
        return response()->json(['message' => 'Client restauré avec succès'], 200);
    }

    public function forceDeleteTrashedClient($id)
    {
        $client = Client::onlyTrashed()->find($id);
        if (!$client) {
            return response()->json(['message' => 'Trashed client not found'], 404);
        }
        $client->forceDelete();
        return response()->json(['message' => 'Client définitivement supprimé avec succès'], 200);
    }




    //Function Statics
    public function getCounts()
    {
        $counts = [
            'formationsCount' => Formation::count(),
            'formationsCountTrashed' => Formation::onlyTrashed()->count(),

            'modulesCount' => Module::count(),
            'modulesCountTrashed' => Module::onlyTrashed()->count(),

            'formateursCount' => Formateur::count(),
            'formateursCountTrashed' => Formateur::onlyTrashed()->count(),

            'clientsCount' => Client::count(),
            'clientsCountTrashed' => Client::onlyTrashed()->count(),

            'reservationsCount' => Reservation::count(),
            'reservationsCountTrashed' => Reservation::onlyTrashed()->count(),

            'subscriptionsCount' => Subscription::count(),
        ];

        return response()->json($counts, 200);
    }


    // Function subscriptions
    public function fetchSubscriptions()
    {
        $subscriptions = Subscription::all();
        return response()->json($subscriptions);
    }

    public function deleteSubscription($id)
    {
        $subscription = Subscription::find($id);
        if (!$subscription) {
            return response()->json(['message' => 'Subscription not found'], 404);
        }

        $subscription->delete();

        return response()->json(['message' => 'Subscription deleted successfully'], 200);
    }

}