let schedule = [];

schedule[0] = {
    subject: "Високопродуктивні обчислення", start_time: "09:00", teacher: "Циганок В.В."
}

schedule[1] = {
    subject: "Проектування та розробка веб-застосувань", start_time: "10:30", teacher: "Федусенко О.В."
}

schedule[2] = {
    subject: "Високопродуктивні обчислення", start_time: "12:10", teacher: ""
}

schedule[3] = {
    subject: "Системний аналіз", start_time: "13:40", teacher: "Іларіонов О.Є."
}

function addToTime(input_hours, input_minutes, add_minutes) {
    input_minutes += add_minutes;
    input_hours += Math.floor(input_minutes / 60);
    input_minutes = input_minutes % 60;
    return input_hours.toString().padStart(2, "0") + ':' + input_minutes.toString().padStart(2, "0");
}

function copeNoTeacher(teacher) {
    if (teacher.length === 0) return ", викладача не вказано.";
    return ", викладає " + teacher;
}

function findFinishTime(input_time) {
    return addToTime(parseInt(input_time), parseInt(input_time.substring(3)), 80);
}

function findLastFinishTime() {
    let result = '';
    for (let i = 0; i < schedule.length; i++) {
        if (findFinishTime(schedule[i].start_time) > result) result = findFinishTime(schedule[i].start_time);
    }
    return result;
}

function lookup() {
    let answerElement = document.getElementById("output");
    let currentDate = document.getElementById('input').valueAsDate;
    let currentHour = String(currentDate.getHours() - 3).padStart(2, "0");
    let currentMinute = String(currentDate.getMinutes()).padStart(2, "0");
    let currentTime = currentHour + ':' + currentMinute;
    let lastFinishTime = ''
    let i = 1;

    answerElement.innerHTML = '';
    if (currentTime < schedule[0].start_time) {
        answerElement.innerHTML = 'Пари ще не почалися';
        return;
    }
    if (currentTime >= findLastFinishTime()) {
        answerElement.innerHTML = 'Пари вже закінчилися';
        return;
    }
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].start_time <= currentTime && currentTime < findFinishTime(schedule[i].start_time)) {
            answerElement.innerHTML = "Зараз " + schedule[i].subject + copeNoTeacher(schedule[i].teacher);
            return;
        }
        if (i < schedule.length - 1 && findFinishTime(schedule[i].start_time) < currentTime && currentTime < schedule[i + 1].start_time) {
            answerElement.innerHTML = "Перерва між парами " + (i + 1) + ' i ' + (i + 2) + '.';
            return;
        }
    }
}

