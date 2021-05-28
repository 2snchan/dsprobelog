<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>inbound</title>
</head>
<body>
<?php
    date_default_timezone_set('Asia/Seoul');

    $place_key = array(
        'SOME_RANDOM_SECRET_KEY' => 'lib',
        'SOME_RANDOM_SECRET_KEY' => 'caf',
        'SOME_RANDOM_SECRET_KEY' => 'ch3'
    );

    $place = $place_key[$_GET['id']] ?? null;
    $data = $_GET['data'] ?? null;
    
    if($place == null or $data == null) {
        echo '내부 통신 회선입니다. request를 보내지 말아주세요.';
    } else {
        $conn = mysqli_connect("localhost", "root", "PRIVATE_PASSWORD", "realtime_data");
        $timestamp = date('Y-m-d H:i:s');

        $realtime_sql = "UPDATE people_density SET people={$data}, last_updated='{$timestamp}' WHERE place='{$place}'";
        $realtime_result = mysqli_query($conn, $realtime_sql);
        
        $log_sql = "INSERT INTO {$place}_log VALUES ('{$timestamp}', {$data})";
        $log_result = mysqli_query($conn, $log_sql);

        if($realtime_result) {
            echo "realtime update success";
        } else {
            echo "realtime update fail";
        }
        echo "<br>";
        if($log_result) {
            echo "log insertion success";
        } else {
            echo "log insertion fail";
        }
        mysqli_close($conn);
    }
?>
</body>
</html>
