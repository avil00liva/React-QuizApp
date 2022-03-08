import { useState, useEffect } from 'react'
import "./global.css"
import preguntas from "./questions"

function App() {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [puntuacion, setPuntuacion] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [tiempoRestante, setTiempoRestante] = useState(10)
  const [areDisabled, setAreDisabled] = useState(false)
  const [mix, setMix] = useState([])
  

  useEffect(()=>{
    const mezclar = preguntas
    .map((value)=>({ value, sort: Math.random()}))
    .sort((a,b)=> a.sort - b.sort)
    .map(({value}) => value)
    setMix(mezclar)
  },[])
  
  /*let unshuffled = ['hello', 'a', 't', 'q', 1, 2, 3, {cats: true}]

  let shuffled = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    console.log(shuffled);*/

  const handleAnswerSubmit = (isCorrect ,e)=>{
    //puntuación
    if(isCorrect){
      setPuntuacion(puntuacion + 1)
    }
    //añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect")
    //cambiar a la siguiente pregunta
    setTimeout(()=> {
      if(preguntaActual === preguntas.length - 1) {
        setIsFinished(true)
        setTiempoRestante(0)
      } else{
        setPreguntaActual(preguntaActual + 1)
        setTiempoRestante(10)
      }
    }, 600)

  }

  useEffect(()=>{
    const intervalo = setInterval(()=>{
      if(tiempoRestante > 0) {
        setTiempoRestante(tiempoRestante - 1)
      }
      if(tiempoRestante === 0) {
        setAreDisabled(true)
      }
    },1000)
    return () => clearInterval(intervalo)

  },[tiempoRestante])


  {/*  
  if(isFinished) return (
    <main className='app'>
      <div className="juego-terminado">
        <span>Obtuviste {puntuacion} de {preguntas.length}</span>
        <button onClick={()=> window.location.href="/"}>Volver a jugar</button>
      </div>
    </main>
  )



  return (
    <main className='app'>
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span>Pregunta {preguntaActual + 1} de</span> {preguntas.length}
          </div>
          <div className="titulo-pregunta">{mix[preguntaActual]?.titulo}</div>
          <div>{!areDisabled ? ( 
            <span className='tiempo-restante'>Tiempo restante: {tiempoRestante}</span>
            ) : (
              <button onClick={()=>{
                setTiempoRestante(10)
                setAreDisabled(false)
                setPreguntaActual(preguntaActual + 1)
              }}>Continuar</button>
            )}
          </div>
        </div>
        <div className='lado-derecho'>
          {mix[preguntaActual]?.opciones?.map((respuesta)=> (
            <button disabled={areDisabled} key={respuesta.textoRespuesta} onClick={(e)=> handleAnswerSubmit(respuesta.isCorrect, e)}>{respuesta.textoRespuesta}</button>
          ))}
        </div>
          </main>
  )
          */}



if(isFinished) return (
  <main className="container">
    <div className="game-over">
      <span>Obtuviste {puntuacion} de {preguntas.length}</span>
      <button onClick={()=> window.location.href="/"}>Volver a jugar</button>
    </div>
  </main>
)

return (
  <main className="container">
    <nav>{tiempoRestante}s ⏰</nav>
    <div className="preguntas">
      <h3>{mix[preguntaActual]?.titulo}</h3>
    </div>
    <span style={{textAlign: "center", fontSize: "1.2rem"}}>Pregunta {preguntaActual + 1} de {preguntas.length}</span>
    <div className="btnContainer">
      {!areDisabled ?
        <>
          {mix[preguntaActual]?.opciones?.map((respuesta)=> (
          <button disabled={areDisabled} key={respuesta.textoRespuesta} onClick={(e)=> handleAnswerSubmit(respuesta.isCorrect, e)}>
            {respuesta.textoRespuesta}
          </button>
          ))}
        </>
        :
        <button className='btnContinue' onClick={()=>{
          setTiempoRestante(10)
          setAreDisabled(false)
          setPreguntaActual(preguntaActual + 1)
        }}>Continuar</button>
      }
    </div>
  </main>
)
}

export default App
