<?php

function test_input($data) {

  global $conn;

  $data = trim($data);

  $data = stripslashes($data);

  $data = htmlspecialchars($data);

  return $data;
}
if(isset($_GET["id"])){
    $id = test_input($_GET["id"]);
    $jsonArray["user_id"] = $id;
}
$jsonArray=[];
if(isset($_GET["occasion_id"])){
    $occasion_id = test_input($_GET["occasion_id"]);
    $jsonArray["occasion_id"] = $occasion_id;
}
if(isset($_GET["user_prio"])){
    $user_prio = test_input($_GET["user_prio"]);
    $jsonArray["user_prio"] = $user_prio;
}
$jsonArray["approved"] = 'false';
$jsonArray["decided"] = 'false';


$url = 'http://cloud.wilhelmsson.eu/bookerang/api/v1.0/userschedules';
$method = 'POST';
 
# headers and data (this is API dependent, some uses XML)
$headers = array(
    'Accept: application/json',
    'Content-Type: application/json',
);
// $data = json_encode($jsonArray);
 echo $data = '{"user_id": 3,"occasion_id":3,"user_prio":3,"approved":"False","decided":"False"}';

 
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
