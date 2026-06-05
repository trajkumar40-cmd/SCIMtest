const quizData = {
  "Level 100": {
    SUM: {
      question: "What is SUM?",
      options: ["SUM1", "SUM2", "SUM3"],
      answer: "SUM1"
    },
    OSD: {
      question: "What is OSD?",
      options: ["osd1", "osd2", "osd3"],
      answer: "osd1"
    },
    SRV: {
      question: "What is SRV1?",
      options: ["SRV1", "SRV2", "SRV3"],
      answer: "SRV1"
    },
    APP: {
      question: "What is APP?",
      options: ["APP1", "APP2", "APP3"],
      answer: "APP1"
    },
    CLD: {
      question: "What is CLD?",
      options: ["CLD1", "CLD2", "CLD3"],
      answer: "CLD1"
    }
  },
  "Level 200": {
    
    SUM: {
      question: "What is SUM?",
      options: ["SUM1", "SUM2", "SUM3"],
      answer: "SUM1"
    },
    OSD: {
      question: "What is OSD?",
      options: ["osd1", "osd2", "osd3"],
      answer: "osd1"
    },
    SRV: {
      question: "What is SRV1?",
      options: ["SRV1", "SRV2", "SRV3"],
      answer: "SRV1"
    },
    APP: {
      question: "What is APP?",
      options: ["APP1", "APP2", "APP3"],
      answer: "APP1"
    },
    CLD: {
      question: "What is CLD?",
      options: ["CLD1", "CLD2", "CLD3"],
      answer: "CLD1"
    }
  }
};

let selectedLevel = "";
let selectedTopic = "";
let selectedAnswer = "";
let score = 0;

/* Sections */
const levelSection = document.getElementById("level-section");
const topicSection = document.getElementById("topic-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

/* Buttons */
const submitLevelBtn = document.getElementById("submit-level-btn");
const submitTopicBtn = document.getElementById("submit-topic-btn");
const submitAnswerBtn = document.getElementById("submit-answer-btn");
const backToLevelBtn = document.getElementById("back-to-level-btn");
const changeTopicBtn = document.getElementById("change-topic-btn");
const chooseAnotherTopicBtn = document.getElementById("choose-another-topic-btn");
const startAgainBtn = document.getElementById("start-again-btn");

/* Dynamic Elements */
const selectedLevelText = document.getElementById("selected-level-text");
const topicContainer = document.getElementById("topic-container");
const quizTitle = document.getElementById("quiz-title");
const quizMeta = document.getElementById("quiz-meta");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const resultIcon = document.getElementById("result-icon");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const scoreValue = document.getElementById("score-value");

/* Level selection cards */
const levelCards = document.querySelectorAll(".select-card[data-level]");
levelCards.forEach(card => {
  card.addEventListener("click", () => {
    levelCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    selectedLevel = card.getAttribute("data-level");
    submitLevelBtn.disabled = false;
  });
});

/* Submit Level */
submitLevelBtn.addEventListener("click", () => {
  if (!selectedLevel) return;

  selectedTopic = "";
  selectedAnswer = "";
  score = 0;

  selectedLevelText.innerHTML = `Selected category: <strong>${selectedLevel}</strong>. Choose one topic and click <strong>Submit Topic</strong>.`;

  renderTopics(selectedLevel);

  levelSection.classList.add("hidden");
  topicSection.classList.remove("hidden");
  quizSection.classList.add("hidden");
  resultSection.classList.add("hidden");
});

/* Render Topics */
function renderTopics(level) {
  topicContainer.innerHTML = "";
  submitTopicBtn.disabled = true;

  const topics = Object.keys(quizData[level]);

  topics.forEach(topic => {
    const button = document.createElement("button");
    button.className = "select-card";
    button.innerHTML = `
      <h3>${topic}</h3>
      <p>1 question • 1 point</p>
    `;

    button.addEventListener("click", () => {
      const allTopicCards = topicContainer.querySelectorAll(".select-card");
      allTopicCards.forEach(card => card.classList.remove("active"));
      button.classList.add("active");
      selectedTopic = topic;
      submitTopicBtn.disabled = false;
    });

    topicContainer.appendChild(button);
  });
}

/* Submit Topic */
submitTopicBtn.addEventListener("click", () => {
  if (!selectedTopic) return;

  selectedAnswer = "";
  renderQuiz(selectedLevel, selectedTopic);

  topicSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
});

/* Render Quiz */
function renderQuiz(level, topic) {
  const quiz = quizData[level][topic];

  quizTitle.textContent = `${topic} Quiz`;
  quizMeta.innerHTML = `Category: <strong>${level}</strong> • Topic: <strong>${topic}</strong>`;
  questionText.textContent = quiz.question;
  optionsContainer.innerHTML = "";
  submitAnswerBtn.disabled = true;

  quiz.options.forEach(option => {
    const label = document.createElement("label");
    label.className = "option-label";
    label.innerHTML = `
      <input type="radio" name="quizOption" value="${option}">
      <span>${option}</span>
    `;

    const radio = label.querySelector("input");
    radio.addEventListener("change", () => {
      selectedAnswer = radio.value;

      const allLabels = optionsContainer.querySelectorAll(".option-label");
      allLabels.forEach(lbl => lbl.classList.remove("selected"));
      label.classList.add("selected");

      submitAnswerBtn.disabled = false;
    });

    optionsContainer.appendChild(label);
  });
}

/* Submit Answer */
submitAnswerBtn.addEventListener("click", () => {
  if (!selectedAnswer) return;

  const quiz = quizData[selectedLevel][selectedTopic];
  const isCorrect = selectedAnswer === quiz.answer;
  score = isCorrect ? 1 : 0;

  showResult(isCorrect, quiz.answer);
});

/* Show Result */
function showResult(isCorrect, correctAnswer) {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  if (isCorrect) {
    resultIcon.textContent = "✅";
    resultTitle.textContent = "Correct Answer! 🎉";
    resultMessage.innerHTML = `
      Topic: <strong>${selectedTopic}</strong> • Your selected answer: <strong>${selectedAnswer}</strong>
    `;
  } else {
    resultIcon.textContent = "❌";
    resultTitle.textContent = "Wrong Answer";
    resultMessage.innerHTML = `
      Topic: <strong>${selectedTopic}</strong> • Your selected answer: <strong>${selectedAnswer}</strong>
      • Correct answer: <strong>${correctAnswer}</strong>
    `;
  }

  scoreValue.textContent = `${score} / 1`;
}

/* Back to Level */
backToLevelBtn.addEventListener("click", () => {
  topicSection.classList.add("hidden");
  levelSection.classList.remove("hidden");
  quizSection.classList.add("hidden");
  resultSection.classList.add("hidden");

  selectedLevel = "";
  selectedTopic = "";
  selectedAnswer = "";
  score = 0;
  submitLevelBtn.disabled = true;
  submitTopicBtn.disabled = true;

  levelCards.forEach(card => card.classList.remove("active"));
});

/* Change Topic */
changeTopicBtn.addEventListener("click", () => {
  quizSection.classList.add("hidden");
  topicSection.classList.remove("hidden");
  resultSection.classList.add("hidden");

  selectedAnswer = "";
});

/* Choose Another Topic */
chooseAnotherTopicBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  topicSection.classList.remove("hidden");
  quizSection.classList.add("hidden");

  selectedAnswer = "";
  score = 0;
});

/* Start Again */
startAgainBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  topicSection.classList.add("hidden");
  quizSection.classList.add("hidden");
  levelSection.classList.remove("hidden");

  selectedLevel = "";
  selectedTopic = "";
  selectedAnswer = "";
  score = 0;

  submitLevelBtn.disabled = true;
  submitTopicBtn.disabled = true;

  levelCards.forEach(card => card.classList.remove("active"));
});