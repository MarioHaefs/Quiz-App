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
         <div onclick="answer('answer_1')" class="abcd">
            <span class="letter-box">A</span>
            <span id="answer-1" class="answer"></span>
        </div>
         <div onclick="answer('answer_2')" class="abcd">
            <span class="letter-box">B</span>
            <span id="answer-2" class="answer"></span>
        </div>
         <div onclick="answer('answer_3')" class="abcd">
            <span class="letter-box">C</span>
            <span id="answer-3" class="answer"></span>
        </div>
         <div onclick="answer('answer_4')" class="abcd">
            <span class="letter-box">D</span>
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


function answer(selection) {
    let question = kulinarik[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);

    if(selectedQuestionNumber == question['right_answer']) {
        console.log('Richtige Antwort!')
    } else {
        console.log('Falsche Antwort!')
    }
    
}