<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationModule extends Model
{
    protected $fillable = ['reservation_id', 'module_id'];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class,'reservation_id');
    }
   
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
