<?php

    if (isset($_POST['submit-mail'])) {

        $email_to = "djoo@umich.edu";

        $name = $_POST['nameIn'];
        $address = $_POST['emailIn'];
        $message = $_POST['messageIn'];
        $error = "";

        if($name == '') $error .= 'Please fill in your name';

        if (!filter_var($address, FILTER_VALIDATE_EMAIL)) $error .= 'The e-mail is invalid';

        $mailTo = "djoo@umich.edu";
        $subject = "FROM WEBSITE: ".$name;
        $header = "Mail from: ".$name.", ".$address."\n\n";

        mail($mailTo, $subject, $message, $header);
        header("Location: index.html?mailsent");
    }


