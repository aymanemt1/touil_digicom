<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Formateur extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'nom',
        'prenom',
        'specialite',
        'email',
        'profile',
    ];

   public function module()
    {
        return $this->belongsTo(Module::class);
    }
}