<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            background-color: #414141; /* Set a background color if needed */
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        p {
           line-height: 1.5rem; 
          color: rgb(100 116 139);
        }
      
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #f4f4f4;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }

        .company-name {
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: bold;
            color: rgb(16 185 129);
            text-align: center;
         }

        .email-body {
            margin-top: 20px;
            color: #555;
            text-align: center;
        }
      
        .email-footer {
          background-color: rgb(203 213 225);
          padding: 20px 0px;
          margin-top: 40px;
        }
        
        .email-footer a {
          color: rgb(120 113 108);
          font-size: .80rem;
        }
      
        .salutation { 
           color: rgb(71 85 105);
          font-size: 24px;
        }
      
        .verification-code {
          margin: 30px auto;
          padding: 20px;
          background-color: rgb(16 185 129);
          max-width: 30rem;
          border-radius: 10px;
          text-align: center;
          color: #fff;
         }
      
    </style>
</head>
<body>
    <div class="company-name">Nubook</div>
    <div class='email-container'>
      <div class="email-body">
          <strong class='salutation'>Hey there!</strong>
          <p>Welcome aboard the filmmaking journey! 🎬 Thanks for signing up. </br> To confirm your email, simply enter the magic code below:</p>
          <p class="verification-code"><strong>{{ $verificationCode }}</strong></p>
        <p>And if you didn't mean to join us, </br>just disregard this message like an unused script idea.</p>
          <p>Let's roll! 🎥</p>
      </div>
      <div class='email-footer'>
        <a href='http://localhost/#privacy-policy'>Read our Privacy Policy</a>
      </div>
    </div>

</body>
</html>
