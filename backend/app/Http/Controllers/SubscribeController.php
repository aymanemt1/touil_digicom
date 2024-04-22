<?php

namespace App\Http\Controllers;

use App\Jobs\SendSubscriptionNotification;
use App\Mail\SubscriptionNotification;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SubscribeController extends Controller
{
    public function subscribe(Request $request)
    {
        $data = $request->validate([
            'Email' => 'required|email|unique:subscriptions,email',
        ]);

        $subscription = Subscription::create($data); 
        
       
        return response()->json(['message' => 'Subscription successful'], 201);
    }


    public function sendNotification()
    {
        $subscriptions = Subscription::all();
    
        foreach ($subscriptions as $subscription) {
            $Email = $subscription->Email;
        
            Mail::to($Email)->send(new SubscriptionNotification($Email));
        }
        return response()->json(['message' => 'Notification sent to all subscribers.']);
    }

    }
