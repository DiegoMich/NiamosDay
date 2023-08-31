// VERSION
const version = "3.5"

// preguntas + index de la pregunta actual para la quizz
let questions = null
let currentQuestion = 0
let canAnswer = true
let lifeCounter = 3
let threatened = false
let startedQuizz = false
let resumedQuizz = false
let chestsOpened = []

//bind events
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("Version: ", version)
    console.log("DOMContentLoaded")
    document.body.style.backgroundImage = "url('img/background_0.jpg')"
    document.getElementById("video-player").addEventListener("timeupdate", () => videoProgress())
    document.getElementById("chest1").addEventListener("click", () => chestClick(1))
    document.getElementById("chest2").addEventListener("click", () => chestClick(2))
    document.getElementById("chest3").addEventListener("click", () => chestClick(3))

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
    blur()
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

    document.getElementsByTagName("title")[0].innerText = "Happy Birthday...? 😈"
    blur()

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
    // primera transision -> quizz
    if (time >= 67.6 && !startedQuizz) {
        startQuizz()
    }

    // segunda transision -> ultima vida
    if (time >= 28.4 && lifeCounter == 1 && !resumedQuizz) {
        resumeQuizz()
    }

    // tercera transición -> voucher
    if (time > 55 && chestsOpened.length > 1) {
        location.href = "media/voucher.pdf"
    }
}

// Cambia a la pantalla de preguntas
function startQuizz() {
    console.log("startQuizz")

    //evitar evento duplicado
    startedQuizz = true

    blur()
    //background
    document.body.style.backgroundImage = "url('img/animated-fight-background.gif')" //"url('img/background_3.jpg')"
    
    //mostrar quizz
    document.getElementById("video-container").style.display = 'none'
    document.getElementById("quizz-container").style.display = 'block'
    document.getElementById("life-container").style.display = 'block'

    //musica
    audio = document.getElementById("audio");
    audio.src = "media/quizz.mp3"
    audio.volume = 0.5
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

    for(let i = 1; i <= 4; i++) {
        let button = document.getElementById(`quizz-a${i}`)
        enable ? button.classList.remove("inactive") : button.classList.add("inactive")
    }
}

// Carga la siguiente pregunta en pantalla
function loadNextQuestion() {
    console.log("loadNextQuestion - ", currentQuestion+1)

    // LOSS
    if (lifeCounter === 0) {
        death()
        return
    }

    //WIN
    if (currentQuestion === 5) {
        win()
        return
    }

    //LAST LIFE: THREAT
    if (lifeCounter === 1 && !threatened) {
        threatened = true
        showThreatVideo()
        return //test remove
    }

    //Reactiva answer buttons
    toggleButtons(true);

    //Carga pregunta actual
    q = questions[currentQuestion]
    document.getElementById("quizz-title").innerText = `Pregunta ${currentQuestion+1} de 5`
    document.getElementById("quizz-question").innerText = q.question
    
    //Flash ultima pregunta
    if (currentQuestion == 4) {
        document.getElementById("quizz-title").style.animationName = 'flash'
        playSound('final_round')
    }

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

// blur para tarnsicion entre escenas
function blur() {
    document.getElementsByTagName('html')[0].style.animationName = 'blur'
    setTimeout(()=> {
        document.getElementsByTagName('html')[0].style.animationName = 'null'
    }, 1000)
}

// muestra el video de la amenaza, y retoma el juego
function showThreatVideo() {
    console.log('showThreatVideo')

    // stop music
    audio = document.getElementById("audio");
    audio.volume = 0;

    // hide quizz
    document.getElementById("quizz-container").style.display = 'none'

    // show video
    document.getElementById("video-container").style.display = 'block'
    document.getElementById("video-container").style.zIndex = 1
    document.getElementsByTagName('source')[0].src = 'media/threat.mp4'
    document.getElementById("video-player").load()
}

function resumeQuizz() {
    //evitar evento duplicado
    resumedQuizz = true

    //prender musica
    audio = document.getElementById("audio");
    audio.volume = 0.5;

    //ocultar el video
    document.getElementById("video-container").style.display = 'none'

    loadNextQuestion()

    //mostrar quizz
    document.getElementById("quizz-container").style.display = 'block'
}

// Lose game, show death video and restart button
function death() {
    // stop music
    audio = document.getElementById("audio");
    audio.volume = 0

    //show death screen
    document.getElementById("quizz-container").style.display = 'none'
    document.getElementById("life-container").style.display = 'none'
    document.body.style.backgroundImage = "url('img/background_5.png')"

    blur()

    //show video
    document.getElementById("video-container").style.display = 'block'
    document.getElementsByTagName('source')[0].src = 'media/death.mp4'
    document.getElementById("video-player").load()

    //restart button
    document.getElementById("button-restart").style.display = 'block'
}

// Win game, show prizes selection
function win() {
    //background
    document.body.style.backgroundImage = "url('img/background_4.jpg')"
    document.getElementById("quizz-container").style.display = 'none'
    document.getElementById("life-container").style.display = 'none'

    //chests
    document.getElementById("prizes").style.display = 'block'

    blur()

    //musica
    audio = document.getElementById("audio");
    audio.src = "media/win.mp3"
    audio.volume = 1
    audio.play()

    //win message
    document.getElementById("win-title").style.display = "block"
}


function chestClick(id) {
    console.log("Chest click: ", id)
    let chest = document.getElementById(`chest${id}`)
    
    // Already clicked
    if (chestsOpened.includes(id)) {
        return
    }

    chestsOpened.push(id)

    // Empty chests
    if (chestsOpened.length < 3) {
        chest.src = "img/chest_open_empty.png"
        playSound('empty_chest')
        return
    }

    // Prize
    chest.src = "img/chest_open_prize.png"
    audio = document.getElementById("audio");
    audio.volume = 0
    playSound('chest_prize')

    // Video
    document.getElementsByTagName('source')[0].src = 'media/win.mp4'
    setTimeout(()=> {
        document.getElementById("prizes").style.display = 'none'
        document.getElementById("video-container").style.display = 'block'
        document.getElementById("video-player").load()
        document.getElementById("video-player").requestFullscreen()
    }, 3000)
}