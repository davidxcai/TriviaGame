$(document).ready()

var started = false;
var ended = false;
var selected;

var currentQuestion = $("#question")
var btnAnswers = [$("#a1"), $("#a2"), $("#a3"), $("#a4")];
var correctA;

var correctTotal = 0;
var incorrectTotal = 0;

var q = 0; //Questions array index, adter each guess, increment by 1

var answered = [];

//This questions array holds all questions and answers
var questions = [
    {
        question: "why am i so poor?",
        answers: ["it is my birthright", "i lack the qualifications", "lost the lottery", "not sure"],
        correctA: "it is my birthright"
    },

    {
        question: "why does my dad beat me?",
        answers: ["because i don't do as i'm told", "please no", "because i made mom leave", "not sure"],
        correctA: "please no"
    },

    {
        question: "what is my favorite color?",
        answers: ["yes", "blue", "not blue", "not sure"],
        correctA: "blue"
    }
];

//Determines if game is running or not; if not, hide the answers
if (started === false) {
    $("#answers").hide();
}
if (ended === false) {
    $(".score").hide();
    $(".endScreen").hide();
}

$(document).on("click", '.choice', function () {
    selected = $(this).val();
    console.log("You've selected: " + selected);
    compare();
})

//Start button changes game state to true which displays question and answers
$("#startButton").click(function () {
    started = true;
    // gameStart();
    $("#answers").show();
    $("#startButton").hide();
    displayQ();
});

function newQA() {
    $(".choice").empty();
    $(currentQuestion).empty();
    if (q === 10) {
        started = false;
        ended = true;
    }
}

//Button function, compares the correct answer with what user selected
function compare() {
    if (selected === correctA) {
        console.log("Yay you got it right!");
        console.log("====================================")
        correctTotal++;
        newQA();
        q = q += 1;
        displayQ();
    }
    else {
        console.log("Wrong. Loser.");
        console.log("====================================")
        incorrectTotal++;
        newQA();
        q = q += 1;
        displayQ();
    }
}

function displayQ() {
    if (ended === !true) {
        currentQuestion.text(questions[q].question); //Displays the question
        correctA = questions[q].correctA; //Sets hidden var of correct answer  

        //Inserts text to each button and assigns each buttons' values = text inserted
        for (var i = 0; i < questions[q].answers.length; i++) {
            btnAnswers[i].text(questions[q].answers[i]);
            btnAnswers[i].val(questions[q].answers[i])
        }
    }

    if (ended === true) {
        $(".score").show();
        endGame();
    }
    console.log("Correct answer: " + correctA);
}

function endGame() { //Displays the end game screen
    $(".choice").empty();
    $(currentQuestion).empty();
    if (correctTotal > incorrectTotal) {
        $("#winImg").show();
    }
    if (incorrectTotal > correctTotal) {
        $("#loseImg").show();
    }
}


//press start button selects first question
//player answers
//after player input, moves to new question
//after all questions answered, display score