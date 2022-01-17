import styled from "styled-components"
import Answer from "./Answer"
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

const randomizeArray = oldArr =>{
    let arr = [...oldArr]
    let currentIndex = arr.length
    let randomIndex
    while(currentIndex !== 0){
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex --;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
    }
    return [...arr]
  }

const AnswerContainerB = ({setAnswerB, data, tempAnswers}) => {
    const [randomizedAnswer, setRandomedAnswers] = useState()
    useEffect(() => {
        setRandomedAnswers(randomizeArray(tempAnswers))
    }, [tempAnswers])
    const handleClick = (e, type) =>{
        document.querySelectorAll(".highlightB").forEach(e => (e.classList.remove("highlightB")))
        e.target.classList.add("highlightB")
        setAnswerB(randomizedAnswer[type])
    }
    if(randomizedAnswer){
        return(
        <Container>
            <AnswerContainer onClick={(e) => {handleClick(e, 0)}}>
            <Answer option={randomizedAnswer[0]} type={"movie"}/>
            </AnswerContainer>
            <AnswerContainer onClick={(e) => {handleClick(e, 1)}}>
            <Answer option={randomizedAnswer[1]} type={"movie"}/>
            </AnswerContainer>
            <AnswerContainer onClick={(e) => {handleClick(e, 2)}}>
            <Answer option={randomizedAnswer[2]} type={"movie"}/>
            </AnswerContainer>
        </Container>
            
        )
    }
    return (
        <></>
    )
}

export default AnswerContainerB