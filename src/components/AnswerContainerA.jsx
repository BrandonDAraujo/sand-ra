import styled from "styled-components"
import Answer from "./Answer"
import '../css/AnswerContainerA.css'
import { useEffect, useState } from "react"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 26.666666666666668vw;
    height: 12.135416666666666vw;
    background: #151B28;
    box-shadow: inset 0px 0.20833333333333334vw 0.4166666666666667vw 0.15625vw rgba(0, 0, 0, 0.23);
    border-radius: 1.25vw;
    pointer-events: none;
`

const AnswerContainer = styled.div``

const randomizeArrayp = arr =>{
    let currentIndex = arr.length
    let randomIndex
    while(currentIndex !== 0){
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex --;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
    }
    // console.log(arr)
    return [...arr]
  }

const AnswerContainerA = ({setAnswerA, data, tempAnswersA}) => {
    const [randomizedAnswer, setRandomedAnswers] = useState()

    useEffect(() => {
        setRandomedAnswers(randomizeArrayp(tempAnswersA))
        // console.log(tempAnswersA)
    },[tempAnswersA])
    const handleClick = (e, type) =>{
        document.querySelectorAll(".highlightA").forEach(e => (e.classList.remove("highlightA")))
        e.target.classList.add("highlightA")
        // console.log(randomizedAnswer[type])
        setAnswerA(randomizedAnswer[type])

    }
    if(randomizedAnswer){
        return(
            <Container>
            <AnswerContainer onClick={(e)=>{handleClick(e, 0)}}>
            <Answer option={randomizedAnswer[0]} type={"actor"}/>
            </AnswerContainer>
            <AnswerContainer onClick={(e)=>{handleClick(e, 1)}}>
            <Answer option={randomizedAnswer[1]} type={"actor"}/>
            </AnswerContainer>
            <AnswerContainer onClick={(e)=>{handleClick(e, 2)}}>
            <Answer option={randomizedAnswer[2]} type={"actor"}/>
            </AnswerContainer>
        </Container>
        )
    }
    return (
        <></>
    )
}

export default AnswerContainerA