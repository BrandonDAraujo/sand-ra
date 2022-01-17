import styled from "styled-components"
import "../css/picture.css"
import Confetti from 'react-confetti'
import { useState } from "react"

const Container = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26.354166666666668vw;
    height: 19.791666666666668vw;
    left: 36.822916666666664vw;
    top: 3.6458333333333335vw;
    overflow: hidden;
    box-shadow: 0.4166666666666667vw 0.4166666666666667vw 0.2604166666666667vw 0.20833333333333334vw rgba(0, 0, 0, 0.25);
    border-radius: 1.3020833333333333vw;
    user-select: none;
`
const Image = styled.img`
    position: absolute;
    height: 115%;
    width: 115%;
    object-fit: fill;
    `
const TomClicker = styled.div`
  height: 2.083333333333333vw;
  width: 2.083333333333333vw;
  position: absolute;
  top: 70%;
  left: 52%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;
`

const Picture = ({ image, clickedAway, setClickedAway }) => {
    const { innerWidth: width } = window;
    const [click, setClick] = useState(false)
    const [recycle, setRecycle] = useState(true)

    const finishedConfetti = () =>{
        setClick(false)
        setRecycle(true)
    }

    const handleClick = () => {
        setClick(true)
        setClickedAway(false)
        document.querySelector(".tomClicker").style.cursor = "default";
        setTimeout(() => { 
            setRecycle(false) 
        }, 2500)
    }
    if (image === 'https://i.tribune.com.pk/media/images/2146515-loki-1580294097/2146515-loki-1580294097.jpg') {
        return (
            <Container>
                    <Confetti className="confetti" run={click} recycle={recycle} onConfettiComplete={finishedConfetti} wind={0.01} numberOfPieces={500} gravity={0.25} height={width * (19.791666666666668 * 0.01)} width={width * (26.354166666666668 * 0.01)}/>
                    <TomClicker className="tomClicker" onClick={handleClick}></TomClicker>
                    {!clickedAway && <Image tom src="https://i.pinimg.com/originals/b4/3d/63/b43d633da6703a0e7fe20624c5d5fe2a.jpg"/>}
                    { clickedAway && <Image className="img" src={image} alt="" />}
                </Container>
        )
    } else {
        return (
            <Container>
                <Image className="img" src={image} alt="" />
            </Container>
        )
    }
}

export default Picture
