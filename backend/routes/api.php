<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactFormController;
use App\Http\Controllers\DevisFormController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\ticketController;
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

Route::get('/getallformations', [FormationController::class, 'getallformations']);

Route::get('/formations', [FormationController::class, 'index']);

Route::post('/reservation', [ReservationController::class, 'reservation']);

Route::get('/GetformationDate/{id}', [FormationController::class, 'GetformationDate']);
Route::post('/sendmailvalidation', [ClientController::class, 'sendmailvalidation']);


Route::post('/ticket', [ticketController::class, 'ticket']);


Route::post('/sendmail-reservaion', [ReservationController::class, 'sendEmailreservation']);



Route::controller(AdminController::class)->group(function () {

    // Login route
    Route::post('/login', 'login');

    // Logout route
    Route::post('/logout', 'logout');


        // Formations routes
        Route::get('/formations', 'fetchFormations');
        Route::get('/formations/{id}', 'fetchFormationsById');
        Route::put('/formations/{id}', 'updateFormation');
        Route::post('/formations', 'storeFormation');
        Route::delete('/formations/{id}', 'deleteFormation');
        Route::get('/trashed-formations', 'fetchTrashedFormations');
        Route::put('/formations/{id}/restore', 'restoreTrashedFormation');
        Route::delete('/trashed-formations/{id}', 'forceDeleteTrashedFormation');
        Route::get('/formations/image/{imagecover}{imageaffiche}', 'getformationimages');


        // Formateurs routes
        Route::get('/formateurs', 'fetchFormateurs');
        Route::get('/formateurs/{id}', 'fetchFormateurById');
        Route::put('/formateurs/{id}', 'updateFormateur');
        Route::post('/formateurs', 'storeFormateur');
        Route::delete('/formateurs/{id}', 'deleteFormateur');
        Route::get('/trashed-formateurs', 'fetchTrashedFormateurs');
        Route::put('/formateurs/{id}/restore', 'restoreTrashedFormateur');
        Route::delete('/trashed-formateurs/{id}', 'forceDeleteTrashedFormateur');
        Route::get('/formateurs/image/{imageName}', 'getFormateurImage');

        // Modules routes
        Route::get('/modules', 'fetchModules');
        Route::get('/modules/{id}', 'fetchModuleById');
        Route::put('/modules/{id}', 'updateModule');
        Route::post('/modules', 'storeModule');
        Route::delete('/modules/{id}', 'deleteModule');
        Route::get('/trashed-modules', 'fetchTrashedModules');
        Route::put('/modules/{id}/restore', 'restoreTrashedModule');
        Route::delete('/trashed-modules/{id}', 'forceDeleteTrashedModule');

        // Reservations routes
        Route::get('/reservations', 'fetchReservations');
        Route::get('/reservations/{id}', 'fetchReservationById');
        Route::put('/reservations/{id}', 'updateReservation');
        Route::post('/reservations', 'storeReservation');
        Route::delete('/reservations/{id}', 'deleteReservation');
        Route::get('/trashed-reservations', 'fetchTrashedReservations');
        Route::put('/reservations/{id}/restore', 'restoreTrashedReservation');
        Route::delete('/trashed-reservations/{id}', 'forceDeleteTrashedReservation');
        Route::get('/check-reservation', 'checkReservation');

        // Clients routes
        Route::get('/clients', 'fetchClients');
        Route::get('/clients/{id}', 'fetchClientById');
        Route::put('/clients/{id}', 'updateClient');
        Route::post('/clients', 'storeClient');
        Route::delete('/clients/{id}', 'deleteClient');
        Route::get('/trashed-clients', 'fetchTrashedClients');
        Route::put('/clients/{id}/restore', 'restoreTrashedClient');
        Route::delete('/trashed-clients/{id}', 'forceDeleteTrashedClient');

        // static route
        Route::get('statistics', 'getCounts');

        // static subscriptions
        Route::get('subscriptions', 'fetchSubscriptions');
        Route::delete('/subscriptions/{id}', 'deleteSubscription');

        Route::get('/dashboard', 'showDashboard');

});




