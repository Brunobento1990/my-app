import { Container } from "./styles";
import { ButtonCustom } from "../Button";
import { Favoritos } from "../Favoritos";
import { IProduto } from "../../Interfaces/IProduto";
import { parseCookies } from "nookies";
import { useNavigate } from "react-router-dom";
import { ICarrinho } from "../../Interfaces/ICarrinho";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/Config";

interface ICard {
    setCarrinhoNew: (carrinho: ICarrinho) => void;
    produtos : IProduto [] 
}

export function CardProdutos({ setCarrinhoNew , produtos}: ICard) {

    const cookies = parseCookies();
    //const user = JSON.parse(cookies['user']);
    //const token = cookies['token'];
    const navigate = useNavigate();
    // const [camaroes, setCamaroes] = useState([] as IProduto[])
    // const [jigs, setJigs] = useState([] as IProduto[])
    // const [produtos, setProdutos] = useState([] as IProduto[])

    // useEffect(() => {

    //     async function Request() {
    //         let q;
    //         const request = await collection(db, "produtos")

    //         try {
    //             q = query(request, orderBy("tamanho", "desc"))

    //             await onSnapshot(q, (docs) => {
    //                 const produto = docs.docs.map((item, index) => {
    //                     return {
    //                         id: index,
    //                         descricao: item.get("descricao"),
    //                         preco: item.get("preco"),
    //                         tamanho: item.get("tamanho"),
    //                         cor: item.get("cor"),
    //                         imagem: item.get("imagem"),
    //                         tipo: item.get("tipo")
    //                     };
    //                 });
    //                 setProdutos(produto);
    //             });

    //         } catch (error: any) {
    //             console.log(error)
    //         }

    //     }

    //     Request()


    //     //setCamaroes([...camaroes])
    // }, [])

    // useEffect(() => {
    //     setJigs(produtos.filter((item) => {
    //         return item.tipo == 2
    //     }))

    //     setCamaroes(produtos.filter((item) => {
    //         return item.tipo == 1
    //     }))
    // }, [produtos])

    // async function AdicionarCarrinho(produto: IProduto) {
    //     if (!user || !token) {
    //         navigate("/minhaconta")
    //     }

    //     let carrinho: ICarrinho = {
    //         id: 0,
    //         usuarioId: user.id,
    //         total: produto.preco,
    //         carrinhoProdutos: [
    //             {
    //                 carrinhoId: 0,
    //                 produtoId: produto.id,
    //                 id: 0,
    //                 produto: null,
    //                 quantidade: 1
    //             }
    //         ]
    //     }

    //     try {

    //         const config = {
    //             headers: {
    //                 'Authorization': "Bearer " + token,
    //                 'Content-Type': 'application/json'
    //             }
    //         };

    //         const request = await PostCarrinho("carrinho/create", carrinho, config);

    //         if (request.status === 200) {
    //             setCarrinhoNew(request.data)
    //         }

    //     } catch (error: any) {
    //         console.log(error)
    //     }

    // }
    return (
        <>
            {produtos.length > 0 &&

produtos.map((produto) => (
                    <Container key={produto.id}>
                        <div className="first">
                            <img src={produto.imagem} />
                        </div>
                        <div className="second">
                            <span>{produto.descricao}</span>
                            {produto.tipo === 1 &&
                                <span>Cor : {produto.cor}</span>
                            }
                            <span>Tamanho : {produto.tamanho}</span>
                            <span>Preço : {produto.preco}</span>
                            <div className="containerButton">
                                <Favoritos />
                                <ButtonCustom text="Comprar"
                                //onClick={() => AdicionarCarrinho(produto)}
                                />
                            </div>
                        </div>
                    </Container>
                ))}
        </>
    )
}