<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'nom',
        'prenom',
        'date_naissance',
        'ville',
        'email',
        'numero_telephone',
        'numero_whatsapp',
        'niveau_etude',
        'experiences_formatives',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
    
}