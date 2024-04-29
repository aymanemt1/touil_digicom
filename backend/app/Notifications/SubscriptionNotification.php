<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\Notification;


class SubscriptionNotification extends Notification
{

    use Queueable;
    use Notifiable;
    protected $customData;

    public function __construct($customData)
    {
        $this->customData = $customData;
    }


    public function via($notifiable)
    {
        return ['mail']; // You can add other channels here such as 'database' or 'sms'
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Subscription Notification')
            ->line('This is to inform you about a new subscription.')
            ->line('Email: ' . $this->customData);
    }

}
