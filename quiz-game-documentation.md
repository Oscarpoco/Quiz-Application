# Node.js Timed Quiz Application Documentation

## Table of Contents
1. Introduction
2. Version 1: Open-Ended Questions
   2.1 Overview
   2.2 Key Features
   2.3 Code Structure
   2.4 How to Run
   2.5 Customization
3. Version 2: Multiple Choice Questions
   3.1 Overview
   3.2 Key Features
   3.3 Code Structure
   3.4 How to Run
   3.5 Customization
4. Comparison Between Versions
5. Potential Future Enhancements

## 1. Introduction

This documentation covers two versions of a Node.js-based timed quiz application. Both versions demonstrate the use of asynchronous programming, timers, and user input handling in Node.js.

## 2. Version 1: Open-Ended Questions

### 2.1 Overview

The first version of the quiz application presents users with open-ended questions. Users must type in their answers within a specified time limit for each question and for the overall quiz.

### 2.2 Key Features

- Timed questions with individual countdowns
- Overall quiz timer
- Asynchronous question handling
- Dynamic progression to the next question
- Score tracking

### 2.3 Code Structure

- `questions`: Array of question objects (question, answer, time)
- `startQuiz()`: Initiates the quiz and sets the overall timer
- `askQuestion()`: Displays questions and handles user input
- `endQuiz()`: Terminates the quiz and displays the final score

### 2.4 How to Run

1. Save the code as `quiz.js`
2. Open a terminal and navigate to the directory containing `quiz.js`
3. Run the command: `node quiz.js`

### 2.5 Customization

To customize the quiz:
- Modify the `questions` array to add, remove, or change questions
- Adjust `totalQuizTime` to change the overall quiz duration

## 3. Version 2: Multiple Choice Questions

### 3.1 Overview

The second version enhances the quiz by introducing multiple-choice questions. Users select their answer from provided options within the time limit.

### 3.2 Key Features

- Multiple choice options for each question
- Timed questions with individual countdowns
- Overall quiz timer
- Asynchronous question handling
- Dynamic progression to the next question
- Score tracking

### 3.3 Code Structure

- `questions`: Array of question objects (question, options, answer, time)
- `startQuiz()`: Initiates the quiz and sets the overall timer
- `askQuestion()`: Displays questions with options and handles user input
- `endQuiz()`: Terminates the quiz and displays the final score

### 3.4 How to Run

1. Save the code as `quiz_multiple_choice.js`
2. Open a terminal and navigate to the directory containing `quiz_multiple_choice.js`
3. Run the command: `node quiz_multiple_choice.js`

### 3.5 Customization

To customize the quiz:
- Modify the `questions` array to add, remove, or change questions and their options
- Adjust `totalQuizTime` to change the overall quiz duration

## 4. Comparison Between Versions

| Feature | Version 1 | Version 2 |
|---------|-----------|-----------|
| Question Type | Open-ended | Multiple choice |
| Answer Input | Full text | Single letter (A, B, C, D) |
| Difficulty | Varies based on question | Generally easier due to provided options |
| Grading | Requires exact match | Simpler, letter-based matching |

## 5. Potential Future Enhancements

1. User authentication and persistent scoring
2. Randomized question order
3. Difficulty levels
4. Category-based quizzes
5. Multiplayer functionality
6. GUI implementation (web or desktop application)

---

This documentation provides an overview of both versions of the Node.js Timed Quiz Application, their features, how to run them, and how they can be customized. It serves as a comprehensive guide for understanding, using, and potentially extending these applications.
