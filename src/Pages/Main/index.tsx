import { CardProdutos } from "../../Components/CardProdutos";
import { Container } from "./styles";
import { IProduto } from "../../Interfaces/IProduto";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import { useState, useEffect } from 'react'
import { parseCookies } from "nookies";
import { ICarrinho } from "../../Interfaces/ICarrinho";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/Config";

export function Main() {

    const [carrinhos, setCarrinho] = useState({} as ICarrinho)
    // const cookies = parseCookies();
    // const user = JSON.parse(cookies['user']);
    // const token = cookies['token'];

    const [camaroes, setCamaroes] = useState([] as IProduto[])
    const [jigs, setJigs] = useState([] as IProduto[])
    const [produtos, setProdutos] = useState([] as IProduto[])

    useEffect(() => {

        async function Request() {
            let q;
            const request = await collection(db, "produtos")

            try {
                q = query(request, orderBy("tamanho", "desc"))

                await onSnapshot(q, (docs) => {
                    const produto = docs.docs.map((item, index) => {
                        return {
                            id: index,
                            descricao: item.get("descricao"),
                            preco: item.get("preco"),
                            tamanho: item.get("tamanho"),
                            cor: item.get("cor"),
                            imagem: item.get("imagem"),
                            tipo: item.get("tipo")
                        };
                    });
                    setProdutos(produto);
                });

            } catch (error: any) {
                console.log(error)
            }

        }

        Request()


        //setCamaroes([...camaroes])
    }, [])

    useEffect(() => {
        setJigs(produtos.filter((item) => {
            return item.tipo == 2
        }))

        setCamaroes(produtos.filter((item) => {
            return item.tipo == 1
        }))
    }, [produtos])

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