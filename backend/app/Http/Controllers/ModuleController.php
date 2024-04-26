<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function create(){

        $module = new Module();
        $module->titre_fr = "Leadership et renforcement de l'esprit d'équipe";
        $module->titre_ar = 'عنوان بالعربية';
        $module->duree = 4; 
        $module->formateur_id = 6; 
        $module->formation_id = 2; 
        $module->prix = 20.00; 
        $module->save(); 



return response('ajouter avec success');
    }

  
}
