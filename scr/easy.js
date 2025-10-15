const questions = [
    {
        question: "Kuka oli ensimmäinen suomalainen maailmanmestari?/HELPPO",
        answers: [
            { text: "Kimi Räikkönen", correct: false},
            { text: "Keke Rosberg", correct: true},
            { text: "Nico Rosberg", correct: false},
            { text: "Mika Häkkinen", correct: false},
        ]
    },
    {
        question: "Missä tallissa Lewis Hamilton EI ole kisannut?/HELPPO",
        answers: [
            { text: "Mercedes", correct: false},
            { text: "Mclaren", correct: false},
            { text: "Ferrari", correct: false},
            { text: "Williams", correct: true},
        ]

    },
        {
        question: "Kuka on viimeisin Ferrarilla maailmanmestaruuden voittanut kuski?/HELPPO",
        answers: [
            { text: "Fernando Alonso", correct: false},
            { text: "Sebastian Vettel", correct: false},
            { text: "Kimi Räikkönen", correct: true},
            { text: "Felipe Massa", correct: false},
        ]

    },
        {
        question: "Millä valtiolla on kaikista eniten osakilpailu voittoja?/HELPPO",
        answers: [
            { text: "Ranska", correct: false},
            { text: "Brasilia", correct: false},
            { text: "Saksa", correct: false},
            { text: "Iso-Britannia", correct: true},
        ]
    },
        {
        question: "Mikä on eniten peräkkäisiä maailmanmestaruuksia yhdellä kuskilla?/HELPPO",
        answers: [
            { text: "5", correct: true},
            { text: "7", correct: false},
            { text: "4", correct: false},
            { text: "8", correct: false},
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