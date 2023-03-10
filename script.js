let kulinarik = [
    {
        "question": "Welches Gemüse ist der Hauptdarsteller eines an der Amalfi Küste bekannten italienischen Desserts in Verbindung mit dunkler Schokolade?",
        "answer_1": "Paprika",
        "answer_2": "Zucchini",
        "answer_3": "Aubergine",
        "answer_4": "Spinat",
        "right_answer": 3
    },
    {
        "question": "Für welches Sandwich ist die amerikanische Stadt Philadelphia über ihre Grenzen hinaus weltweit bekannt?",
        "answer_1": "Cheesesteak Sandwich",
        "answer_2": "Pastrami Sandwich",
        "answer_3": "Club Sandwich",
        "answer_4": "Italian Beef Sandwich",
        "right_answer": 1
    },
    {
        "question": "Ein Ausflug nach Schottland: Wie nennt man den mit Herz, Leber, Lunge, Nierenfett vom Schaf, Zwiebeln und Hafermehl gefüllten Schafsmagen?",
        "answer_1": "Saumagen",
        "answer_2": "Porridge",
        "answer_3": "Baps",
        "answer_4": "Haggis",
        "right_answer": 4
    },
    {
        "question": "Kimchi gilt als Superfood der koreanischen Küche. Auch bei uns in Europa ist es sehr beliebt. Was ist Kimchi?",
        "answer_1": "Gegorener Fisch",
        "answer_2": "Gebratener Seidentofu",
        "answer_3": "Gegorenes Gemüse",
        "answer_4": "Fermentierte Sprossen",
        "right_answer": 3
    },
    {
        "question": "Pommes frites, Cheese curds darauf, mit Bratensauce übergiessen - fertig ist ein beliebtes Fastfood-Gericht Kanadas? Wie heisst es?",
        "answer_1": "Trumpone",
        "answer_2": "Poutine",
        "answer_3": "Chipotle",
        "answer_4": "Pastore",
        "right_answer": 2
    },
]

let currentQuestion = 0;
let rightQuestions = 0;
let number = 1;



// Wechselt vom Start-Design auf das Fragen-Desing und generiert die erste Frage //
function startQuiz() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    changeInnerContent();
    content.innerHTML += startQuizHTML();
    showQuestion();
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


// Zeigt die Fragen aus unserem JSON in unserem Quiz an. Zusätzlich aktualisiert sich die Progress-Bar //
function showQuestion() {
    let question = kulinarik[currentQuestion];
    let percent = number / kulinarik.length;
    percent = percent * 100;

    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;

    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('answer-1').innerHTML = question['answer_1'];
    document.getElementById('answer-2').innerHTML = question['answer_2'];
    document.getElementById('answer-3').innerHTML = question['answer_3'];
    document.getElementById('answer-4').innerHTML = question['answer_4'];
}


// Unterscheidet richtige und falsche Antwort und markiert dementsprechend farblich //
function answer(selection) {
    let question = kulinarik[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).classList.add('bg-lightgreen');
        rightQuestions++;
    } else {
        document.getElementById(selection).classList.add('bg-lightred');
        document.getElementById(idOfRightAnswer).classList.add('bg-lightgreen');
    }
}


// Zeigt bei onclick auf die Pfeile die voherige oder nächste Frage an //
function nextQuestion() {
    if (currentQuestion >= 4) {
        showEndScreen();
    } else {
        currentQuestion++;
        number++;
        document.getElementById('question-number').innerHTML = `${number}`;
        showQuestion();
    }
    resetAnswerButtons();
}


function previousQuestion() {
    if (currentQuestion == 0) {
        return false
    } else {
        currentQuestion--;
        number--;
        document.getElementById('question-number').innerHTML = `${number}`;
        showQuestion();
    }
    resetAnswerButtons();
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
    hideArrow.classList.add("hide");
    endResult();
}


function endScreenHTML() {
    return  /*html*/`
    <div class="end-screen">
        <img class="brain-img" src="img/brain result.png">
        <span class="endScreen-text">Herzlichen Glückwunsch! Du hast das Quiz abgeschlossen!</span>
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
    window.location.href = 'index.html';
}