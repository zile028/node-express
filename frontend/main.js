let questionText = document.querySelector(".question-text");
let options = document.querySelector(".options");
let questionNumber = document.querySelector(".question-number");
let questionBody = document.querySelector(".card-body");
let questions = null;
let quiz = null;

let xml = new XMLHttpRequest();
xml.open("POST", "/questions/movies");
xml.setRequestHeader("Content-Type", "application/json");
xml.onreadystatechange = function () {
  if (xml.status === 200 && xml.readyState === 4) {
    let data = JSON.parse(xml.responseText);
    questions = data.map((question) => {
      return new Question(
        question.text,
        question.options,
        question.answer,
        question.points,
        question.category
      );
    });
    quiz = new Quiz(Utils.randomize(questions));
    startQuiz();
  } else if (xml.readyState === 4 && xml.status !== 200) {
    console.log(xml.responseText);
  }
};

xml.send(JSON.stringify({ name: "Dejan" }));

function startQuiz() {
  let currentQuestion = quiz.getCurrentQuestion();
  questionText.innerHTML = currentQuestion.text;
  questionNumber.innerHTML = `Question ${quiz.currentQuestion + 1}/${
    quiz.questions.length
  }`;
  options.innerHTML = "";
  Utils.randomize(currentQuestion.options).forEach((option) => {
    let button = document.createElement("button");
    button.className = "btn btn-primary";
    button.innerHTML = option;
    button.onclick = checkAnswer;
    options.appendChild(button);
  });
}

function checkAnswer() {
  quiz.verify(this.innerHTML);
  if (quiz.isEnd()) {
    displayResult();
  } else {
    startQuiz();
  }
}

function displayResult() {
  questionBody.innerHTML = "";
  let html = `<h2>RESULT</h2>`;
  html += `<h4>Your score is: ${quiz.score}</h4>`;
  html += "<ul>";
  quiz.correctAnswers.forEach((answer) => {
    html += `<li>${answer.text}</li>`;
  });
  html += "</ul>";
  questionBody.innerHTML = html;
}
