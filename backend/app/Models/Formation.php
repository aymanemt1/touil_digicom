<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 

class Formation extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'titre_fr',
        'titre_ar',
        'description_fr',
        'description_ar',
        'cover',
        'affiche',
        'ville',
        'capacite',
        'location',
        'date_debut',
        'date_fin',
    ];

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}