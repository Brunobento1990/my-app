import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: .5rem;
    flex-direction: row;
    
    .container-carrinho{
        a{
            width: 1rem;
        }
        display: flex;
    }
    
    .qtdCarrinho{
        width: 2rem;
        color: black;
        border-radius: 10px;
        background-color: #fdee10;
        font-size: 12px;
        height: 1rem;
        text-align: center;
    }
    img{
        width: 2rem;
        height: 2rem;
        border-radius:50%;
    }
`