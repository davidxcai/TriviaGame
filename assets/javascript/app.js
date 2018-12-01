$(document).ready()

//Game state variables; if started or not
var started = false;
var ended = false;


var q = 0; //Questions array index, adter each guess, increment by 1
var currentQuestion = $("#question")
var btnAnswers = [$("#a1"), $("#a2"), $("#a3"), $("#a4")];
var selected;
var correctA;

//Variables determine if you win or lose
var correctTotal = 0;
var incorrectTotal = 0;

//Timer variables
var countdown = 30;
var intervalId;
var timer;

//This questions array holds all questions and answers
var QuestionsArr = [
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
    },

    {
        question: "why does my dad color me?",
        answers: ["because i do as i'm told", "please", "because i made mom", "sure"],
        correctA: "please"
    },

    {
        question: "why does my favorite color beat me?",
        answers: ["because i told him", "pleano", "because i made mom leave", "not sure"],
        correctA: "pleano"
    },

    {
        question: "what is my favorite dad?",
        answers: ["dad", "dad?", "daaaad!", "...dad?"],
        correctA: "...dad?"
    },

    {
        question: "like where do we go?",
        answers: ["african", "himalayan", "right here", "right there"],
        correctA: "right there"
    },

    {
        question: "do i exist?",
        answers: ["partially", "no", "yes", "no"],
        correctA: "yes"
    },

    {
        question: "where can i find some good pizza?",
        answers: ["pizza hut", "pizza nut", "pizza palace", "none of the above"],
        correctA: "none of the above"
    },

    {
        question: "Just Monica",
        answers: ["Ok", "Ok", "Ok", "Ok"],
        correctA: "Ok"
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

//Button selector that grabs value
$(document).on("click", '.choice', function () {
    selected = $(this).val();
    console.log("You've selected: " + selected);
    compare();
})

//==========================[ START BUTTON]============================
//Start button changes game state to true which displays question and answers
$("#startButton").click(function () {
    started = true;
    shuffle(QuestionsArr);
    for(var i = 0; i < QuestionsArr.length; i++) {
        shuffle(QuestionsArr[i].answers);
    }
    $("#answers").show();
    $("#startButton").hide();
    displayQ();
    $("#timer").html("<h2>" + countdown + "</h2>");
});

//Function to shuffle questions array
function shuffle(Arr){
    var currentIndex = Arr.length;
    var tempVal;
    var randomIndex;

    //While there are still indexes remaining, shuffle
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        //Forms triangle to swap old index with new random index
        tempVal = Arr[currentIndex];
        Arr[currentIndex] = Arr[randomIndex];
        Arr[randomIndex] = tempVal;
    }
    
    return Arr;
    
}

//====================[After Selecting Answer]========================
//Selects new question
function newQA() {
    $(".choice").empty();
    $(currentQuestion).empty();
    if (q === 9) {
        started = false;
        ended = true;
    }
}

//Button function, compares the correct answer with what user selected
function compare() {
    if (selected === correctA) {
        correctTotal++;
    }
    if (selected !== correctA) {
        incorrectTotal++;
    }
    clearTimeout(timer);
    newQA();
    q = q += 1;
    countdown = 30;
    displayQ();
    
}

//Runs the function if timer reaches 0
function tooSlow() {
    if (countdown === 0) {
        console.log("you were too slow");
        countdown = 30;
    }
    newQA();
    q = q += 1;
    displayQ();
    clearTimeout(tooSlow);
}
//Decrease countdown by 1
function decrement() {
    countdown--;
    $("#timer").html("<h2>" + countdown + "</h2>");
}

//=========================[MAIN RUNNING FUNCTION]===========================
//Main function running the game

function displayQ() {
    $("#timer").html("<h2>" + countdown + "</h2>");

    clearInterval(intervalId);
    countdown = 30;
    intervalId = setInterval(decrement, 1000)
    timer = setTimeout(tooSlow, 1000 * 30);

    if (ended === !true) {

        currentQuestion.text(QuestionsArr[q].question); //Displays the question
        correctA = QuestionsArr[q].correctA; //Sets hidden var of correct answer  

        //Inserts text to each button and assigns each buttons' values = text inserted
        for (var i = 0; i < QuestionsArr[q].answers.length; i++) {
            btnAnswers[i].text(QuestionsArr[q].answers[i]);
            btnAnswers[i].val(QuestionsArr[q].answers[i])
        }
    }

    //Determines if game has ended
    if (ended === true) {
        $(".score").show();
        $("#answers").hide();
        endGame();
    }

    console.log("Answer: " + correctA);
}

//===========================================================================


function endGame() { //Displays the end game screen
    clearTimeout(timer);
    $("#timer").hide();
    $(".choice").empty();
    $(currentQuestion).empty();
    $("#correct").append(correctTotal);
    $("#incorrect").append(incorrectTotal);
    if (correctTotal >= 7) {
        $(".endScreen").show();
        $("#loseImg").hide();
    }
    else if (correctTotal < 7) {
        $(".endScreen").show();
        $("#winImg").hide();
    }
}



//press start button selects first question
//player answers
//after player input, moves to new question
//after all questions answered, display score