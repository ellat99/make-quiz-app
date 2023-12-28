const questions = [
  {
    question:
      "Care dintre următoarele este un mod corect de a declara o variabilă în JavaScript?",
    answers: [
      { text: "variable x = 10;", correct: false },
      { text: "let x = 10", correct: true },
      { text: "const x = 10", correct: false },
      { text: "x = 10", correct: false },
    ],
  },
  {
    question: "Cum se accesează primul element dintr-un array?",
    answers: [
      { text: "array.first()", correct: false },
      { text: " array.get(0)", correct: true },
      { text: "array[0]", correct: false },
      { text: "array.initial()", correct: false },
    ],
  },
  {
    question: "Care este rezultatul expresiei 3 + '3'?",
    answers: [
      { text: "6", correct: false },
      { text: " '33'", correct: true },
      { text: "33", correct: false },
      { text: "error", correct: false },
    ],
  },
  {
    question: "Care dintre următoarele este un operator ternar în JavaScript?",
    answers: [
      { text: "++", correct: false },
      { text: "===", correct: true },
      { text: "? :", correct: false },
      { text: "||", correct: false },
    ],
  },
  {
    question: "Ce face metoda querySelector în JavaScript?",
    answers: [
      {
        text: "Returnează primul element care corespunde unui selector CSS",
        correct: false,
      },
      {
        text: "Returnează toate elementele care corespund unui selector CSS",
        correct: true,
      },
      { text: "Schimbă valoarea unui atribut al unui element", correct: false },
      { text: "Adaugă un nou element în DOM", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disable = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
