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
        "question": "Für welches Sandwich ist die Stadt Philadelphia weltweit bekannt?",
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
        "question": "Kimchi gilt als Superfood der koreanischen Küche. Was ist Kimchi?",
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


// Zeigt die Fragen aus unserem JSON in unserem Quiz an //
function showQuestion() {
    let question = kulinarik[currentQuestion];

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
    } else {
        document.getElementById(selection).classList.add('bg-lightred');
        document.getElementById(idOfRightAnswer).classList.add('bg-lightgreen');
    }
}


// Zeigt bei onclick auf die Pfeile die voherige oder nächste Frage an //
function nextQuestion() {
    if (currentQuestion == 4) {
        return false
    } else {
        currentQuestion++;
        showQuestion();
    }
    resetAnswerButtons();
}


function previousQuestion() {
    if (currentQuestion == 0) {
        return false
    } else {
        currentQuestion--;
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