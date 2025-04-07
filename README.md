# Quiz-Application

A feature-rich interactive command-line quiz application built with Node.js. This quiz game challenges players with timed questions, provides helpful feedback, and creates an engaging experience with colorful terminal output.

## Features

- **🕒 Timed Questions**: Each question has its own countdown timer
- **⏱️ Overall Quiz Timer**: Complete the entire quiz within 60 seconds
- **📊 Progress Tracking**: Visual progress bar shows completion status
- **🎨 Colorful Interface**: Enhanced terminal display with chalk
- **📈 Performance Feedback**: Detailed score report with personalized feedback
- **⌨️ User-friendly Controls**: Easy-to-use command interface

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Oscarpoco/Quiz-Application.git
cd Quiz-Application
```

2. Install the dependencies:
```bash
npm install
```

## Usage

Start the quiz by running:
```bash
node quiz.js
```

## How to Play

1. The quiz begins with a welcome screen displaying instructions
2. Each question appears with its own timer countdown
3. Answer correctly to earn points
4. The quiz ends when either:
   - All questions have been answered
   - The overall quiz timer (60 seconds) expires

## Terminal Requirements

This application uses terminal control sequences for cursor positioning and screen clearing. For the best experience, use a terminal that supports ANSI escape sequences.

## Dependencies

- [chalk](https://www.npmjs.com/package/chalk) - Terminal string styling
- [readline](https://nodejs.org/api/readline.html) - Built-in Node.js module for reading input


## Author

Oscar Poco

## Acknowledgments

- Special thanks to the Node.js community
- Inspired by classic trivia games
