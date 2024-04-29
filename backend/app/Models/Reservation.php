<?php

namespace App\Models;

use App\Models\Client;
use App\Models\Module;
use App\Models\Formation;
use App\Models\ReservationModule;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{

    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'client_id',
        'formation_id',
        'date_validation',
        'timeValidation',
        'prix',
        'validate',
    ];


    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }


    public function reservationModules()
    {
        return $this->hasMany(ReservationModule::class, 'id_reservation');
    }

    public function modules()
    {
        return $this->belongsToMany(Module::class, 'reservation_modules', 'reservation_id', 'module_id');
    }

}