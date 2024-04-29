<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: "Raleway", sans-serif;

            line-height: 1.6;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: rgb(250, 251, 252);

        }

        .message {

            border: 1px solid #ccc;
            padding: 10px;
             background-color: white;
            margin-bottom: 20px;
        }
        strong{
            color: #E8451E;
        }

        .contact-details table {
    width: 100%;
    border: 1px solid #1B67B0; 
    border-collapse: collapse; 
}

.contact-details th,
.contact-details td {
    border: 1px solid #1B67B0; 
    padding: 8px;
    text-align: left; 
}

h2{
        color: #E8451E;
        text-align: center;
        width: 600px;
        margin: 1rem auto;
    }
    .prixinfo{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 70%;

    }

        .signature {
            font-style: italic;
            text-align: right;
            color: #E8451E;
            font-weight: bold;

        }
        @media only screen and (max-width: 600px) {
    .container {
        width: 100% !important;
    }

    .message {
        padding: 10px !important;
    }

    .contact-details table {
        width: 100% !important;
    }
   
}

    </style>
</head>
<body>
    <div class="container">
        <div class="message">
            <h2>Reservation de formation</h2>
            <strong><p style="text-align: center;color:black;">{{$formationName}}</p></strong>
            <div class="contact-details">
                <div class="prixinfo">
                    
                    <h3>Formation Info :</h3>
                    <p style="margin-left: 9rem;"><strong>Prix Total: {{$clientsWithPrices}} DH </strong></p>
                </div>
                <table>
                    <tr>
                        <td><strong>FormationID :</strong></td>
                        <td> {{ $formationId }}</td>
                    </tr>
                   @if(count($valuesModel) > 0)
                   <tr>
                    <td><strong>Modules:</strong></td>
                    <td>
                        @foreach($modulesNames as $moduleName)
                            {{ $moduleName }}
                            @if(!$loop->last)
                                ||
                            @endif
                        @endforeach
                    </td>
                </tr>
                   @endif
                   
                    <tr>
                        <td><strong>date_validation:</strong></td>
                        <td>{{ $date_validation }}</td>
                    </tr>
                    <tr>
                        <td><strong>Time validation:</strong></td>
                        <td>{{ $time_validation }}</td>
                    </tr>
                </table>
            </div>
            <div class="contact-details">
                <h3>Client Info :</h3>
                <table>
                    <tr>
                        <td><strong>Nom :</strong></td>
                        <td> {{ $nom }}</td>
                    </tr>
                    <tr>
                        <td><strong>Prenom :</strong></td>
                        <td>{{ $prenom }}</td>
                    </tr>
                    <tr>
                        <td><strong>E-mail :</strong></td>
                        <td>{{ $email }}</td>
                    </tr>
                    <tr>
                        <td><strong>telephone:</strong></td>
                        <td>{{ $telephone }}</td>
                    </tr>
                    <tr>
                        <td><strong>Ville:</strong></td>
                        <td>{{ $ville }}</td>
                    </tr>
                    @if(isset($niveau_etude))
                    <tr>
                        <td><strong>Niveau etude:</strong></td>
                        <td>{{ $niveau_etude }}</td>
                    </tr>
                    @endif
                    @if(isset($experiences_formatives))
                    <tr>

                        <td><strong>Experiences Formatives:</strong></td>
                        <td>{{ $experiences_formatives }}</td>
                    </tr>
                    @endif
                </table>
            </div>

        </div>
    </div>
</body>
</html>
