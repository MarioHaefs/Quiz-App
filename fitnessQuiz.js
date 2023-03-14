function startFitnessQuiz() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    changeInnerContent();
    content.innerHTML += startFitnessQuizHTML();
    showFitnessQuestion();

    let hideArrow = document.getElementById('arrows')
    hideArrow.classList.add("hide");
    let showArrow = document.getElementById('fitness-arrows')
    showArrow.classList.remove('hide');
}


function startFitnessQuizHTML() {
    return /*html*/ `
    <div class="question-card">
        <h5 id="question-text"></h5>
         <div onclick="fitnessAnswer('answer_1')" id="answer_1" class="abcd">
            <span id="A" class="letter-box">A</span>
            <span id="answer-1" class="answer"></span>
        </div>
         <div onclick="fitnessAnswer('answer_2')" id="answer_2" class="abcd">
            <span id="B" class="letter-box">B</span>
            <span id="answer-2" class="answer"></span>
        </div>
         <div onclick="fitnessAnswer('answer_3')" id="answer_3" class="abcd">
            <span id="C" class="letter-box">C</span>
            <span id="answer-3" class="answer"></span>
        </div>
         <div onclick="fitnessAnswer('answer_4')" id="answer_4" class="abcd">
            <span id="D" class="letter-box">D</span>
            <span id="answer-4" class="answer"></span>
        </div>  
        <span>Du hast <b id="question-number">${number}</b> von <b>${fitness.length}</b> Fragen beantwortet.</span>
        <div class="progress">
            <div id="progress-bar" class="progress-bar" role="progressbar" style="width: 20%;" aria-valuenow="25">25%</div>
        </div>
    </div>
    <div id="fitness-arrows" class="left-right-arrow hide">
        <img id="fitness-arrow" onclick="nextFitnessQuestion()" class="arrow-hover" src="img/pfeil-rechts.png" >
    </div>
    `;
}


function showFitnessQuestion() {
    let question = fitness[currentQuestion];
    
    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('answer-1').innerHTML = question['answer_1'];
    document.getElementById('answer-2').innerHTML = question['answer_2'];
    document.getElementById('answer-3').innerHTML = question['answer_3'];
    document.getElementById('answer-4').innerHTML = question['answer_4'];

    document.getElementById('fitness-arrow').style = 'pointer-events:none;';
    updateProgressBar();
}


function fitnessAnswer(selection) {
    let question = fitness[currentQuestion];
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
    document.getElementById('fitness-arrow').style = 'pointer-events:auto;';
}


function nextFitnessQuestion() {
    if (currentQuestion >= 4) {
        showEndScreen();
    } else {
        currentQuestion++;
        number++;
        document.getElementById('question-number').innerHTML = `${number}`;
        showFitnessQuestion();
    }
    resetAnswerButtons();
    enablePointerEvents();
}
