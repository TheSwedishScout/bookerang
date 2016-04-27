<?php

function test_input($data) {

  global $conn;

  $data = trim($data);

  $data = stripslashes($data);

  $data = htmlspecialchars($data);

  return $data;
}

$jsonArray=[];
if(isset($_GET["name"])){
    $name = test_input($_GET["name"]);
    $jsonArray["name"] = $name;
}
if(isset($_GET["prio"])){
    $prio = test_input($_GET["prio"]);
    $jsonArray["priogroup"] = $prio;
}
$jsonArray["usergroup"] = "participant";


$url = 'http://cloud.wilhelmsson.eu/bookerang/api/v1.0/users';
$method = 'POST';
 
# headers and data (this is API dependent, some uses XML)
$headers = array(
    'Accept: application/json',
    'Content-Type: application/json',
);
$data = json_encode($jsonArray);
 
$handle = curl_init();
curl_setopt($handle, CURLOPT_URL, $url);
curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($handle, CURLOPT_PORT, 5521);

switch($method) {
    case 'GET':
        break;
    case 'POST':
        curl_setopt($handle, CURLOPT_POST, true);
        curl_setopt($handle, CURLOPT_POSTFIELDS, $data);
        break;
    case 'PUT': 
        curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($handle, CURLOPT_POSTFIELDS, $data);
        break;
    case 'DELETE':
        curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'DELETE');
        break;
}
 
$response = curl_exec($handle);
$code = curl_getinfo($handle, CURLINFO_HTTP_CODE);
echo($response);

?>
