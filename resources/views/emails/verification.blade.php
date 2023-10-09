<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            background-color: #f5f5f5; /* Set a background color if needed */
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }

        .company-name {
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }

        .email-body {
            margin-top: 20px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="company-name">Nubook</div>
    <div class="email-container">
        <div class="email-body">
            <p>Hello {{ $user->first_name }},</p>
            <p>Thank you for registering. To verify your email, please use the following one-time code:</p>
            <p><strong>{{ $verificationCode }}</strong></p>
            Click [here]({{ $verificationUrl }}) to verify your email.

            <p>If you didn't register, you can ignore this email.</p>
        </div>
    </div>
</body>
</html>
