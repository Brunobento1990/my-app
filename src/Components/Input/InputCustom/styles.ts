import styled from "styled-components";

export const Container = styled.div`

    background-color: #d5cfcf36;
    width: 90%;
    border-radius: 10px;
    height:4rem;
    display: flex;
    justify-content: left;
    flex-direction: column;
    margin:.5rem;
    
    label{
        font-family: 'Courier New', Courier, monospace;
        font-weight: 600;
        width: 90%;
        height: 1rem;
        margin-left: 1rem;
        margin-top: .5rem;
    }

    input{
        border: none;
        width: 90%;
        height: 2rem;
        margin-left: .8rem;
        background-color: #d5cfcf00;
    }
    input:focus{
        outline:none;
    }
`