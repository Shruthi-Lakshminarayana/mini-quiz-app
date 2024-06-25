const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { ans: "shark", correct: false },
      { ans: "Blue Whale", correct: true },
      { ans: "Elephant", correct: false },
      { ans: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { ans: "vitakan City", correct: true },
      { ans: "Bhutan", correct: false },
      { ans: "Nepal", correct: false },
      { ans: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the Desert in the world?",
    answers: [
      { ans: "Kalahari", correct: false },
      { ans: "Gobi", correct: false },
      { ans: "Sahara", correct: false },
      { ans: "Antartica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { ans: "Asia", correct: false },
      { ans: "Australia", correct: true },
      { ans: "Arctic", correct: false },
      { ans: "Africa", correct: false },
    ],
  },
];

const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
console.log(answerButtons);
console.log(answerButtons.children);
const nextBtn = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

//show question
function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let QuestionNumber = currentQuestionIndex + 1;
  question.innerHTML = QuestionNumber + ". " + currentQuestion.question;
  resetState();
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.ans;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    // console.log(answerButtons.constructor);
    // console.log(answerButtons.children);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectedAnswer);
  });
}

//next button & answerbuttons reset
function resetState() {
  nextBtn.style.display = "none";
  answerButtons.innerHTML = "";
}

//click on guessed answer
function selectedAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  //using array from to convert htmlcollection into arraytype
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

//click next
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

//show score
function showScore() {
  resetState();
  question.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

//click play-again
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
