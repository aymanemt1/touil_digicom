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
    font-family: "Raleway", "Noto Kufi Arabic", sans-serif;

    margin: -3rem ;
    padding: 2rem 3rem;
    display: flex;
    color: white;
    text-align: center;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.ticketInfoParent {
    display: flex;
    width: 65%;
    margin-top: 6rem;
    margin-left: 4rem;
    justify-content: space-between;
    border-bottom: 2px solid #ccc;
}

.ticket-info {
    width: 40%;
}


.reservationInfo {
    font-size: 15px;
}


b{
    color: #1B67B0;
}

h4{
    color: #1B67B0;
    font-size: 23px;
    font-weight: 600;
}


h1{
    text-align: center;
    font-size: 39px;

}
table{
    margin-top: 7rem;
}
.line{
    border-bottom: 2px solid #ddd;
    width: 200%;
}
    </style>
</head>
<body>
    <div class="entite">
        <h1>Touil Digicom</h1>
    </div>
    <table border="0" width="100%">
        <tr>
            <h4 >Reservation Information</h4>
        </tr>
        <tr>
            <td>
            <p class="reservationLeft"><strong>Reservation ID:</strong> {{$reservationId}}</p>  
            </td>
            <td>
            <p class="test-prix"><strong>Prix Total:</strong> <b>{{$clientsWithPrices}} DH </b></p>  

            </td>
        </tr>
        <tr>
            <td>
            <p class="formation-test"><strong>Formation ID:</strong> {{$formationId}}</p>

            </td>
            <td>
            <p class="test-titre"><strong>{{$formationTitre}}</strong></p>

            </td>
        </tr>
        <tr>
            <td>
        <p class="formation-id"><strong>Validation Date:</strong> {{$date_validation}}</p>

            </td>
            <td>
            <p class="formation-id"><strong>Validation Time :</strong>{{$time_validation}}</p>

            </td>
        </tr>
        <tr >
            <p class="line"></p>

        </tr>
        <tr>
            <h4 >Client Information</h4>
        </tr>
        <tr>
            <p> <b>Client ID:</b> {{$clientId}} </p>  
        </tr>
        <tr>
            <td>
    <p class="reservation-prix"><b>Nom :</b>{{$nom}} </p>  

            </td>
            <td>
                <p class="reservation-prix" style="margin-left:4rem;"><b>Prenom:</b>  {{$prenom}}</p>  

            </td>
          
        </tr>
        <tr>
            <td>
                <p class="reservation-prix"><b>Email:</b>{{$email}} </p>  

            </td>
            <td>
                <p class="reservation-prix" style="margin-left:4rem;"><b>Phone number:</b>  {{$telephone}}</p> 
            </td>
        </tr>
        <tr>
            <td>
                
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
            </td>
        </tr>
    </table>
</body>
</html>

