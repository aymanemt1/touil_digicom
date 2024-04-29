<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use Illuminate\Http\Request;

class FormateurController extends Controller
{
    public function create(){

        $formateur = new Formateur();
        $formateur->nom = "Hassan ";
        $formateur->prenom = "TOUIL";
        $formateur->specialite = 'Docteur';
        $formateur->email = "exemple7@gmail.com";
        $formateur->profile = 'profile.png';
        $formateur->save();

return response('ajouter avec success');
    }
}
