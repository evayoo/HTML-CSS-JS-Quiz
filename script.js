const questions = [
    {
        question: 'When using the document.querySelector method, what does it return?',
        options: ['A. An array of matching elements', 'B. The first element that matches the provided selector', 'C. An object representing the document', 'D. A NodeList of matching elements'],
        correctAnswer: 'B. The first element that matches the provided selector'
    },
    {
        question: 'Which CSS property is used to create a three-dimensional effect by adding depth to elements and is often used in conjunction with transform functions like rotateX and rotateY?',
        options: ['A. perspective', 'B. opacity', 'C. border-radius', 'D. box-shadow'],
        correctAnswer: 'A. perspective'
    },
    {
        question: 'What is the purpose of the preventDefault method in JavaScript event handling?',
        options: ['A. It stops the event from propagating to the parent elements.', 'B. It cancels the event, preventing its default behavior.', 'C. It pauses the event and resumes it later.', 'D. It triggers the event explicitly.' ],
        correctAnswer: 'B. It cancels the event, preventing its default behavior.'
    },
    {
        question: 'The ___ property is a shorthand property for setting both the flex-direction and flex-wrap properties.',
        options: ['A. flex-auto', 'B. flex-fit', 'C. flex-flow', 'D. flex-fill'],
        correctAnswer: 'C. flex-flow'
    },
    {
        question: 'What does the “fr” measurement unit do?',
        options: ['A. It expands the lines of the cell', 'B. It expands the lines of row', 'C. It makes the grid contract', 'D. It takes as much space as possible'],
        correctAnswer: 'D. It takes as much space as possible'
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.option');
const resultText = document.getElementById('result-text');
const resultContainer = document.getElementById('result-container');
const nextButton = document.getElementById('next-button');

function displayQuestion() {
    if (currentQuestion < questions.length) {
        questionText.textContent = questions[currentQuestion].question;
        options.forEach((option, index) => {
            option.textContent = questions[currentQuestion].options[index];
            option.addEventListener('click', checkAnswer);
        });
    } else {
        showResult();
    }
}

function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (selectedOption === correctAnswer) {
        score++;
        resultText.textContent = 'Correct! 👍';
    } else {
        resultText.textContent = `Wrong! 😞 The correct answer is: ${correctAnswer}.`;
    }
    currentQuestion++;
    displayQuestion();
}

function showResult() {
    questionText.style.display = 'none';
    options.forEach((option) => {
        option.style.display = 'none';
    });

    resultText.textContent = `You scored ${score} out of ${questions.length}`;
    resultContainer.style.display = 'block';
    nextButton.style.display = 'block';

    if (score === questions.length) {
        resultText.textContent += " - You're a genius!";
    } else {
        resultText.textContent += " - You seem to have a bad day.";
    }
}

// function hideResultContainer() {
//     const resultContainer = document.getElementById('result-container');
//     resultContainer.style.display = 'none';
//     nextButton.style.display = 'none';
//     optionButtons.forEach((button) => {
//         button.disabled = false; // Re-enable answer buttons for the next question.
//     });
// }
// function showFinalMessage() {
//     const finalMessage = document.getElementById('final-message');
//     finalMessage.style.display = 'block';
//     if (score === 50) {
//         finalMessage.textContent = 'You are a genius!';
//     } else {
//         finalMessage.textContent = 'You did your best!';
//     }
// }

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    questionText.style.display = 'block';
    options.forEach((option) => {
        option.style.display = 'block';
    });
    resultContainer.style.display = 'none';
    nextButton.style.display = 'none';
    displayQuestion();
}

displayQuestion();