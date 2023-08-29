// Pegar el JSON con las preguntas y respuestas completas actualizando la variable "quizz"
const questions_text =
    `[
        {
            "question": "Cual es el punto debil del Profesor Fratachon?",
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
            "question": "Segun el Profesor Magicon, para que sirven las vidas? ",
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
            "question": "Identifique el nispero",
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
            "question": "Si juego un game de padel al mejor de 3, cuantos sets tengo que ganar para ganar el match?",
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
            "question": "Esta de novio el Profesor Cumpleañon?",
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
            "question": "Cual de estos jugadores de futbol no es negro?",
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
            "question": "Cual es el equipo de King of Fighters del Profesor Programon?",
            "answers": [
                {
                    "text": "King, Takuma, Iori",
                    "valid": true
                },
                {
                    "text": "Massa, Bullrich, Milei",
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
        }
    ]`