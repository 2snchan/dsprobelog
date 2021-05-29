<?php
    date_default_timezone_set('Asia/Seoul');

    $conn = mysqli_connect("localhost", "root", "PRIVATE_PASSWORD", "realtime_data");

    $sql = "SELECT * from people_density";
    $result = mysqli_query($conn, $sql);

    $data = [];
    while($row = mysqli_fetch_assoc($result)) {
        $last_updated = strtotime($row["last_updated"]);
        if(strtotime("-1 minutes") < $last_updated) {
            $data[$row["place"]] = intval($row["people"]);
        } else {
            $data[$row["place"]] = "?";
        }
    }

    $json = json_encode($data);
    echo $json;
    mysqli_close($conn);
?>