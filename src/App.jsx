import styled from "styled-components";
import AnswerContainerA from "./components/AnswerContainerA";
import AnswerContainerB from "./components/AnswerContainerB";
import Picture from "./components/Picture";
import { useState, useEffect } from "react";
import Continue from "./components/Continue";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "./fb";
import './css/App.css'
import { v4 } from "uuid";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1A202C;
  position: relative;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 26.666666666666668vw 26.666666666666668vw;
  position: relative;
  column-gap: 4.270833333333333vw;
  width: 26.666666666666668vw;
  height: 12.135416666666666vw;
  left: 21.197916666666668vw;
  top: 31.25vw;
  justify-items: center;
`
const CounterContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 27.5vw;
  transform: translate(-50%, -50%);
`

const Counter = styled.h1`
  color: white;
  font-size: 3.125vw;
  user-select: none;
  &:before{
    position: absolute;
    content: 'Score: ';
    font-size: 1.0416666666666667vw;
    bottom: 0%;
    right: 100%;
    transform: translate(-30%, -50%)
  }
`

function App() {
  const [answerA, setAnswerA] = useState()
  const [answerB, setAnswerB] = useState()
  const [counter, setCounter] = useState(0)
  const [currentV4, setCurrentV4] = useState(v4())
  const [tempAnswers, setTempAnswers] = useState([])
  const [clickedAway, setClickedAway] = useState(true)

  const randomizeArray = arr => {
    let currentIndex = arr.length
    let randomIndex
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
    }
    return arr
  }

  const nextRound = data => {
    const filteredArr = data.filter(e => e.answer !== true)
    const randomIndex = Math.floor(Math.random() * filteredArr.length)
    const getAnswer = [filteredArr[randomIndex]]
    let getWrongAnswers = data.filter(e => (
      e.actor !== getAnswer[0].actor && e.movie !== getAnswer[0].movie && e.gender === getAnswer[0].gender 
    ))
    data[data.findIndex(e => e.id === getAnswer[0].id)].answer = true;
    //Fisher yates array random sort algorithm
    getAnswer.push(...randomizeArray(getWrongAnswers).slice(0, 1))
    getWrongAnswers = getWrongAnswers.filter(e => (
      e.actor !== getAnswer[1].actor && e.movie !== getAnswer[1].movie
    ))
    getAnswer.push(...randomizeArray(getWrongAnswers).slice(0, 1))
    for(let x=1; x<=2; x++){
      getAnswer[x].answer = false;
    }
    setTempAnswers(getAnswer)
  }
  
  const handleContinue = () => {
    if(answerA !== undefined && answerB !== undefined){
      document.querySelectorAll(".highlightA").forEach(e => {
        e.classList.remove("highlightA")
      })
      document.querySelectorAll(".highlightB").forEach(e => {
        e.classList.remove("highlightB")
      })
      setCurrentV4(v4())
      if (answerA.answer === true && answerB.answer === true) {
        setCounter(prev => prev + 1)
        document.querySelector(".count").classList.add("greenBlink")
        setTimeout(()=> {document.querySelector(".count").classList.remove("greenBlink")}, 501)
        nextRound(data)
      } else {
        setCounter(0)
        data.forEach(e =>{
          e.answer = false})
          document.querySelector(".count").classList.add("redBlink")
          setTimeout(()=> {document.querySelector(".count").classList.remove("redBlink")}, 501)
          nextRound(data)
        }
        setAnswerA()
        setAnswerB()
        setClickedAway(true)
      }
    }

  const [data, setData] = useState([])
  useEffect(() => {
    const q = query(collection(db, "movies"));
    const unsub = onSnapshot(q, (e) => {
      const arr = [];
      e.forEach(data => {
        arr.push(data.data())
      })
      setData(arr)
    })
    return () => {
      unsub()
    }
  }, []);


  useEffect(() => {
    if (data !== undefined) {
      if (data.length > 0) {
        nextRound(data)
      }
    }
  }, [data])
  if (tempAnswers.length > 0) {
    return (
      <Container>
        
        <Picture image={tempAnswers.filter(e => (e.answer === true))[0].image_URL} key={currentV4} clickedAway={clickedAway} setClickedAway={setClickedAway}/>
        <CounterContainer >
          <Counter className="count">
            {counter}
          </Counter>
        </CounterContainer>
        <Wrapper>
          <AnswerContainerA setAnswerA={setAnswerA} data={data} tempAnswersA={tempAnswers} randomizeArray={() => randomizeArray} />
          <AnswerContainerB setAnswerB={setAnswerB} data={data} tempAnswers={tempAnswers} randomizeArray={randomizeArray} />
          <Continue handleContinue={handleContinue} />
        </Wrapper>
      </Container>
    )
  }
  return (<></>)
}

export default App;
