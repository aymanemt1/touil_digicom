<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <title>pdf</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
   
    <style>
        body {
    font-family: "Raleway", "Noto Kufi Arabic", sans-serif;
    width: 100%;
    margin: 0;
}

.entite {
    background-color: #1B67B0;
    margin: 0;
    padding: 4rem 3rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.imglogo {
    width: 260px;
    padding-left: 1rem;
}

.qrcode {
    width: 300px;
}

.titleLogo h1 {
    color: white;
    font-size: 34px;
}

.ticketInfoParent {
    display: flex;
    width: 65%;
    margin-top: 2rem;
    margin-left: 4rem;
    justify-content: space-between;
    border-bottom: 2px solid #ccc;
}

.ticket-info {
    width: 40%;
}

.qrCode {
    width: 20%;
}

.qrCode img {
    width: 200px;
}

.reservationInfo {
    font-size: 15px;
}

.reservationInfo h1 {
    color: #1B67B0;
    font-size: 19px;
}

.reservation {
    display: flex;
    justify-content: space-between;
    width: 500px;
    align-items: center;
}

.formation,
.modules,
.validation {
    display: flex;
    justify-content: space-between;
    width: 500px;
    align-items: center;
}

.client {
    display: flex;
    justify-content: space-between;
    width: 550px;
    align-items: center;
}

.reservation-prix b {
    font-weight: 600;
    font-size: 17px;
    color: #1B67B0;
}
.reservationLeft{
    float: left;
}
b{
    color: #1B67B0;
}
.reservationright{
    float: left;
}
.test-prix{
    margin-left: 20rem;
}
.test-titre{
    margin-left: 10rem;
}


    </style>
</head>
<body>
    <div class="container">
      
            <div class="entite">
            <div class="logo">
                <img src="{{ public_path("logo3.png") }}" alt="" style="width: 150px; height: 150px;">
            </div>
               <div class="titleLogo">
               </div>
    </div>
    <div class="ticketInfoParent">

        <div class="ticket-info">
            <div class="reservationInfo">
              <h1 >Reservation Information</h1>
              
<div class="reservation">
    <p class="reservationLeft"><strong>Reservation ID:</strong> {{$reservationId}}</p>  
    <p class="test-prix"><strong>Prix Total:</strong> <b>{{$clientsWithPrices}} DH </b></p>  
</div>
<div class="formation">
    <p class="formation-test"><strong>Formation ID:</strong> {{$formationId}}</p>
    <p class="test-titre"><strong>{{$formationTitre}}</strong></p>
</div>
@if(count($modulesNames) > 0)
<div class="modules">
    <strong>Modules :</strong>
    @foreach($modulesNames as $moduleName)
                            {{ $moduleName }}
                            @if(!$loop->last)
                                ||
                            @endif
                        @endforeach
</div>
@endif
<div class="validation">
    <p class="formation-id"><strong>Validation Date:</strong> {{$date_validation}}</p>
    <p class="formation-id"><strong>Validation Time </strong>{{$time_validation}}</p>
</div>

              <p></p>
            </div>
            
        </div>
        <div class="qrCode">
            {{-- <img src="{{ asset('qr.png') }}" alt="" class="qrcode"> --}}
           </div>
    </div>

    <div class="ticketInfoParent">

        <div class="ticket-info">
            <div class="reservationInfo">
              <h1 >Client Information</h1>
<div class="reservation">
    <p><strong>Client ID:</strong> {{$clientId}} </p>  
</div>
<div class="client">
    <p class="reservation-prix"><b>Nom :</b> <strong>{{$nom}} </strong></p>  
    <p class="reservation-prix"><b>Prenom:</b> <strong> {{$prenom}}</strong></p>  
</div>
<div class="client">
    <p class="reservation-prix"><b>Email:</b> <strong> {{$email}} </strong></p>  
    <p class="reservation-prix"><b>Phone number:</b> <strong> {{$telephone}} </strong></p>  
</div>

              <p></p>
            </div>
            
        </div>
    </div>

    </div>
</body>
</html>
