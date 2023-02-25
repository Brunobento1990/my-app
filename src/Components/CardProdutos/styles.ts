import styled from "styled-components";

export const Container = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
    margin: 1rem;

    .containerButton{
        display: flex;
        gap: 5px;
        width: 10rem;
    }

    .first{
        width: 45%;
        height: 100%;
        width: 45%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            height: 60px;
            width: 100px;
        }
    }
    .second{
        width: 55%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-items: center;
        flex-direction: column;
        margin-top: 1rem;
        gap: 12px;
        font-size: 12px;
        font-weight: 600;
        color: #20202087;
    }

`