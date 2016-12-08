<?php
$errorMSG = "";

// Name

if (empty($_POST["name"])) {
  $errorMSG = "Name is required ";
} else {
  $name = $_POST["name"];
}

if (empty($_POST["email"])) {
  $errorMSG = "E-mail is required ";
} else {
  $email = $_POST["email"];
}

$phone = $_POST["phone"];

if (empty($_POST["message"])) {
  $errorMSG = "Message is required ";
} else {
  $message = $_POST["message"];
}


$EmailTo = "dango.daikazoku@gmail.com";
$Subject = "Получено новое сообщение";

// Шапка сообщения
$Body .= "Имя: ";
$Body .= "$name";
$Body .= "\n";

$Body .= "E-mail: ";
$Body .= "$email";
$Body .= "\n";

$Body .= "Телефон: ";
$Body .= "$phone";
$Body .= "\n";

$Body .= "Текст сообщения: ";
$Body .= "$message";
$Body .= "\n";

// отправка сообшения
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect
if ($success) {
  echo "success";
}
else {
  echo "invalid";
}
 ?>
