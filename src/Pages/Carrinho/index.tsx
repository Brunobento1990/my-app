import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Container } from "./styles";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import { PostCarrinho } from "../../Service/api";
import { ICarrinho } from "../../Interfaces/ICarrinho";
import { IUsuario } from "../../Interfaces/IUsuario";

export function Carrinho() {

    const cookies = parseCookies();
    const [carrinho, setCarrinho] = useState({} as ICarrinho);
    const [user, setUser] = useState({} as IUsuario)
    const userCookies = JSON.parse(cookies['user']);
    const token = cookies['token'];

    useEffect(() => {

        async function carrinho() {
            if (token && userCookies) {
                try {

                    const config = {
                        headers: {
                            'Authorization': "Bearer " + token,
                            'Content-Type': 'application/json'
                        }
                    };

                    const request = await PostCarrinho(`/carrinho/usuario/${userCookies.id}`, carrinho, config);

                    if (request.status === 200) {
                        setCarrinho(request.data)
                        setUser(userCookies)
                    }

                } catch (error: any) {
                    console.log(error)
                }
            }
        }
        carrinho()
    }, [])

    return (
        <>
            <Header carrinhoParam={carrinho} />
            <Container style={{ display: "flex", flexDirection: "column" }}>
                {user.id > 0 ?
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>Olá : {user.user_name}</span>
                        <span>Total : {carrinho.total.toFixed(2)}</span>
                    </div>
                    :
                    <span>Carrinho vazio, faça seu login</span>
                }

            </Container>
            <Footer />
        </>
    )
}