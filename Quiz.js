const readline = require('readline');

const questions = [
  { question: "What is the capital of France?", answer: "Paris", time: 10 },
  { question: "What is 2 + 2?", answer: "4", time: 5 },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare", time: 15 },
];

const totalQuizTime = 60;
let currentQuestionIndex = 0;
let score = 0;
let quizTimer;
let questionTimer;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startQuiz() {
  console.log("Welcome to the Timed Quiz!");
  console.log(`You have ${totalQuizTime} seconds to complete the quiz.`);
  
  quizTimer = setTimeout(() => {
    endQuiz("Time's up for the entire quiz!");
  }, totalQuizTime * 1000);

  askQuestion();
}

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

function endQuiz(reason) {
  clearTimeout(quizTimer);
  clearInterval(questionTimer);
  console.log(`\n${reason}`);
  console.log(`Quiz ended. Your final score is ${score} out of ${questions.length}.`);
  rl.close();
}

startQuiz();