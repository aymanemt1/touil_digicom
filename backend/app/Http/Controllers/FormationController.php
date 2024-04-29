<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use App\Models\Formation;
use App\Models\Module;
use App\Models\Reservation;
use App\Models\ReservationModule;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\Return_;

class FormationController extends Controller
{
    public function create(){

        $formation = new Formation();
$formation->titre_fr = 'Formation des compétences pédagogiques créatives';
$formation->titre_ar = 'عنوان بالعربية4';
$formation->description_fr = "La Formation des compétences pédagogiques créatives vise à enrichir les enseignants avec des méthodes innovantes pour stimuler l'apprentissage";
$formation->description_ar = 'وصف بالعربية2';
$formation->date_debut = '2024-05-04 09:00'; 
$formation->date_fin = '2024-05-05 17:00'; 
$formation->capacite = 20; 
$formation->cover = 'cover_image.jpg'; 
$formation->affiche = 'affiche_image.jpg'; 
$formation->ville = 'tanger'; 
$formation->location = 'Ntic'; 
$formation->save(); 

return response('ajouter avec success');
    }

    
 public function getallformations()
{
    $formations = Formation::all();

    return response()->json([
        'formations' => $formations,
        
    ]);

}


public function index()
{
    $formationCount = Formation::count(); 
    $formations = Formation::with('modules.formateur')->inRandomOrder()->paginate($formationCount);
    
    return response()->json([
        'formations' => $formations,
        'formationCount' => $formationCount
    ]);
}


public function GetformationDate($formationId)
{
    $formation = Formation::find($formationId);

    if (!$formation) {
        return response()->json([]);
    }

    $dates = [];
    $tomorrow = Carbon::tomorrow();
    $startDate = Carbon::parse($formation->date_debut);
    $endDate = Carbon::parse($formation->date_fin);

    if ($endDate->gte($tomorrow)) {
        for ($date = $tomorrow->copy(); $date->lt($endDate); $date->addDay()) {
            $dates[] = $date->toDateString();
        }
    }
    $formationData = [
        'id' => $formation->id,
        'titre_fr' => $formation->titre_fr,
        'dates' => $dates,
    ];
    return response()->json($formationData);
}

}
