//fuente https://es.wikipedia.org/wiki/Magic_8-Ball
const respuestas = [
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

function responder(pregunta){
    const respuestaDiv = document.getElementById('respuesta')
    //v1 random
    //Vaciamos la respuesta
    if (respuestaDiv.children[0]) {
      respuestaDiv.children[0].remove()
    }
    let num = Math.floor(Math.random() * respuestas.length);
    console.log('Numero random ', num);
    //Llamamos al método que genera un string con la respuesta
    const elemento = respuestaTemplate(pregunta, respuestas[num]);
    //Llamamos al método que lo convierte a elemento
    const respuesta = createTemplate(elemento)
    //Lo llevamos al html
    respuestaDiv.append(respuesta)
}
