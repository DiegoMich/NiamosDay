// VERSION
const version = "2.1"

// preguntas + index de la pregunta actual para la quizz
let questions = null
let currentQuestion = 0
let canAnswer = true
let lifeCounter = 3

//bind events
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("Version: ", version)
    console.log("DOMContentLoaded")
    document.body.style.backgroundImage = "url('img/background_0.jpg')"
    document.getElementById("video-player").addEventListener("timeupdate", () => videoProgress())
})

// Pantalla inicial
let btnEnabled = null
function start() {
    console.log("start - enabled:", btnEnabled)

    //false -> disable clicks
    if (btnEnabled == false) {
        return
    }

    //true -> siguiente etapa
    if (btnEnabled) {
        recibirRegalo()
        btnEnabled = false
        return
    }

    //null -> count down
    //cambiar background
    document.body.style.backgroundImage = "url('img/background_1.jpg')";
    //play feliz cumple
    audio = document.getElementById("audio");
    audio.play();

    btnEnabled = false;
    document.getElementById("button-start").setAttribute("enabled", "false")
    document.getElementById("button-start").setAttribute("src", "img/btn_regalo_3.png")
    setTimeout(()=> {
        document.getElementById("button-start").setAttribute("src", "img/btn_regalo_2.png")
        setTimeout(()=> {
            document.getElementById("button-start").setAttribute("src", "img/btn_regalo_1.png")
            setTimeout(()=> {
                document.getElementById("button-start").setAttribute("src", "img/btn_regalo.png")
                btnEnabled = true;
            }, 2000)
        }, 2000)
    }, 3000)
}

// Cambia a la pantalla del video
function recibirRegalo() {
    console.log("recibirRegalo")

    //apagar musica cumple
    audio = document.getElementById("audio");
    audio.volume = 0;
    
    //quitar el boton de start
    document.getElementById("button-container").setAttribute("hidden","true")
    
    //mostar el video
    document.getElementById("video-container").removeAttribute("hidden")
    
    //sacar el mute del video (async)
    setTimeout(()=> {
        document.getElementById("video-player").muted = false
    },100)

    //cambiar background
    document.body.style.backgroundImage = "url('img/background_2.jpg')"
}

// Timer para pasar a la pantalla de preguntas cuando termina el video
function videoProgress() {
    let time = document.getElementById("video-player").currentTime
    if (time >= 67.6) {
        startQuizz()
    }
}

// Cambia a la pantalla de preguntas
function startQuizz() {
    console.log("startQuizz")

    //background
    document.body.style.backgroundImage = "url('img/background_3.jpg')"
    
    //mostrar quizz
    document.getElementById("video-container").style.display = 'none'
    document.getElementById("quizz-container").style.display = 'block'
    document.getElementById("life-container").style.display = 'block'

    //musica
    audio = document.getElementById("audio");
    audio.src = "media/quizz.mp3"
    audio.volume = 0.8
    audio.play()
    
    //carga preguntas desde quizz.js
    questions = JSON.parse(questions_text)
    questions = shuffle(questions)

    //bind click respuestas
    for(let i = 1; i <= 4; i++) {
        let button = document.getElementById(`quizz-a${i}`)
        button.addEventListener("click", answer);
    }
    
    loadNextQuestion()
}


// Triggers after an answer is clicked
// Show result (button color)
// Remove life if wrong
// Load next question
function answer(e) {
    if (!canAnswer) {
        return
    }

    //Set result color on button, remove life if wrong
    let button = e.target
    let correct = button.getAttribute("valid") === "true"
    if (correct) {
        button.classList.remove("btn-outline-dark")
        button.classList.add("btn-success")
        playSound("right_answer")
    } else {
        button.classList.remove("btn-outline-dark")
        button.classList.add("btn-danger")
        lifeCounter--
        updateLife()
    }

    //Disable answer buttons
    toggleButtons(false);

    //Timer before loading next question and refresh buttons
    document.body.classList.add('waiting');
    setTimeout(()=> {
        button.classList.add("btn-outline-dark")
        button.classList.remove("btn-danger")
        button.classList.remove("btn-success")
        document.body.classList.remove('waiting');
        loadNextQuestion()
    }, 2000)
}

// Enables or disables answer buttons for quizz
function toggleButtons(enable){
    canAnswer = enable
}

// Carga la siguiente pregunta en pantalla
function loadNextQuestion() {
    // LOSS
    if (lifeCounter === 0) {
        // stop music
        audio = document.getElementById("audio");
        audio.volume = 0

        //die effect
        playSound("death")
        
        //show death screen
        document.getElementById("quizz-container").style.display = 'none'
        document.getElementById("life-container").style.display = 'none'
        document.body.style.backgroundImage = "url('img/background_5.jpg')"
        return
    }

    //WIN
    if (currentQuestion === 5) {
        //background
        document.body.style.backgroundImage = "url('img/background_4.jpg')"
        document.getElementById("quizz-container").style.display = 'none'
        document.getElementById("life-container").style.display = 'none'
        //musica
        audio = document.getElementById("audio");
        audio.src = "media/win.mp3"
        audio.volume = 1
        audio.play()
    }

    //Reactiva answer buttons
    toggleButtons(true);

    //Carga pregunta actual
    q = questions[currentQuestion]
    document.getElementById("quizz-title").innerText = `Pregunta ${currentQuestion+1} de 5`
    document.getElementById("quizz-question").innerText = q.question
    
    q.answers.forEach(function (a, i) {
        let button = document.getElementById(`quizz-a${i+1}`)
        button.innerText = a.text
        button.setAttribute("valid", a.valid)
    });
    
    currentQuestion++
}

// Randomiza el orden de las preguntas
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Update hearts displayed
function updateLife() {
    playSound("life_loss")
    document.getElementById("life-1").src = lifeCounter > 1 ? "img/heart_full.png" : "img/heart_empty.png"
    document.getElementById("life-2").src = lifeCounter > 2 ? "img/heart_full.png" : "img/heart_empty.png"
    document.getElementById("life-container").style.animationName = "shake"
    setTimeout(()=> {
        document.getElementById("life-container").style.animationName = "null"
    }, 1000)
}

function playSound(name) {
    audio = document.getElementById("fx");
    audio.src = `media/${name}.mp3`
    audio.volume = 1
    audio.play()
}