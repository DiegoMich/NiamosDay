// Pegar el JSON con las preguntas y respuestas completas actualizando la variable "quizz"
const questions_text =
    `[
    {
        "question": "Cuál es el punto debil del Profesor Fratachón?",
        "answers": [
            {
                "text": "No poder moverse con la minigun",
                "valid": false
            },
            {
                "text": "El goulash de chorizo a la pomarola",
                "valid": false
            },
            {
                "text": "Saltar de un techo a otro",
                "valid": true
            },
            {
                "text": "Las mordidas de Picon",
                "valid": false
            }
        ]
    },
    {
        "question": "Según el Profesor Magicón, para qué sirven las vidas? ",
        "answers": [
            {
                "text": "Las vidas son un recurso",
                "valid": true
            },
            {
                "text": "Sin vidas no vivimos",
                "valid": false
            },
            {
                "text": "Vivir es morir",
                "valid": false
            },
            {
                "text": "Para nada",
                "valid": false
            }
        ]
    },
    {
        "question": "Identifique el níspero",
        "answers": [
            {
                "text": "Eriobotrya japonica",
                "valid": true
            },
            {
                "text": "Apapapchak australis",
                "valid": false
            },
            {
                "text": "Ebonuecis wololonsis",
                "valid": false
            },
            {
                "text": "Eruca vesicaria",
                "valid": false
            }
        ]
    },
    {
        "question": "Si juego un game de padel al mejor de 3, cuántos sets tengo que ganar para ganar el match? ",
        "answers": [
            {
                "text": "3",
                "valid": false
            },
            {
                "text": "Como en el tenis",
                "valid": false
            },
            {
                "text": "No se juega a mejor de 3 en el World Padel Tour",
                "valid": false
            },
            {
                "text": "2",
                "valid": true
            }
        ]
    },
    {
        "question": "Está de novio el Profesor Cumpleañón?",
        "answers": [
            {
                "text": "No pero me metio los perros y el cepillo de dientes en el departamento",
                "valid": false
            },
            {
                "text": "No pero nos fuimos de vacaciones dos veces en menos de un año",
                "valid": false
            },
            {
                "text": "No porque todavia no me lo pidio",
                "valid": false
            },
            {
                "text": "Todas son correctas",
                "valid": true
            }
        ]
    },
    {
        "question": "Cuál de estos jugadores de futbol NO es negro?",
        "answers": [
            {
                "text": "Riquelme",
                "valid": false
            },
            {
                "text": "Chilavert",
                "valid": false
            },
            {
                "text": "Guly Lomer",
                "valid": true
            },
            {
                "text": "Maradona",
                "valid": false
            }
        ]
    },
    {
        "question": "Cuál es el equipo de King of Fighters del Profesor Programón?",
        "answers": [
            {
                "text": "King, Takuma, Iori",
                "valid": true
            },
            {
                "text": "Ryo, Robert, Takuma",
                "valid": false
            },
            {
                "text": "Chang, Choi, Cheong",
                "valid": false
            },
            {
                "text": "Nappa, Rey Chappa, Tao Pai Pai",
                "valid": false
            }
        ]
    },
    {
        "question": "Cuál de las siguientes actrices es la de MENOR estatura?",
        "answers": [
            {
                "text": "Mei Pang",
                "valid": false
            },
            {
                "text": "My Bad Reputation",
                "valid": false
            },
            {
                "text": "Little Tina",
                "valid": true
            },
            {
                "text": "Maria Riot",
                "valid": false
            }
        ]
    },
    {
        "question": "Cuál de los siguientes NO es un Castlevania?",
        "answers": [
            {
                "text": "Symphony of the Night",
                "valid": false
            },
            {
                "text": "Cadence of Darkness",
                "valid": true
            },
            {
                "text": "Harmony of Dissonance",
                "valid": false
            },
            {
                "text": "Lament of Innocence",
                "valid": false
            }
        ]
    },
    {
        "question": "Que materiales son necesarios para craftear balas de escopeta en el 7 Days to Die",
        "answers": [
            {
                "text": "Buckshot + Bullet casings + Gun powder",
                "valid": false
            },
            {
                "text": "Bullet casings + Bullet tips + Gun powder",
                "valid": false
            },
            {
                "text": "Bullet tips + Buckshot + Gun powder",
                "valid": false
            },
            {
                "text": "Buckshot + Gun powder + Paper",
                "valid": true
            }
        ]
    },
    {
        "question": "Cuál de las siguientes comidas del Valheim da el MAYOR bonus de HP?",
        "answers": [
            {
                "text": "Meat platter",
                "valid": false
            },
            {
                "text": "Lox meat pie",
                "valid": false
            },
            {
                "text": "Misthare supreme",
                "valid": true
            },
            {
                "text": "Serpent stew",
                "valid": false
            }
        ]
    },
    {
        "question": "Según la leyenda del Garracuerno Costero, a qué cosa le temen más que a nada los granjeros de Jamuraa?",
        "answers": [
            {
                "text": "Solfataras, incursores y garracuernos",
                "valid": false
            },
            {
                "text": "Sequias, inundaciones y garracuernos",
                "valid": true
            },
            {
                "text": "Sorpresas, intrusos y garracuernos",
                "valid": false
            },
            {
                "text": "El-Hajjâj",
                "valid": false
            }
        ]
    },
    {
        "question": "En cuál de los siguientes juegos sumamos más horas en conjunto entre los 4 profesorones?",
        "answers": [
            {
                "text": "Alien Swarm",
                "valid": false
            },
            {
                "text": "Deep Rock Galactic",
                "valid": true
            },
            {
                "text": "Valheim",
                "valid": false
            },
            {
                "text": "7 Days to Die",
                "valid": false
            }
        ]
    }
]`