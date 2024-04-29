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
            color: #1B67B0;
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
        color: #1B67B0;
        text-align: center;
        width: 600px;
        margin: 1rem auto;
    }

        .signature {
            font-style: italic;
            text-align: right;
            color: #1B67B0;
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
            <h2>Demande de Devis pour {{$service_devis}}</h2>
            <p>Cher Touil Digicom,</p>
            <p>J'espère que cet e-mail vous trouvera bien. Je m'appelle <strong >{{ $prenom_devis }}, {{ $nom_devis }}</strong> et je vous écris pour demander un devis pour le service : <strong> {{$service_devis}}</strong></p>
            <p>Voici mes coordonnées :</p>
   
            <div class="contact-details">
                <table>
                    <tr>
                        <td><strong>Nom :</strong></td>
                        <td> {{ $nom_devis }}</td>
                    </tr>
                    <tr>
                        <td><strong>Prenom :</strong></td>
                        <td>{{ $prenom_devis }}</td>
                    </tr>
                    <tr>
                        <td><strong>E-mail :</strong></td>
                        <td>{{ $email_devis }}</td>
                    </tr>
                    <tr>
                        <td><strong>Téléphone:</strong></td>
                        <td>{{ $telephone_devis }}</td>
                    </tr>
                    <tr>
                        <td><strong>Adress:</strong></td>
                        <td>{{ $adress_devis }}</td>
                    </tr>
                    <tr>
                        <td><strong>Service:</strong></td>
                        <td>{{ $service_devis }}</td>
                    </tr>
                </table>
            </div>
            <p> Pourriez-vous s'il vous plaît me fournir un devis détaillé pour ce service ? J'aimerais avoir des informations sur les tarifs, les délais de réalisation et toute autre condition pertinente. <br> 
        <p>
            Je reste à votre disposition pour toute information supplémentaire que vous pourriez nécessiter.
        </p>
        <p>
            Merci beaucoup pour votre attention à ma demande. J'attends avec impatience votre réponse.
        </p>
            </p>
            <p>Cordialement,</p>
            <p class="signature">{{ $nom_devis }} {{$prenom_devis}}</p>
        </div>
    </div>
</body>

</html>
