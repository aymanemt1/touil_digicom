<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $formData;
    public $modulesNames;
    public $formationName;
    public $clientsWithPrices;
    
    public function __construct($formData,$formationName,$modulesNames,$clientsWithPrices)
    {
        $this->formData = $formData;
        $this->formationName = $formationName;
        $this->modulesNames = $modulesNames;
        $this->clientsWithPrices = $clientsWithPrices;
       
    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reservation Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'MailReservation',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    public function build()
    {
        return $this->subject('Contact Form Submission')
                    ->view('MailReservation')
                    ->with([
                        'nom' => $this->formData['nom'],
                        'prenom' => $this->formData['prenom'],
                        'email' => $this->formData['email'],
                        'ville' => $this->formData['ville'],
                        'date_naissance' => $this->formData['date_naissance'],
                        'formationId' => $this->formData['formationId'],
                        'telephone' => $this->formData['telephone'],
                        'numero_whatsapp' => $this->formData['numero_whatsapp'],
                        'date_validation' => $this->formData['date_validation'],
                        'time_validation' => $this->formData['time_validation'],
                        'valuesModel' => $this->formData['valuesModel'],
                        'formationName' => $this->formData['formationName'],
                        'modulesNames' => $this->formData['modulesNames'],
                        'clientsWithPrices' => $this->formData['clientsWithPrices'],
                    ]);
    }
}
    
