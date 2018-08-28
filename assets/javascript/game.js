$(document).ready(function(){

function startGame(){
    for(i = 0; i < 10; i++){
        //console.log('first loop');
        var mainRow = $("<div class='row full-question'></div>");
        
        var q = $("<h5 class='question-text'>" + questions[i].question + "</h5>");
        //console.log(q);
        mainRow.append(q);

        var radioRow = $("<div class='radio-row'></div>");
        mainRow.append(radioRow);

        for(j = 0; j < 4; j++){
            var a = $("<input type='radio' name='answer" + i + "'></input>");

            var lbl = $("<label for='answer" + j + "'>" + questions[i].answers[j] + "</label>");

            radioRow.append(a);
            radioRow.append(lbl);
        }

        //console.log(row);
        $(".game-area").append(mainRow);
    }
    var submitBtn = $("<button id='sbmt'>Submit</button>");
    $(".game-area").append(submitBtn);

}

$("#start-game").on('click', function(){
    $("#start-game").hide();
    startGame();
})

});