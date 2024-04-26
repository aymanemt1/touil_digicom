<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\ticketController;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/ajouterFormation', [FormationController::class, 'create']);

Route::get('/ajouterFormateur', [FormateurController::class, 'create']);

Route::get('/ajouterModule', [ModuleController::class, 'create']);




