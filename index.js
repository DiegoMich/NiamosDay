document.addEventListener("DOMContentLoaded", (event) => {
    return
});

// 
let btnEnabled = null;
function start() {
    //false -> disable clicks
    if (btnEnabled == false) {
        return;
    }

    //true -> siguiente etapa
    if (btnEnabled) {
        recibirRegalo()
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
    //apagar musica cumple
    audio = document.getElementById("audio");
    audio.volume = 0;
    
    //quitar el boton de start
    document.getElementById("button-container").setAttribute("hidden","true")
    
    //mostar el video
    document.getElementById("video-container").removeAttribute("hidden")
    
    //sacar el mute del video (async)
    setTimeout(()=> {
        document.getElementById("video-player").muted = false;
    },100)

    //cambiar background
    document.body.style.backgroundImage = "url('background_2.jpg')";
    //hack: refresh background
    document.getElementById('body').style.display = 'none';
    document.getElementById('body').style.display = 'block';
}