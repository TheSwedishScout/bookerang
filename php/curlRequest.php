<?php

function test_input($data) {

  global $conn;

  $data = trim($data);

  $data = stripslashes($data);

  $data = htmlspecialchars($data);

  return $data;
}
if(isset($_GET["method"])){
    $methods = test_input($_GET["method"]);
    switch ($methods) {
        case 'GET':
            $method = "GET";
            break;
        case 'POST':
            $method = 'POST';
            break;
        case 'PUT':
            $method = 'PUT';
            break;
        case 'DELETE':
            $method = 'DELETE';
            break;
        default:
            $method = "GET";
            break;
    }
}else{
    $method = "GET";
}
if(isset($_GET["url"])){
    $urlExtention = test_input($_GET["url"]);
}else{
    $urlExtention = "";
    die;
}
$jsonArray=[];
if(isset($_GET["id"])){
    $id = test_input($_GET["id"]);
    $jsonArray["id"] = $id;
}
if(isset($_GET["name"])){
    $name = test_input($_GET["name"]);
    $jsonArray["name"] = $name;
}
if(isset($_GET["date"])){
    $date = test_input($_GET["date"]);
    $jsonArray["date"] = $date;
}
if(isset($_GET["starttime"])){
    $starttime = test_input($_GET["starttime"]);
    $jsonArray["starttime"] = $starttime;
}
if(isset($_GET["endtime"])){
    $endtime = test_input($_GET["endtime"]);
    $jsonArray["endtime"] = $endtime;
}
if(isset($_GET["place"])){
    $place = test_input($_GET["place"]);
    $jsonArray["place"] = $place;
}
if(isset($_GET["min"])){
    $min = test_input($_GET["min"]);
    $jsonArray["min"] = $min;
}
if(isset($_GET["max"])){
    $max = test_input($_GET["max"]);
    $jsonArray["max"] = $max;
}
if(isset($_GET["responsible"])){
    $responsible = test_input($_GET["responsible"]);
    $jsonArray["responsible"] = $responsible;
}
if(isset($_GET["prio"])){
    $prio = test_input($_GET["prio"]);
    $jsonArray["priogroup"] = $prio;
}
if(isset($_GET["priogroup"])){
    $priogroup = test_input($_GET["priogroup"]);
    $jsonArray["priogroup"] = $priogroup;
}
if(isset($_GET["activity_id"])){
    $activity_id = test_input($_GET["activity_id"]);
    $jsonArray["activity_id"] = $activity_id;
}
if(isset($_GET["usergroup"])){
    $usergroup = test_input($_GET["usergroup"]);
    $jsonArray["usergroup"] = $usergroup;
}
if(isset($_GET["description"])){
    $description = test_input($_GET["description"]);
    $jsonArray["description"] = $description;
}

$url = 'http://cloud.wilhelmsson.eu/bookerang/api/v1.0/'.$urlExtention;

 
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
if($response){
    echo($response);
}else{
    echo "error";
}


?>
