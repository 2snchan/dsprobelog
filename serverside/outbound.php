<?php
    date_default_timezone_set('Asia/Seoul');

    $conn = mysqli_connect("localhost", "root", "PRIVATE_PASSWORD", "realtime_data");

    $data = array(
        "lib" => "?",
        "caf" => "?",
        "ch3" => "?"
    );
    
    $timestamp = date('Y-m-d H:i:s', strtotime("-3 minutes"));

    foreach ($data as $place => $value){
        $sql = "SELECT people FROM {$place}_log WHERE update_time >= '{$timestamp}'";
        $result = mysqli_query($conn, $sql);

        $logs = mysqli_fetch_all($result);
        if(count($logs) == 0){
            continue;
        }

        $sum = 0;
        foreach($logs as $people){
            $sum += intval($people[0]);
        }

        $average = round($sum/count($logs));
        $data[$place] = $average;
    }
    
    $json = json_encode($data);
    echo $json;

    mysqli_close($conn);
?>