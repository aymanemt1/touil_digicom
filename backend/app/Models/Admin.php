<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;



class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory;
    protected $fillable = [
        'fullname', 'email', 'password', 'api_token',
    ];

}