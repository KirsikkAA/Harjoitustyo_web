const questions = [
    {
        question: "Missä osakilpailussa jaettiin puolikkaat pistemäärät?",
        answers: [
            { text: "Venäjä 2020", correct: false},
            { text: "Hollanti 2021", correct: false},
            { text: "Belgia 2021", correct: true},
            { text: "Itävalta 2020", correct: false},
        ]
    },
        {
        question: "Mikä tallikaveri pari on kisannut eniten osakilpailuja yhdessä (104 kilpailua)?",
        answers: [
            { text: "Schumacher/Barrichello", correct: true},
            { text: "Häkkinen/Coulthard", correct: false},
            { text: "Hamilton/Bottas", correct: false},
            { text: "Verstappen/Perez", correct: false},
        ]
    },
        {
        question: "Kuinka monta naista on osallistunut osakilpailu viikonloppuun (mukaanlukien harjoitus)?",
        answers: [
            { text: "4", correct: false},
            { text: "8", correct: false},
            { text: "6", correct: true},
            { text: "2", correct: false},
        ]
    },
        {
        question: "Minä vuonna ensimmäinen sprintti kilpailu pidettiin?",
        answers: [
            { text: "2023", correct: false},
            { text: "2021", correct: true},
            { text: "2018", correct: false},
            { text: "2022", correct: false},
        ]
    },
        {
        question: "Kuka on voittanut eniten mestaruuksia eri talleilla?",
        answers: [
            { text: "Alain Prost", correct: false},
            { text: "Lewis Hamilton", correct: false},
            { text: "Nelson Piquet", correct: false},
            { text: "Juan Manuel Fangio", correct: true},
        ]
    },


];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerBtn");
const nextBtn = document.getElementById("nextBtn");

let currentQustionIndex = 0;
let score = 0;


function startQuiz(){
    currentQustionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Seuraava";
    backBtn.style.display = "none";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQustionIndex];
    let questionNo = currentQustionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function  resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Sait ${score}/${questions.length} oikein!`;
    nextBtn.innerHTML = "Pelaa uudestaan";
    nextBtn.style.display = "block";
    backBtn.style.display = "block";
}


function handleNextquestion(){
    currentQustionIndex++;
    if(currentQustionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQustionIndex < questions.length){
        handleNextquestion();
    } else {
        startQuiz();
    }
});

backBtn.addEventListener("click", () => {
    window.location.href = 'pelaa.html';
});

startQuiz();