<?php
/*
header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With');
header("Access-Control-Allow-Origin: *");
*/
//header('Content-type:text/json'); 

//echo $J;
//print_r($J); 
echo json_encode(array(array('name'=>'bbbb','city'=>'ddddd'),array('name'=>'333','city'=>'4444')));
?>