function updateData() {
    $.ajax({
        url: "outbound.php",
        type: "GET",
        error: function() {
            updatePage('{"caf":"?","ch3":"?","lib":"?"}')
        },
        success: function(res) {
            updatePage(res);
        }
    });
};

function updatePage(res) {
    data = JSON.parse(res);
    const max_user = {
        'lib': 50,
        'caf': 260,
        'ch3': 40
    }
    const place = [
        "lib", "caf", "ch3"
    ];

    for (var i = 0; i < place.length; i++) {
        key = place[i];

        num = data[key];
        max = max_user[key];
        text = `${num} / ${max}`;
        if (num == "?") {
            width = '0%'
        } else {
            if(num <= max) {
                width = `${num*100 / max}%`;
            } else {
                width = '100%'
            }
        }

        element = $(`#${key}`);
        element.children('.tag').children('.cap-text').text(text);
        element.children('.bar').css("width", width);
    }
};
setTimeout(() => {
    updateData();
}, 0)
setInterval(updateData, 10000);