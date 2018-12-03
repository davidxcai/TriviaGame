# TriviaGame

[Check it out!](https://helloimdavidhaha.github.io/TriviaGame/)

## About

It's a ~~pretty bad~~ trivia game with 10 questions total.

The questions are selected at random and the answers are in random order.
-Questions are located in an array of objects
 -The answer choices and correct answer are located within each object
-The array is shuffled once at the beginning of the game
-Questions and answers are then inserted into the html containing the proper Ids
-Each choice button is then given a value equal to the text inserted
 -There is a compare function to compare the selected answer and the correct answer

Each question has a 30 second timer for you to think.

If the timer reaches 0, a new question will appear.

If the total of correct answers is equal to or greater than 7, you pass.

I've added a retry button at the results screen to reset the entire game.
-Scores at the end are reset to 0 and the questions array is shuffled once again