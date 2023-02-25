import { ShoppingCart } from "phosphor-react";
import { Container } from "./styles";
import logo from '../../Images/logo.jpg'
import { Link } from "react-router-dom";
import { ICarrinho } from "../../Interfaces/ICarrinho";
import { useEffect, useState } from "react";

interface ICarrinhoData {
    carrinhoParam?: ICarrinho
}

export function Header({ carrinhoParam }: ICarrinhoData) {

    const [carrinho, setCarrinho] = useState(carrinhoParam);

    useEffect(() => {
        setCarrinho(carrinhoParam)
    }, [carrinhoParam])

    return (
        <Container>
            <img src={logo} alt="Logo iscas lune" />
            <div className="container-carrinho">
                <Link to="/meucarrinho">
                    <ShoppingCart style={{ cursor: "pointer", marginTop: "6px" }} size={20} color="#030302" />
                </Link>
                {carrinho && carrinho.id > 0 &&
                    <span className="qtdCarrinho">{carrinho.carrinhoProdutos.length}</span>
                }
            </div>
        </Container>
    )
}