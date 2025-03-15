<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/*
Tested working with PHP5.4 and above (including PHP 7 )

 */
ob_start();
require_once __DIR__ . './vendor/autoload.php';

use FormGuide\Handlx\FormHandler;


$pp = new FormHandler(); 

$validator = $pp->getValidator();
$validator->fields(['Name','Email'])->areRequired()->maxLength(50);
$validator->field('Email')->isEmail();
$validator->field('Message')->maxLength(6000);


// $pp->requireReCaptcha();
// $pp->getReCaptcha()->initSecretKey('6LcAlPQqAAAAAJtDR1FnxxQuKeDX6v3CqaN9U3OB');


$pp->sendEmailTo('umarzeeshan709@gmail.com'); // ← Your email here
error_log("Form Data: " . print_r($_POST, true));

$response = $pp->process($_POST);

if($response->status === 'success')
{
    $response->status = 'OK';
}

// Set the content type to JSON
header('Content-Type: application/json');

echo $response;