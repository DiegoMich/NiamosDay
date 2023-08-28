//bind events
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOMContentLoaded")
    document.body.style.backgroundImage = "url('background_0.jpg')"
    document.getElementById("video-player").addEventListener("timeupdate", () => videoProgress())
})

// 
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
    document.body.style.backgroundImage = "url('background_1.jpg')";
    //play feliz cumple
    audio = document.getElementById("audio");
    audio.play();

    btnEnabled = false;
    document.getElementById("button-start").setAttribute("enabled", "false")
    document.getElementById("button-start").setAttribute("src", "btn_regalo_3.png")
    setTimeout(()=> {
        document.getElementById("button-start").setAttribute("src", "btn_regalo_2.png")
        setTimeout(()=> {
            document.getElementById("button-start").setAttribute("src", "btn_regalo_1.png")
            setTimeout(()=> {
                document.getElementById("button-start").setAttribute("src", "btn_regalo.png")
                btnEnabled = true;
            }, 2000)
        }, 2000)
    }, 3000)
}

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
    document.body.style.backgroundImage = "url('background_2.jpg')"
}

function videoProgress() {
    let time = document.getElementById("video-player").currentTime
    if (time >= 67.6) {
        startQuizz()
    }
}

function startQuizz() {
    console.log("startQuizz")

    //background
    document.body.style.backgroundImage = "url('background_3.jpg')"
    
    //musica
    audio = document.getElementById("audio");
    audio.src = "quizz.mp3"
    audio.volume = 0.4
    audio.play()

    //mostrar quizz
    document.getElementById("video-container").style.display = 'none'
    document.getElementById("quizz-container").style.display = 'block'
}