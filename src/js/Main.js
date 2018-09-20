//fuente https://es.wikipedia.org/wiki/Magic_8-Ball
const respuestas = [
    'Probablemente',
    'Sin duda',
    'Sí',
    'Será mejor que no te lo diga ahora',
    'Debes confiar en ello',
    'Pregunta en otro momento',
    'No cuentes con ello',
    'no',
    'Mis fuentes me dicen que no',
    'Muy dudoso'
];

let resultVoice = '';
let record = false;

window.onload = () => {
    console.log('Inicializando')
    initVoice();
}

function initVoice(){
    if (SPEECH.isCapable()) {

        SPEECH.onResult(function(result) {
            // result.transcript is the object built by the speech recognition engine.
            console.log('Entendi ' ,result.transcript);

            resultVoice = result.transcript;
        });

        SPEECH.onStart(function() {
            // fires once browser recognition has started
            console.log('Grabando');
        });
    }else{
        console.log('Solo texto mode')
        onlyTextMode();
    }
}

function onlyTextMode(){
    document.getElementById('start').style.display = 'none';
    textMode(true);
}
//Activa el modo por escritura
function textMode(setTo){
    if(setTo){
        //mostramos el metodo
        document.getElementById('textMode').style.display = 'block';
    }else{
        //ocultamos el metodo
        document.getElementById('textMode').style.display = 'none';
    }
}

function startVoice(){
    textMode(false);
    clearRespuesta();

    document.getElementById('microBtn').classList.add('active');
    document.getElementById('msg').innerHTML = 'Escuchando...';

    if (SPEECH.isCapable()) {
        SPEECH.start({
            min_confidence: .3,
            lang: 'es-ES' 
        });  
    }
}

function stopVoice(){
    //console.log('Paramos');
    document.getElementById('msg').innerHTML = '';
    document.getElementById('microBtn').classList.remove('active');

    SPEECH.stop();

    if(resultVoice != ''){
        responder(resultVoice);
    }
    
}

function toogleAudioInput(){
    if(record){
        //Activo => desactivar
        stopVoice();
        record = false;
    }else{
        //Desactivado => activar
        startVoice();
        record = true;
    }
}

function getPregunta(){
    //Obtenemos pregunta
    let inElem = document.getElementById('inputPregunta');
    let preg = inElem.value;

    //Ejecutar cuando hay pregunta
    if((preg != "")){
        responder(inElem.value);
    }

}

function respuestaTemplate(pregunta, respuesta) {
  return (
   `<div><p>Tu pregunta fue: ${pregunta}</p><br>
    <p>Mi respuesta es: ${respuesta}</p></div>`)
}

function createTemplate(str) {
  const html = document.implementation.createHTMLDocument();
  html.body.innerHTML = str;
  return html.body.children[0]
}

function clearRespuesta(){
    const respuestaDiv = document.getElementById('respuesta');
    //Vaciamos la respuesta
    if (respuestaDiv.children[0]) {
        respuestaDiv.children[0].remove()
      }
}

function responder(pregunta){
    const respuestaDiv = document.getElementById('respuesta');
    clearRespuesta();

        //v1 random
    let num = Math.floor(Math.random() * respuestas.length);
    console.log('Numero random ', num);
        //Llamamos al método que genera un string con la respuesta
    const elemento = respuestaTemplate(pregunta, respuestas[num]);
        //Llamamos al método que lo convierte a elemento
    const respuesta = createTemplate(elemento)
        //Lo llevamos al html
    respuestaDiv.append(respuesta)
}
