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
            <h2>Demande de Renseignements sur vos Services - Formulaire de Contact</h2>
            <p>Cher Touil Digicom,</p>
            <p>J'espère que cet e-mail vous trouvera bien. Je m'appelle <strong >{{ $prenom }}, {{ $nom }}</strong> et je vous contacte pour me renseigner sur vos services.</p>
            <p>Voici mes coordonnées :</p>
            <div class="contact-details">
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
                        <td><strong>Message:</strong></td>
                        <td>{{ $message_contact }}</td>
                    </tr>
                </table>
            </div>
            <p>Merci pour votre temps et votre attention. J'espère avoir de vos nouvelles bientôt.</p>
            <p>Cordialement,</p>
            <p class="signature">{{ $nom }}</p>
        </div>
    </div>
</body>
</html>
