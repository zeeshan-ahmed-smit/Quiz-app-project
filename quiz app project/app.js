const startBtn = document.getElementById('startBtn');
const popInfo = document.getElementById('popInfo');
const homePage = document.querySelector('.home');
const exitBtn = document.getElementById('exitBtn');
const mainDiv = document.getElementById('main');
const continueBtn = document.getElementById('continueBtn');
const quiz_sec = document.querySelector('.quiz-content');
const quiz_box = document.getElementById('quizBox');
const result_box = document.getElementById('resultBox');
const tryAgainBtn = document.querySelector('.tryagainBtn');
const backHomeBtn = document.querySelector('.backHomeBtn');
const container = document.getElementById('container');
const body = document.getElementById('body');
console.log(body)

let interval;

startBtn.addEventListener('click', function () {
    popInfo.classList.add('active');
    mainDiv.classList.add('active');
});

exitBtn.addEventListener('click', function () {
    popInfo.classList.remove('active');
    mainDiv.classList.remove('active');
});

function fullScreen() {
    var el = document.documentElement;
    if (el.requestFullscreen) {
        el.requestFullscreen();
    };
};

function exitfullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        console.log('Exit Fullscreen');
    };
};

continueBtn.addEventListener('click', function () {
    container.style.display = 'block';
    quiz_sec.classList.add('active');
    popInfo.classList.remove('active');
    mainDiv.classList.remove('active');
    mainDiv.classList.add('active1');
    homePage.classList.remove('active');
    quiz_box.classList.add('active');
    nextBtn.classList.add('active')
    body.classList.add('active');

    fullScreen();
    showQuestion(0);
    questionCounter(1);
    scoreQuestion();
    timerCount = 30;
    interval = setInterval(timerFun, 800);

});

tryAgainBtn.addEventListener('click', function () {
    quiz_box.classList.add('active');
    nextBtn.classList.remove('active');
    result_box.classList.remove('active');

    questionCount = 0;
    questionNum = 1;
    userScore = 0;

    showQuestion(questionCount);
    questionCounter(questionNum);
    interval = setInterval(timerFun, 800);
    scoreQuestion();
});


backHomeBtn.addEventListener('click', function () {
    mainDiv.classList.remove('active1');
    quiz_sec.classList.remove('active');
    nextBtn.classList.remove('active');
    result_box.classList.remove('active');
    body.classList.remove('active');
    container.style.display = 'none';

    questionCount = 0;
    questionNum = 1;
    userScore = 0;

    clearInterval(interval);
    showQuestion(questionCount);
    questionCounter(questionNum);
    scoreQuestion();
    exitfullscreen();
});




let questionCount = 0;
let questionNum = 1;
let userScore = 0;
let timerCount = 30;


const nextBtn = document.getElementById('nextBtn');
function callnextQuestion() {
    if (questionCount < questions.length - 1) {
        clearInterval(interval);
        timerCount = 30;
        interval = setInterval(timerFun, 800);
        questionCount++;
        questionNum++;
        showQuestion(questionCount);
        questionCounter(questionNum);
        nextBtn.classList.add('active');
    } else {
        showResultBox();
    };
};

// get question frpm arry and showing in option list ;

const optionList = document.querySelector('.option-list');

function showQuestion(index) {
    const QuestionText = document.querySelector('.question-text');
    QuestionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    // make quest option list visible and show in option list ;

    let optionsTag = `<div class="option">${questions[index].options[0]}</span></div>
                      <div class="option">${questions[index].options[1]}</span></div>
                      <div class="option">${questions[index].options[2]}</span></div>
                      <div class="option">${questions[index].options[3]}</span></div>
                     `;

    optionList.innerHTML = optionsTag;

    // set onclick attributes in options tag;
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    };
};

let questionScore = 0;
const scoreTag = document.querySelector('quiz-score');

// usser select option
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOption = optionList.children.length;
    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        nextBtn.classList.remove('active');
        userScore += 1;
        scoreQuestion();
        disabledQuestion();
        clearInterval(interval);
        timerCount = 30;
    } else {
        answer.classList.add('inCorrect');
        nextBtn.classList.remove('active');
        clearInterval(interval);
        timerCount = 30;
        // if user select incorrect value auto select correct answer;
        for (let i = 0; i < allOption; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
                disabledQuestion();
            };
        };
    };
}

// question counter 
function questionCounter(indes) {
    const QuestionTotle = document.querySelector('.question-totle');
    QuestionTotle.textContent = `${indes} of ${questions.length} Question`
}


// if user has selected , desible all the value;

function disabledQuestion() {
    let allOption = optionList.children.length;
    for (let i = 0; i < allOption; i++) {
        optionList.children[i].classList.add('disabled');
    }
}


// if user has selected the correct option plus score;
function scoreQuestion() {
    const scoreText = document.querySelector('.quiz-score');
    scoreText.textContent = `Score ${userScore} / ${questions.length}`
}

//timer function
const timer = document.querySelector('.time');

function timerFun() {
    timerCount--;
    timer.textContent = `Your Time: ${timerCount}s`
    if (timerCount <= 9) {
        timer.textContent = `Your Time: 0${timerCount}s`
    }
    if (timerCount == 0) {
        timerCount = 30;
        callnextQuestion();
    };
};


function showResultBox() {
    quiz_box.classList.remove('active');
    result_box.classList.add('active');

    let scoretext = document.querySelector('.score-text');
    scoretext.textContent = `Your Score:: ${userScore} Out of ${questions.length}`

    let circleProgresss = document.querySelector('.circular-progress');
    let progresssValue = document.querySelector('.progress-value');

    let progressStrtValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 10;

    let progress = setInterval(() => {
        progressStrtValue++;

        progresssValue.textContent = `${progressStrtValue}%`;
        circleProgresss.style.background = `conic-gradient(#0c0db0 ${progressStrtValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;
        if (progressStrtValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
};









