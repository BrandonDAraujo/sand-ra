import styled from "styled-components"

const P = styled.p`
    color: white;
    font-size: 1.5625vw;
    pointer-events: none;
    user-select: none;
    transition: all 250ms ease-out;
`

const Container = styled.div`
    width: 24.6875vw;
    height: 2.7083333333333335vw;
    margin: 0.78125vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1A202C;
    box-shadow: 0px 0.20833333333333334vw 0.20833333333333334vw rgba(0, 0, 0, 0.25);
    border-radius: 4.114583333333333vw;
    transition: all 250ms ease-out;
    pointer-events: initial;
    cursor: pointer;
    z-index: 2;

    &:hover{
        box-shadow: none;
        transform: scale(.95)
    }
`


const Answer = ({option, type}) => {
    return (
        <Container>
            <P>{type === "movie" ? option.movie : option.actor}</P>
            {/* <p>{option.answer === true ? "true" : "false"}</p> */}
        </Container>
    )
}

export default Answer
