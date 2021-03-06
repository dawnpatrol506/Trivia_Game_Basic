$(document).ready(function () {

    var outOfTen = 0;

    var qArray = randomizeArray(questions);

    var timeOut;
    var interval;

    function startGame() {
        var timer = $("<h1 id='timer' class='col-12 text-center'>90</h3>")
        $(".game-area").append(timer);

        var timeRemaining = 90;

        timeOut = setTimeout(function () {
            checkAnswers();
            displayResults();
            clearInterval(interval);
        }, 90000);

        interval = setInterval(function () {
            timeRemaining--;
            $("#timer").text(timeRemaining);
        }, 1000);

        for (i = 0; i < 10; i++) {
            var mainRow = $("<div class='text-center row full-question'></div>");

            var q = $("<h5 class='col-12 question-text'>" + qArray[i].question + "</h5>");
            //console.log(q);
            mainRow.append(q);

            var radioRow = $("<div class='text-center col-12 radio-row" + i + "'></div>");
            mainRow.append(radioRow);

            var randoArray = randomizeArray(qArray[i].answers);

            for (j = 0; j < 4; j++) {
                var a = $("<input type='radio' name='answer" + i + "' value='" + randoArray[j] + "'></input>");

                var lbl = $("<label for='answer" + j + "'>" + randoArray[j] + "</label>");

                radioRow.append(a);
                radioRow.append(lbl);
            }

            //console.log(row);
            $(".game-area").append(mainRow);
        }
        var submitBtn = $("<button class='col-12' id='sbmt'>Submit</button>");
        $(".game-area").append(submitBtn);

    }

    function randomizeArray(array) {
        var arr = [];

        for (var i = 0; i < array.length; i++) {
            arr.push(array[i]);
        }

        for (var i = 0; i < arr.length; i++) {
            var rand = Math.floor(Math.random() * arr.length);

            var swapper = arr[i];
            arr[i] = arr[rand];
            arr[rand] = swapper;
        }

        return arr;
    }

    function checkAnswers() {
        for (var i = 0; i < qArray.length; i++) {
            var selected = $(".radio-row" + i).children(":checked");
            if (selected.val() === qArray[i].answers[3])
                outOfTen++;
        }
    }

    function displayResults() {
        $(".game-area").empty();

        var result = $("<h1 id='score' class='col-12 text-center'>Your Score: " + outOfTen + "/10</h1>");
        var playAgain = $("<button class='btn-danger col-12' id='play-again'>Play Again?</button>");

        $(".bg").append(result);
        $(".bg").append(playAgain);
    }

    function restartGame() {
        $("#play-again").remove();
        $("#score").remove();
        var startButton = $("<button class='col-12 btn-danger' id='start-game'>Start</button>");
        $(".game-area").append(startButton);
        outOfTen = 0;
    }

    $(document).on('click', '#sbmt', function () {
        clearTimeout(timeOut);
        clearInterval(interval);
        checkAnswers();
        displayResults();
    });

    $(document).on('click', '#start-game', function () {
        $("#start-game").hide();
        startGame();
    });

    $(document).on('click', '#play-again', restartGame);

    $(document).on('click', 'label', function(){
        var radio = $(this).prev();
        radio.prop('checked', true);
    });

});