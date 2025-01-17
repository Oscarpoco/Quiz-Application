import readline from 'readline';
import chalk from 'chalk';

const questions = [
  { question: "What is the capital of France?", answer: "Paris", time: 15, hint: "It's known as the City of Light" },
  { question: "What is 2 + 2?", answer: "4", time: 15, hint: "Think basic arithmetic" },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare", time: 15, hint: "Famous English playwright from the 16th century" },
];

const totalQuizTime = 60;
let currentQuestionIndex = 0;
let score = 0;
let quizTimer;
let questionTimer;
let startTime;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function clearScreen() {
  console.clear();
}

function drawProgressBar(current, total, width = 20) {
  const progress = Math.floor((current / total) * width);
  const bar = "█".repeat(progress) + "░".repeat(width - progress);
  return `[${bar}] ${Math.round((current / total) * 100)}%`;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function displayHeader() {
  clearScreen();
  console.log(chalk.cyan.bold("=".repeat(50)));
  console.log(chalk.yellow.bold("               INTERACTIVE QUIZ"));
  console.log(chalk.cyan.bold("=".repeat(50)));
}

function startQuiz() {
  displayHeader();
  startTime = Date.now();
  
  console.log(chalk.green.bold("\nWelcome to the Enhanced Quiz!"));
  console.log(chalk.white(`You have ${formatTime(totalQuizTime)} to complete ${questions.length} questions.`));
  console.log(chalk.gray("\nTips:"));
  console.log(chalk.gray("- Type \"hint\" to get a hint (costs 1 point)"));
  console.log(chalk.gray("- Type \"skip\" to move to the next question"));
  console.log(chalk.gray("- Press Ctrl+C to exit\n"));
  
  quizTimer = setTimeout(() => {
    endQuiz("Time's up for the entire quiz!");
  }, totalQuizTime * 1000);
  
  askQuestion();
}

function displayQuestionHeader() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const remainingTime = totalQuizTime - elapsedTime;
  
  console.log("\n" + chalk.cyan.bold("─".repeat(50)));
  console.log(chalk.yellow.bold(`Question ${currentQuestionIndex + 1} of ${questions.length}`));
  console.log(chalk.blue(`Overall Progress: ${drawProgressBar(currentQuestionIndex + 1, questions.length)}`));
  console.log(chalk.green(`Total Time Remaining: ${formatTime(remainingTime)}`));
  console.log(chalk.cyan.bold("─".repeat(50)) + "\n");
}

function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz("Congratulations! You've completed all questions!");
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  displayQuestionHeader();
  
  console.log(chalk.white.bold(currentQuestion.question));
  console.log(chalk.gray(`Time for this question: ${currentQuestion.time} seconds\n`));
  
  // Store the initial cursor position
  const timerLine = process.stdout.rows - 2;
  
  let remainingTime = currentQuestion.time;
  const updateTimer = () => {
    // Save cursor position
    process.stdout.write('\u001B[s');
    // Move to timer line
    process.stdout.write(`\u001B[${timerLine};0H`);
    // Clear line and write timer
    process.stdout.clearLine(0);
    process.stdout.write(
      remainingTime <= 5 
        ? chalk.red(`⏰ Time remaining: ${remainingTime}s`)
        : chalk.yellow(`⏰ Time remaining: ${remainingTime}s`)
    );
    // Restore cursor position
    process.stdout.write('\u001B[u');
  };

  // Initial timer display
  updateTimer();
  
  questionTimer = setInterval(() => {
    remainingTime--;
    updateTimer();

    if (remainingTime <= 0) {
      clearInterval(questionTimer);
      console.log(chalk.red.bold("\n\nTime is up for this question!"));
      currentQuestionIndex++;
      setTimeout(askQuestion, 1500);
    }
  }, 1000);

  console.log(); 
  rl.question(chalk.cyan("Your answer: "), (answer) => {
    clearInterval(questionTimer);
    
    if (answer.toLowerCase() === "hint") {
      console.log(chalk.yellow(`\nHint: ${currentQuestion.hint}`));
      score = Math.max(0, score - 1);
      console.log(chalk.red("(-1 point for using hint)"));
      rl.question(chalk.cyan("\nYour answer: "), processAnswer);
    } else if (answer.toLowerCase() === "skip") {
      console.log(chalk.yellow("\nQuestion skipped!"));
      currentQuestionIndex++;
      setTimeout(askQuestion, 1500);
    } else {
      processAnswer(answer);
    }
  });
}

function processAnswer(answer) {
  const currentQuestion = questions[currentQuestionIndex];
  
  if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    console.log(chalk.green.bold("\n✓ Correct! Well done!"));
    score++;
    console.log(chalk.green(`+1 point (Current score: ${score})`));
  } else {
    console.log(chalk.red.bold("\n✗ Incorrect!"));
    console.log(chalk.yellow(`The correct answer is: ${currentQuestion.answer}`));
  }

  currentQuestionIndex++;
  setTimeout(askQuestion, 1500);
}

function endQuiz(reason) {
  clearTimeout(quizTimer);
  clearInterval(questionTimer);
  
  displayHeader();
  console.log(chalk.yellow.bold(`\n${reason}`));
  
  const percentage = (score / questions.length) * 100;
  console.log(chalk.white.bold("\nFinal Results:"));
  console.log(chalk.cyan("─".repeat(50)));
  console.log(chalk.white(`Final Score: ${score} out of ${questions.length} (${percentage.toFixed(1)}%)`));
  
  let feedback;
  if (percentage === 100) feedback = "Perfect score! Outstanding!";
  else if (percentage >= 80) feedback = "Excellent work!";
  else if (percentage >= 60) feedback = "Good job!";
  else if (percentage >= 40) feedback = "Not bad, keep practicing!";
  else feedback = "More practice will help improve your score!";
  
  console.log(chalk.yellow(`\nFeedback: ${feedback}`));
  console.log(chalk.cyan("─".repeat(50)));
  
  rl.close();
}

// Handle Ctrl+C gracefully
rl.on("SIGINT", () => {
  console.log(chalk.yellow.bold("\n\nQuiz terminated by user."));
  endQuiz("Quiz terminated early.");
});

startQuiz();