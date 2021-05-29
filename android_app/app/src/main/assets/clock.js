function updateClock(){
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    var d = now.getDay();
    if(d == 0 || d == 6) {
        var day = 'end';
    } else {
        var day = 'day';
    }
    var time =  h*60 + m;

    const [period, name] = getInterval(day, time);

    $('#clock').text(`${h<10 ? `0${h}`:h}:${m<10 ? `0${m}`:m}`);
    $('#period').text(period);
    $('#interval-name').text(name);
}


function getInterval(day, time) {
    const time_interval = {
        'day': {
            435: ['아침', '식사시간'],
            510: ['아침', 'AA 시간'],
            530: ['1교시', '수업시간'],
            580: ['1교시', '쉬는시간'],
            590: ['2교시', '수업시간'],
            640: ['2교시', '쉬는시간'],
            650: ['3교시', '수업시간'],
            700: ['3교시', '쉬는시간'],
            710: ['4교시', '수업시간'],
            760: ['점심', '식사시간'],
            820: ['5교시', '수업시간'],
            870: ['5교시', '쉬는시간'],
            880: ['6교시', '수업시간'],
            930: ['6교시', '쉬는시간'],
            940: ['7교시', '수업시간'],
            990: ['7교시', '쉬는시간'],
            1000: ['8교시', '수업시간'],
            1050: ['8교시', '쉬는시간'],
            1060: ['9교시', '수업시간'],
            1110: ['저녁', '식사시간'],
            1170: ['10교시', '자습시간'],
            1220: ['10교시', '쉬는시간'],
            1230: ['11교시', '자습시간'],
            1290: ['저녁', '간식시간'],
            1320: ['야간', '생활시간']
        },
        'end': {
            480: ['아침', '식사시간'],
            540: ['오전', '생활시간'],
            780: ['점심', '식사시간'],
            840: ['오후', '생활시간'],
            1080: ['저녁', '식사시간'],
            1140: ['저녁', '생활시간'],
            1290: ['저녁', '간식시간'],
            1320: ['야간', '생활시간']
        }
    }
    
    const intervals = time_interval[day];
    var interval = ['야간', '생활시간'];
    for (var start_time in intervals) {
        if(time < start_time) {
            break;
        }
        var interval = intervals[start_time];
    }
    return interval;
};

updateClock();
setInterval(updateClock, 1000);