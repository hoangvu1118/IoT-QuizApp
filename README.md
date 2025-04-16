# IoT Quiz App

A web-based quiz application for learning Internet of Things (IoT) concepts. This application offers multiple-choice quizzes covering various IoT topics from basic concepts to advanced implementations.

## Features

- 48 different quizzes covering 24 IoT lessons
- Pre-lecture and post-lecture quizzes for each lesson
- Immediate feedback on quiz answers
- Score tracking and performance evaluation
- Simple, responsive user interface

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- Optional: Node.js for running with a local server

### Installation

1. Clone or download this repository to your local machine:
   ```
   git clone [repository-url]
   ```
   or download and extract the ZIP file

2. Running the application:

   **Option 1: Direct file opening**
   - Simply open index.html in your web browser

   **Option 2: Using a local server (recommended)**
   - Install Node.js
   - Install http-server:
     ```
     npm install -g http-server
     ```
   - Navigate to the project directory:
     ```
     cd path/to/QuizApp
     ```
   - Start the server:
     ```
     http-server
     ```
   - Open your browser and navigate to:
     ```
     http://localhost:8080
     ```

## Usage

1. Select a quiz from the dropdown menu
2. Click "Start Quiz" to begin
3. Answer each question by selecting one of the provided options
4. View your final score after completing all questions
5. Click "Restart Quiz" to try again or select a different quiz

## Project Structure

- `index.html` - The main HTML file
- `script.js` - Contains the quiz functionality
- `styles.css` - Styling for the application
- `en.json` - Quiz questions and answers data
- `scanner.js` - Utility script for project examination

## Credits

This application uses quiz content from Microsoft's IoT curriculum.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
