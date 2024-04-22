<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DevisFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public $DevisData;
    
    public function __construct($DevisData)
    {
        $this->DevisData = $DevisData;
    }

  
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Devis Form Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'Devis_Form',
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
        return $this->subject('Devis Form Submission')
                    ->view('Devis_Form')
                    ->with([
                        'nom_devis' => $this->DevisData['nom_devis'],
                        'prenom_devis' => $this->DevisData['prenom_devis'],
                        'email_devis' => $this->DevisData['email_devis'],
                        'adress_devis' => $this->DevisData['adress_devis'],
                        'telephone_devis' => $this->DevisData['telephone_devis'],
                        'service_devis' => $this->DevisData['service_devis']
                    ]);
    }
}
