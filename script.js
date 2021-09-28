// Global variables.
var activeTime;
var dateNow;
var timeNow;
var timeBlock;
var taskEl = $('.cellTask');
var inputEl = $('input');
var saveEl = $('.cellSave');;

// Check date and time 
function checkDateTime() {

    // Check date/time every second.
    activeTime = setInterval(function() {
        dateNow = moment().format("dddd[,] DD MMMM YYYY");
        $("#currentDate").text(dateNow);
        currentTime = moment().format("H");
        taskEl.each(function() {

           
            timeBlock = $(this).attr('id');
            timeBlock = timeBlock.substr(timeBlock.length - 2);
            if (timeBlock === 'k9') timeBlock = 9;



            // Change to grey if before/after business hours 
            if (currentTime > timeBlock || currentTime < 9 || currentTime > 17) $(this).css("background-color", "lightgrey");

            // Change to red if equal to current time. 
            else if (currentTime == timeBlock) $(this).css("background-color", "tomato");

            // colors will stay green for the rest of the day
        })
    }, 1000);
}

function init() {


    for (i = 9; i < 18; i++) {
        savedTask = 'task' + i;

        grabTask = JSON.parse(localStorage.getItem(savedTask));
        if (grabTask === null) grabTask = '';
        console.log(grabTask);

        document.getElementById('input'+i).value = grabTask;
    }
}


saveEl.click(function(event) {

    event.preventDefault();
    taskToSave = $(this).attr('id');
    taskToSave = taskToSave.substr(taskToSave.length - 2);
    if (taskToSave === 'e9') taskToSave = 9;
    
    savedTask = 'task' + taskToSave;

    taskToSave = $('#input'+taskToSave).val();

    localStorage.setItem(savedTask, JSON.stringify(taskToSave));
});

checkDateTime();
init();