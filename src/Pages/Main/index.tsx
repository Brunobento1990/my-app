import { CardProdutos } from "../../Components/CardProdutos";
import { Container } from "./styles";
import { IProduto } from "../../Interfaces/IProduto";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import { useState, useEffect } from 'react'
import { GetAll, PostCarrinho } from "../../Service/api";
import { parseCookies } from "nookies";
import { ICarrinho } from "../../Interfaces/ICarrinho";

export function Main() {

    const [camaroes, setCamaroes] = useState([] as IProduto[])
    const [jigs, setJigs] = useState([] as IProduto[])
    const [carrinhos, setCarrinho] = useState({} as ICarrinho)
    // const cookies = parseCookies();
    // const user = JSON.parse(cookies['user']);
    // const token = cookies['token'];

    // useEffect(() => {

    //     async function init() {
    //         const request = await GetAll("/produto/lista");
    //         if (request.status) {
    //             setCamaroes(request.data.filter((x: { tipo: number; }) => x.tipo === 1))
    //             setJigs(request.data.filter((x: { tipo: number; }) => x.tipo === 2))
    //         }
    //     }

    //     async function carrinho() {
    //         if (token && user) {
    //             try {

    //                 const config = {
    //                     headers: {
    //                         'Authorization': "Bearer " + token,
    //                         'Content-Type': 'application/json'
    //                     }
    //                 };

    //                 const request = await PostCarrinho(`/carrinho/usuario/${user.id}`, carrinho, config);

    //                 if (request.status === 200) {
    //                     setCarrinho(request.data)
    //                 }

    //             } catch (error: any) {
    //                 console.log(error)
    //             }
    //         }
    //     }
    //     init()
    //     carrinho()
    // }, [])

    function AtualizaCarrinho(carrinhoParam: ICarrinho) {
        setCarrinho(carrinhoParam)
    }

    return (
        <>
            <Header carrinhoParam={carrinhos} />
            <Container>
                <CardProdutos
                    setCarrinhoNew={(carrinhoParam) => AtualizaCarrinho(carrinhoParam)}
                    produtos={camaroes}
                />
            </Container>
            <Container>
                <CardProdutos
                    setCarrinhoNew={(carrinhoParam) => AtualizaCarrinho(carrinhoParam)}
                    produtos={jigs}
                />
            </Container>
            <Footer />
        </>
    )
}