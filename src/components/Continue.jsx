import styled from "styled-components"
import { ArrowForwardIos } from "@mui/icons-material"

const Container = styled.div`
    display: flex;
    position: relative;
    height: 2.6041666666666665vw;
    width: 2.6041666666666665vw;
    border-radius: 50%;
    background-color: #151B28;
    box-shadow: 0px 0.20833333333333334vw 0.20833333333333334vw rgba(0, 0, 0, 0.25);
    grid-column: 1/-1;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 250ms ease-out;
    top: 75%;
    &:hover{
        box-shadow: 0px 0px 0.20833333333333334vw 0.052083333333333336vw cyan;
    }
`

const Continue = ({handleContinue}) => {
    return (
        <Container onClick={handleContinue}>
            <ArrowForwardIos sx={{color: '#1A202C', fontSize: '1.9791666666666665vw'}}/>
        </Container>
    )
}

export default Continue
