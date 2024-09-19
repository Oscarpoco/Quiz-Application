# Node.js Timed Quiz Application: Code Documentation

## Table of Contents
1. Introduction
2. Version 1: Open-Ended Questions
   2.1 Code Structure
   2.2 Key Functions and Components
   2.3 Asynchronous Operations and Event Handling
3. Version 2: Multiple Choice Questions
   2.1 Code Structure
   2.2 Key Functions and Components
   2.3 Differences from Version 1
4. Common Concepts and Techniques

## 1. Introduction

This documentation provides a detailed explanation of the code for both versions of the Node.js Timed Quiz Application. We'll break down the key components, functions, and techniques used in each version.

## 2. Version 1: Open-Ended Questions

### 2.1 Code Structure

```javascript
const readline = require('readline');

const questions = [ ... ];
const totalQuizTime = 60;
let currentQuestionIndex = 0;
let score = 0;
let quizTimer;
let questionTimer;

const rl = readline.createInterface({ ... });

function startQuiz() { ... }
function askQuestion() { ... }
function endQuiz(reason) { ... }

startQuiz();
```

### 2.2 Key Functions and Components

1. **Module Import and Global Variables**
   ```javascript
   const readline = require('readline');
   ```
   - Imports the `readline` module for handling user input.

   ```javascript
   const questions = [ ... ];
   const totalQuizTime = 60;
   let currentQuestionIndex = 0;
   let score = 0;
   let quizTimer;
   let questionTimer;
   ```
   - Defines the quiz questions, total quiz time, and initializes variables for tracking the current question, score, and timers.

2. **Readline Interface**
   ```javascript
   const rl = readline.createInterface({
     input: process.stdin,
     output: process.stdout
   });
   ```
   - Creates an interface for reading user input from the console.

3. **startQuiz Function**
   ```javascript
   function startQuiz() {
     console.log("Welcome to the Timed Quiz!");
     console.log(`You have ${totalQuizTime} seconds to complete the quiz.`);
     
     quizTimer = setTimeout(() => {
       endQuiz("Time's up for the entire quiz!");
     }, totalQuizTime * 1000);

     askQuestion();
   }
   ```
   - Displays welcome message and quiz duration.
   - Sets up the overall quiz timer using `setTimeout`.
   - Calls `askQuestion()` to start the quiz.

4. **askQuestion Function**
   ```javascript
   function askQuestion() {
     if (currentQuestionIndex >= questions.length) {
       endQuiz("You've answered all the questions!");
       return;
     }

     const currentQuestion = questions[currentQuestionIndex];
     console.log(`\nQuestion ${currentQuestionIndex + 1}: ${currentQuestion.question}`);
     console.log(`You have ${currentQuestion.time} seconds to answer.`);

     let remainingTime = currentQuestion.time;
     questionTimer = setInterval(() => {
       remainingTime--;
       process.stdout.write(`\rTime remaining: ${remainingTime} seconds`);

       if (remainingTime <= 0) {
         clearInterval(questionTimer);
         console.log("\nTime's up for this question!");
         currentQuestionIndex++;
         askQuestion();
       }
     }, 1000);

     rl.question("Your answer: ", (answer) => {
       clearInterval(questionTimer);

       if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
         console.log("Correct!");
         score++;
       } else {
         console.log(`Incorrect. The correct answer is ${currentQuestion.answer}.`);
       }

       currentQuestionIndex++;
       askQuestion();
     });
   }
   ```
   - Checks if all questions have been answered.
   - Displays the current question and time limit.
   - Sets up a timer for the current question using `setInterval`.
   - Uses `rl.question()` to asynchronously get user input.
   - Checks the answer, updates the score, and moves to the next question.

5. **endQuiz Function**
   ```javascript
   function endQuiz(reason) {
     clearTimeout(quizTimer);
     clearInterval(questionTimer);
     console.log(`\n${reason}`);
     console.log(`Quiz ended. Your final score is ${score} out of ${questions.length}.`);
     rl.close();
   }
   ```
   - Clears all timers.
   - Displays the reason for ending the quiz and the final score.
   - Closes the readline interface.

### 2.3 Asynchronous Operations and Event Handling

- The `setTimeout` function in `startQuiz()` sets up an asynchronous timer for the entire quiz duration.
- The `setInterval` function in `askQuestion()` creates a repeating timer for each question.
- `rl.question()` is an asynchronous operation that waits for user input without blocking the main thread.

## 3. Version 2: Multiple Choice Questions

### 3.1 Code Structure

The overall structure remains similar to Version 1, with modifications to support multiple-choice questions.

### 3.2 Key Functions and Components

1. **Questions Array**
   ```javascript
   const questions = [
     {
       question: "What is the capital of France?",
       options: ["A) London", "B) Berlin", "C) Paris", "D) Madrid"],
       answer: "C",
       time: 10
     },
     // ... other questions
   ];
   ```
   - Each question now includes an `options` array and the `answer` is a letter corresponding to the correct option.

2. **askQuestion Function (Modified)**
   ```javascript
   function askQuestion() {
     // ... (similar to Version 1)

     const currentQuestion = questions[currentQuestionIndex];
     console.log(`\nQuestion ${currentQuestionIndex + 1}: ${currentQuestion.question}`);
     currentQuestion.options.forEach(option => console.log(option));
     console.log(`You have ${currentQuestion.time} seconds to answer.`);

     // ... (timer setup similar to Version 1)

     rl.question("Your answer (A, B, C, or D): ", (answer) => {
       clearInterval(questionTimer);

       if (answer.toUpperCase() === currentQuestion.answer) {
         console.log("Correct!");
         score++;
       } else {
         console.log(`Incorrect. The correct answer is ${currentQuestion.answer}.`);
       }

       currentQuestionIndex++;
       askQuestion();
     });
   }
   ```
   - Displays multiple-choice options for each question.
   - Modifies the answer checking logic to compare uppercase letters.

### 3.3 Differences from Version 1

- The `questions` array structure includes `options` for each question.
- The `askQuestion` function displays multiple-choice options.
- Answer validation compares uppercase letters instead of full text answers.

## 4. Common Concepts and Techniques

1. **Recursion**: Both versions use recursion in the `askQuestion` function to move through the quiz questions.

2. **Closures**: The timer callback functions in `setInterval` and `setTimeout` create closures, allowing access to variables in the outer scope.

3. **Asynchronous Programming**: The quiz extensively uses asynchronous operations (timers and user input) to create a non-blocking application.

4. **State Management**: Global variables (`currentQuestionIndex`, `score`) are used to manage the quiz state across function calls.

5. **Error Handling**: While not explicitly implemented, the structure allows for easy addition of try-catch blocks for robust error handling.

This documentation provides a detailed explanation of the code structure, key functions, and programming concepts used in both versions of the Node.js Timed Quiz Application. It serves as a comprehensive guide for understanding the implementation details and can be used as a reference for further development or learning purposes.
