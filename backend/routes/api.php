<?php

use App\Http\Controllers\ContactFormController;
use App\Http\Controllers\DevisFormController;
use App\Http\Controllers\SubscribeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

use App\Mail\ContactFormMail;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/send-email', [ContactFormController::class, 'sendEmail']);

Route::post('/send-devis', [DevisFormController::class, 'sendDevis']);

Route::post('/subscribe', [SubscribeController::class, 'subscribe']);






