<?php

namespace App\Models;

use App\Models\Reservation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Module extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'titre_fr',
        'titre_ar',
        'duree',
        'formateur_id',
        'formation_id',
        'prix',
    ];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function formateur()
    {
        return $this->belongsTo(Formateur::class);
    }

    public function reservations()
    {
        return $this->belongsToMany(Reservation::class, 'reservation_modules');
    }
}