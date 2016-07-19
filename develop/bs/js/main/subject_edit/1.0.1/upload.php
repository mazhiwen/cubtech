<?php

header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With');
header("Access-Control-Allow-Origin: *");

print_r($_POST);
print_r($_FILES);

//echo json_encode($_FILES);

?>