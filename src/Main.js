//fuente https://es.wikipedia.org/wiki/Magic_8-Ball
var respuestas = [
    'Probablemente',
    'Sin duda',
    'Sí',
    'Será mejor que no te lo diga ahora',
    'Debes confiar en ello',
    'Pregunta en otro momento',
    'No cuentes con ello',
    'Mi respuesta es no',
    'Mis fuentes me dicen que no',
    'Muy dudoso'
]

function getPregunta(){
    //Vaciamos respuesta
    let outElem = document.getElementById('outputRespuesta');
    outElem.innerHTML = "";

    //Obtenemos pregunta
    let inElem = document.getElementById('inputPregunta');
    let preg = inElem.value;

    //Ejecutar cuando hay pregunta
    if((preg != "")){
        responder(inElem.value);
    }
    
}

function responder(pregunta){
    let outElem = document.getElementById('outputRespuesta');

    //v1 random
    let num = Math.floor(Math.random() * 10);
    console.log('Numero random ', num);
    outElem.innerHTML = 'Me preguntaste ' + pregunta + ' <br> Te respondo:  ' + respuestas[num];
}