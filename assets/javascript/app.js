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
var didNotAnswer = 0;

//Timer variables
var countdown = 30;
var intervalId;
var timer;

//This questions array holds all questions and answers
var QuestionsArr = [
    {
        question: "The seperation of cream during the churning of milk is due to:",
        answers: ["Centrifugal force", "Centripetal force", "Frictional force", "Viscous drag"],
        correctA: "Centrifugal force"
    },

    {
        question: "What is not true about momentum?",
        answers: ["It is the product of the mass and the velocity of the body", "It is a vector quantity whose direction is same as that of the velocity", "Its physical dimension is MLT-2", "Its S.I. unit is kilogram metre per second"],
        correctA: "Its physical dimension is MLT-2"
    },

    {
        question: "Have you watched Ralph Breaks the Internet?",
        answers: ["Ralph is saved by all the Disney Princesses", "The main antagonist is Ralph's insecurity", "Vanellope decides to stay in the internet", "Not yet"],
        correctA: "The main antagonist is Ralph's insecurity"
    },

    {
        question: "Solve this qusetion using an algebraic method: (x + 4)(x - 4) = 9",
        answers: ["x = 9", "x = 4 and x = -4", "x = 5", "x = 5 and x = -5"],
        correctA: "x = 5 and x = -5"
    },

    {
        question: "アメリカ革命の転換点はどんな戦いでしたか？",
        answers: ["ゲティスバーグの戦い", "フランスとインドの戦争", "バンカーヒルの戦い", "サラトガの戦い"],
        correctA: "サラトガの戦い"
    },

    {
        question: "Wer möchte Gänsebraten mit Knödeln zum Abendessen haben?",
        answers: ["Hans", "Andrea", "Helga", "Emma"],
        correctA: "Hans"
    },

    {
        question: "What musical term is indicates a chord where the notes are played one after another rather than all together?",
        answers: ["Arpeggio", "Adagio", "Adante", "Chorale"],
        correctA: "Arpeggio"
    },

    {
        question: "Do I exist?",
        answers: ["Partially", "No", "Yes", "Sometimes"],
        correctA: "Yes"
    },

    {
        question: "Where can i find some good pizza?",
        answers: ["Pizza hut", "Dominos Pizza", "Little Caesars", "None of these places"],
        correctA: "None of these places"
    },

    {
        question: "Just Monica",
        answers: ["Ok", "Ok", "Ok", "Ok"],
        correctA: "Ok"
    }
];

//Determines if game is running or not; if not, hide the answers
if (started === false) {
    $("#displayCard").hide();
}
if (ended === false) {
    $(".score").hide();
    // $(".endScreen").hide();
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
    $("#displayCard").show();
    $("#startButton").remove();
    $("#pusheen").remove();
    displayQ();
    $("#timer").html("<h2>Time Remaining: " + countdown + "</h2>");
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

//======================[Try Again Button]===========================

$("#tryAgainBtn").click(function () {
    resetGame();
    $("#timer").show();
    displayQ();
    $("#timer").html("<h2>Time Remaining: " + countdown + "</h2>");
})


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
    didNotAnswer++;
    newQA();
    q = q += 1;
    displayQ();
    clearTimeout(tooSlow);
}
//Decrease countdown by 1
function decrement() {
    countdown--;
    $("#timer").html("<h2>Time Remaining: " + countdown + "</h2>");
}

//=========================[MAIN RUNNING FUNCTION]===========================
//Main function running the game

function displayQ() {
    $("#timer").html("<h2>Time Remaining: " + countdown + "</h2>");

    //Timer function decrements each second
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
        started= false;
        $(".score").show();
        $("#displayCard").hide();
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

    $("#correct").text(correctTotal);
    $("#incorrect").text(incorrectTotal);
    $("#noAnswer").text(didNotAnswer);

    $("#tryAgainBtn").show();

    if (correctTotal >= 7) {
        $(".endPic").attr("src", "assets/images/youre_winner.jpg");
    }
    else {
        $(".endPic").attr("src", "assets/images/you_died.jpg");
    }

}

function resetGame() {
    $(".score").hide();
    $("#tryAgainBtn").hide();
    $("#timer").show();
    $(".endPic").attr("src", "");
    correctTotal = 0;
    incorrectTotal = 0;
    didNotAnswer = 0;
    q = 0;

    started = true;
    ended = false;

    //Reshuffles the questions
    shuffle(QuestionsArr);
    for(var i = 0; i < QuestionsArr.length; i++) {
        shuffle(QuestionsArr[i].answers);
    }
    $("#displayCard").show();
}
