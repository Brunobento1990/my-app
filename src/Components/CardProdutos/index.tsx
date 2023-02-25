import { Container } from "./styles";
import { ButtonCustom } from "../Button";
import { Favoritos } from "../Favoritos";
import { IProduto } from "../../Interfaces/IProduto";
import { parseCookies } from "nookies";
import { useNavigate } from "react-router-dom";
import { ICarrinho } from "../../Interfaces/ICarrinho";
import { PostCarrinho } from "../../Service/api";

interface ICard {
    setCarrinhoNew: (carrinho: ICarrinho) => void;
    produtos: IProduto[]
}

export function CardProdutos({ setCarrinhoNew, produtos }: ICard) {

    const cookies = parseCookies();
    //const user = JSON.parse(cookies['user']);
    //const token = cookies['token'];
    const navigate = useNavigate();

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
            {produtos.map((produto) => (
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