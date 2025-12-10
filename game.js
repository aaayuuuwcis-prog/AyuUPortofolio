// ================= SOUND EFFECT =================
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");
const clickSound = new Audio("click.mp3");

// ================= DATA BANK SOAL PER MATERI =================
const questionsData = {
  matrix: [
    {
      question: "Hitung: [2 4] + [3 5]",
      choices: ["[5 9]", "[1 1]", "[6 2]"],
      answer: "[5 9]",
    },
    {
      question: "Determinant: | 3 2 ; 1 4 |",
      choices: ["10", "7", "5"],
      answer: "10",
    },
    {
      question: "Ordo matriks [2x3] berarti?",
      choices: ["2 baris 3 kolom", "3 baris 2 kolom", "2 baris 2 kolom"],
      answer: "2 baris 3 kolom",
    },
    {
      question: "Transpose dari [7 5] adalah",
      choices: ["[7;5]", "[5;7]", "[35]"],
      answer: "[7;5]",
    },
    {
      question: "Hasil 3 × [2 6] =",
      choices: ["[6 18]", "[3 9]", "[5 8]"],
      answer: "[6 18]",
    },
  ],

  sequence: [
    {
      question: "Un = 5n + 2, tentukan U3",
      choices: ["17", "25", "19"],
      answer: "17",
    },
    {
      question: "Deret 2, 4, 6, ... adalah ?",
      choices: ["Aritmatika", "Geometri", "Campuran"],
      answer: "Aritmatika",
    },
    {
      question: "Barisan geometri 3, 9, 27 memiliki rasio?",
      choices: ["2", "3", "4"],
      answer: "3",
    },
    {
      question: "U5 barisan aritmatika 1,4,7,10 =",
      choices: ["13", "16", "19"],
      answer: "13",
    },
    {
      question: "Jumlah 5 suku pertama deret 2,4,6,8,10 =",
      choices: ["20", "30", "40"],
      answer: "30",
    },
  ],

  bunga: [
    {
      question: "Rumus bunga majemuk adalah ...",
      choices: ["M = P(1+i)^n", "M = P+i", "M = Pn+i"],
      answer: "M = P(1+i)^n",
    },
    {
      question: "Anuitas digunakan untuk ...",
      choices: ["Cicilan", "Tukar barang", "Diskon"],
      answer: "Cicilan",
    },
    {
      question: "Bunga majemuk berarti bunga ...",
      choices: ["Tetap", "Berbunga kembali", "Berbagi"],
      answer: "Berbunga kembali",
    },
    {
      question: "Jika P=1.000.000, bunga 10%, tahun 1 =",
      choices: ["1.100.000", "1.010.000", "1.200.000"],
      answer: "1.100.000",
    },
    {
      question: "Bunga majemuk biasa digunakan pada ...",
      choices: ["Pinjaman bank", "Tebak angka", "Belanja harian"],
      answer: "Pinjaman bank",
    },
  ],

  procedure: [
    {
      question: "Procedure Text is used to ...",
      choices: ["Give instructions", "Tell stories", "Describe objects"],
      answer: "Give instructions",
    },
    {
      question: "First, Next, Then, Finally are called ...",
      choices: ["Connectors", "Nouns", "Pronouns"],
      answer: "Connectors",
    },
    {
      question: "Generic structure of procedure text?",
      choices: ["Goal, Materials, Steps", "Orientation, Event", "Title, Story"],
      answer: "Goal, Materials, Steps",
    },
    {
      question: "'Goal' means ...",
      choices: ["Tujuan", "Langkah", "Bahan"],
      answer: "Tujuan",
    },
    {
      question: "Example of procedure text?",
      choices: ["How to make fried rice", "My family", "My holiday"],
      answer: "How to make fried rice",
    },
  ],
};

// ================= GAME VARIABLES =================
let subjectSelected = "";
let currentLevel = "";
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let historyStack = [];

// ================= ELEMENTS =================
const subjectSelect = document.getElementById("subjectSelect");
const levelSelect = document.getElementById("levelSelect");
const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("game-area");
const questionBox = document.getElementById("question-box");
const choicesContainer = document.getElementById("choices");
const dropZone = document.getElementById("drop-zone");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const backQuestionBtn = document.getElementById("backQuestionBtn");
const subjectTitle = document.getElementById("subjectTitle");
const backHomeBtn = document.getElementById("backHomeBtn");
const navHome = document.getElementById("navHome");

// ================= START GAME =================
startBtn.addEventListener("click", () => {
  clickSound.play();

  subjectSelected = subjectSelect.value;
  currentLevel = levelSelect.value;

  questions = [...questionsData[subjectSelected]];

  if (currentLevel === "medium")
    questions.push(...questionsData[subjectSelected]);
  if (currentLevel === "hard")
    questions.push(
      ...questionsData[subjectSelected],
      ...questionsData[subjectSelected]
    );

  score = 0;
  currentQuestionIndex = 0;
  historyStack = [];
  scoreDisplay.textContent = score;

  document.getElementById("level-section").classList.add("hidden");
  document.getElementById("subject-section").classList.add("hidden");
  gameArea.classList.remove("hidden");

  subjectTitle.textContent =
    subjectSelect.options[subjectSelect.selectedIndex].text;

  loadQuestion();
});

// ================= LOAD QUESTION =================
function loadQuestion() {
  nextBtn.classList.add("hidden");
  feedback.textContent = "";
  dropZone.textContent = "Drop Here";

  const q = questions[currentQuestionIndex];
  questionBox.textContent = q.question;

  choicesContainer.innerHTML = "";
  q.choices.forEach((choice) => {
    const div = document.createElement("div");
    div.classList.add("choice");
    div.textContent = choice;
    div.setAttribute("draggable", true);

    div.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.textContent);
    });

    choicesContainer.appendChild(div);
  });
}

// ================= DRAG DROP =================
dropZone.addEventListener("dragover", (e) => e.preventDefault());
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const selected = e.dataTransfer.getData("text");
  dropZone.textContent = selected;
  checkAnswer(selected);
});

// ================= CHECK ANSWER =================
function checkAnswer(selected) {
  const correct = questions[currentQuestionIndex].answer;

  historyStack.push(currentQuestionIndex);

  if (selected === correct) {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    correctSound.play();
    score++;
    scoreDisplay.textContent = score;
  } else {
    feedback.textContent = "Wrong!";
    feedback.style.color = "red";
    wrongSound.play();
  }

  nextBtn.classList.remove("hidden");
}

// ================= NEXT QUESTION =================
function nextQuestion() {
  clickSound.play();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    feedback.textContent = "Game Completed!";
  }
}

// ================= BACK QUESTION =================
function backQuestion() {
  clickSound.play();

  if (historyStack.length > 0) {
    currentQuestionIndex = historyStack.pop();
    loadQuestion();
  } else {
    feedback.textContent = "Tidak ada soal sebelumnya!";
  }
}

// ================= BACK HOME =================
function goBackHome() {
  clickSound.play();
  window.location.href = "index.html";
}

backHomeBtn.addEventListener("click", goBackHome);
navHome.addEventListener("click", goBackHome);
