import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h3{
        margin-top:.5rem;
    }
    .containerRadio{
        label{
            font-family: 'Courier New', Courier, monospace;
            font-weight: 600;
            margin: .3rem;
        }
        input{
            margin-left: 1rem;
        }
        
        background-color: #d5cfcf36;
        width: 90%;
        border-radius: 10px;
        height:4rem;
        display: flex;
        flex-direction: column;
        
    }
`