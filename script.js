// Quiz data will be loaded from en.json
let quizData = [];
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const quizSelect = document.getElementById('quiz-select');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const quizTitle = document.getElementById('quiz-title');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');
const resultText = document.getElementById('result-text');
const scoreText = document.getElementById('score-text');

// Event Listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', () => {
    resultElement.classList.add('hide');
    startButton.classList.remove('hide');
    quizSelect.disabled = false;
});
quizSelect.addEventListener('change', loadQuizTitle);

// Fetch the quiz data from en.json
async function fetchQuizData() {
    try {
        const response = await fetch('en.json');
        const data = await response.json();
        quizData = data[0].quizzes;
        populateQuizSelect();
    } catch (error) {
        console.error('Error loading quiz data:', error);
        alert('Error loading quiz data. Please try again later.');
    }
}

// Populate the quiz selector dropdown
function populateQuizSelect() {
    quizData.forEach(quiz => {
        const option = document.createElement('option');
        option.value = quiz.id;
        option.textContent = quiz.title;
        quizSelect.appendChild(option);
    });
}

// Load the quiz title when a quiz is selected
function loadQuizTitle() {
    const selectedQuizId = parseInt(quizSelect.value);
    if (selectedQuizId) {
        currentQuiz = quizData.find(quiz => quiz.id === selectedQuizId);
        quizTitle.textContent = currentQuiz.title;
        startButton.classList.remove('hide');
    } else {
        quizTitle.textContent = '';
        startButton.classList.add('hide');
    }
}

// Start the quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    startButton.classList.add('hide');
    quizSelect.disabled = true;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

// Set up the next question
function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < currentQuiz.quiz.length) {
        showQuestion(currentQuiz.quiz[currentQuestionIndex]);
    } else {
        showResult();
    }
}

// Show a question and its answer options
function showQuestion(question) {
    questionText.textContent = question.questionText;
    question.answerOptions.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.answerText;
        button.classList.add('btn');
        if (answer.isCorrect === "true") {
            button.dataset.correct = 'true';
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Reset the state between questions
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Handle answer selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    
    if (correct) {
        score++;
    }
    
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    
    if (currentQuestionIndex < currentQuiz.quiz.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.classList.add('hide');
        setTimeout(showResult, 1000);
    }
    
    // Disable all buttons after selection
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
}

// Set the status class (correct/wrong) for an element
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Clear the status classes
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Show the quiz result
function showResult() {
    questionContainer.classList.add('hide');
    resultElement.classList.remove('hide');
    
    const totalQuestions = currentQuiz.quiz.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    if (percentage >= 70) {
        resultText.textContent = "Congratulations, you completed the quiz!";
    } else {
        resultText.textContent = "Sorry, try again";
    }
    
    scoreText.textContent = `Your score: ${score} out of ${totalQuestions} (${percentage}%)`;
}

// Initialize the app
fetchQuizData();
