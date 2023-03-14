let currentQuestion = 0;
let rightQuestions = 0;
let number = 1;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');



// Wechselt vom Start-Design auf das Fragen-Desing und generiert die erste Frage //
function startQuiz() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    changeInnerContent();
    content.innerHTML += startQuizHTML();
    showKulinarikQuestion();
}


function startQuizHTML() {
    return /*html*/ `
    <div class="question-card">
        <h5 id="question-text"></h5>
         <div onclick="answer('answer_1')" id="answer_1" class="abcd">
            <span id="A" class="letter-box">A</span>
            <span id="answer-1" class="answer"></span>
        </div>
         <div onclick="answer('answer_2')" id="answer_2" class="abcd">
            <span id="B" class="letter-box">B</span>
            <span id="answer-2" class="answer"></span>
        </div>
         <div onclick="answer('answer_3')" id="answer_3" class="abcd">
            <span id="C" class="letter-box">C</span>
            <span id="answer-3" class="answer"></span>
        </div>
         <div onclick="answer('answer_4')" id="answer_4" class="abcd">
            <span id="D" class="letter-box">D</span>
            <span id="answer-4" class="answer"></span>
        </div>  
        <span>Du hast <b id="question-number">${number}</b> von <b>${kulinarik.length}</b> Fragen beantwortet.</span>
        <div class="progress">
            <div id="progress-bar" class="progress-bar" role="progressbar" style="width: 20%;" aria-valuenow="25">25%</div>
        </div>
    </div>
    `;
}


// Ändert das Start-Design auf das Fragen-Desing //
function changeInnerContent() {
    let backgroundImg = document.getElementById('content');
    let showArrow = document.getElementById('arrows')

    backgroundImg.classList.remove("background-img");
    showArrow.classList.remove("hide");
    backgroundImg.classList.add('background-alice')
}


// Zeigt die Fragen aus unserem JSON "kulinarik" in unserem Quiz an //
function showKulinarikQuestion() {
    let question = kulinarik[currentQuestion];
    
    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('answer-1').innerHTML = question['answer_1'];
    document.getElementById('answer-2').innerHTML = question['answer_2'];
    document.getElementById('answer-3').innerHTML = question['answer_3'];
    document.getElementById('answer-4').innerHTML = question['answer_4'];

    document.getElementById('arrow-right').style = 'pointer-events:none;';
    updateProgressBar();
}



// Updatet bei jeder beantworteten Frage die Progress Bar um in diesem Fall 20% //
function updateProgressBar() {
    let percent = number / kulinarik.length;
    percent = percent * 100;

    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}


// Unterscheidet richtige und falsche Antwort, markiert dementsprechend farblich und spielt einen jeweiligen Sound ab //
function answer(selection) {
    let question = kulinarik[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).classList.add('bg-lightgreen');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).classList.add('bg-lightred');
        document.getElementById(idOfRightAnswer).classList.add('bg-lightgreen');
        AUDIO_FAIL.play();
    }
    disablePointerEvents();
    document.getElementById('arrow-right').style = 'pointer-events:auto;';
}



// Disablen und Enablen die Antwort Buttons, wenn man eine Antwort gegeben hat. Damit man nicht x mal auf die Antworten klicken kann //
function disablePointerEvents() {
    document.getElementById('answer_1').style = 'pointer-events:none;';
    document.getElementById('answer_2').style = 'pointer-events:none;';
    document.getElementById('answer_3').style = 'pointer-events:none;';
    document.getElementById('answer_4').style = 'pointer-events:none;';
}


function enablePointerEvents() {
    document.getElementById('answer_1').style = 'pointer-events:auto;';
    document.getElementById('answer_2').style = 'pointer-events:auto;';
    document.getElementById('answer_3').style = 'pointer-events:auto;';
    document.getElementById('answer_4').style = 'pointer-events:auto;';
}


// Zeigt bei onclick auf den Pfeil die nächste Frage an //
function nextQuestion() {
    if (currentQuestion >= 4) {
        showEndScreen();
    } else {
        currentQuestion++;
        number++;
        document.getElementById('question-number').innerHTML = `${number}`;
        showKulinarikQuestion();
    }
    resetAnswerButtons();
    enablePointerEvents();
}


// Resettet die Antwort Buttons //
function resetAnswerButtons() {
    document.getElementById('answer_1').classList.remove('bg-lightred');
    document.getElementById('answer_1').classList.remove('bg-lightgreen');
    document.getElementById('answer_2').classList.remove('bg-lightred');
    document.getElementById('answer_2').classList.remove('bg-lightgreen');
    document.getElementById('answer_3').classList.remove('bg-lightred');
    document.getElementById('answer_3').classList.remove('bg-lightgreen');
    document.getElementById('answer_4').classList.remove('bg-lightred');
    document.getElementById('answer_4').classList.remove('bg-lightgreen');
}


// Zeigt den End-Screen an, wenn das Quiz vorbei ist //
function showEndScreen() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    changeInnerContent();
    content.innerHTML += endScreenHTML();
    
    let hideArrow = document.getElementById('arrows')
    let showTrophy = document.getElementById('trophy')
    hideArrow.classList.add("hide");
    showTrophy.classList.remove('hide');

    endResult();
}


function endScreenHTML() {
    return  /*html*/`
    <div class="end-screen">
        <img class="brain-img" src="img/brain result.png">
        <span class="endScreen-text">Du hast das Quiz abgeschlossen!</span>
        <span class="endScreen-text"><p class="color-orangered">Dein Ergebnis:</p><p id="result"></p></span>
        <button type="button" class="btn btn-primary share-button">SHARE</button>
        <button onclick="replay()" class="replay-button" type="button">REPLAY</button>
    </div>
    `
}


// Zeigt das Endergebnis richtiger Antworten an //
function  endResult(){
    document.getElementById('result').innerHTML = rightQuestions+ "/" +kulinarik.length;
}


// Lädt das Quiz neu und du kannst nochmal spielen //
function replay() {
    let showTrophy = document.getElementById('trophy')
    showTrophy.classList.add('hide');
    currentQuestion = 0;
    rightQuestions = 0;
    number = 1;
    startQuiz();
}