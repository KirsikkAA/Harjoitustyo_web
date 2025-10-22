const questions = [
    {
        question: "Missä osakilpailussa jaettiin puolikkaat pistemäärät?/VAIKEA",
        answers: [
            { text: "Venäjä 2020", correct: false},
            { text: "Hollanti 2021", correct: false},
            { text: "Belgia 2021", correct: true},
            { text: "Itävalta 2020", correct: false},
        ]
    },
    {
        question: "Which team Lewis Hamilton has not competed/VAIKEA",
        answers: [
            { text: "Mercedes", correct: false},
            { text: "Mclaren", correct: false},
            { text: "Ferrari", correct: false},
            { text: "Williams", correct: true},
        ]

    }

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
    //tää menee siinä pieleen, et jos aloitat uuden pelin backBtn on silti näkyvillä
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