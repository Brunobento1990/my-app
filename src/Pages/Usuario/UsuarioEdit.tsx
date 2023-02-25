import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Container } from "./styles";
import { useState, ChangeEvent } from 'react'
import { InputCustom } from "../../Components/Input/InputCustom";
import { ButtonCustom } from "../../Components/Button";
import { PostAll } from "../../Service/api";
import { useNavigate } from "react-router-dom";
import { AlertCustom } from "../../Components/Alert";
import { IUsuario } from "../../Interfaces/IUsuario";
import { ValidSenha } from "../../Helper/ValidSenha";
import { ValidEmail } from "../../Helper/ValidEmail";
import { ValidPrimeiroNome } from "../../Helper/ValidPrimeiroNome";
import { setCookie } from "nookies";

interface IData {
    user: any,
}

export function UsuarioEdit({ user }: IData) {

    const [id]=useState(user.id)
    const [user_name, setUsername] = useState(user.user_name);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const [text, setText] = useState("Confirmar")
    const [messages, setMessages] = useState([] as string[])
    const navigate = useNavigate();

    function ValidString(value: string, message: string) {
        if (!value) {
            messages.push(message)
            setMessages([...messages])
        }
    }

    async function Submit() {

        setText("Aguarde...")
        messages.length = 0

        ValidString(user_name.trim(), "Campo nome é obrigatório !")
        ValidString(email.trim(), "Campo e-mail é obrigatório !")
        ValidString(phoneNumber.trim(), "Campo telefone é obrigatório !")

        if (!ValidPrimeiroNome(user_name)) {
            messages.push("Informe somente o primeiro nome.")
            setMessages([...messages])
        }

        if (!ValidEmail(email)) {
            messages.push("E-mail inválido")
            setMessages([...messages])
        }

        if (messages.length > 0) {
            setText("Confirmar")
            return;
        }

        let usuario: IUsuario = {
            id,
            user_name,
            email,
            phoneNumber
        }

        try {

            const request = await PostAll("Usuario/Editar", usuario);
            if (request.status === 200) {
                setCookie(null, 'user', JSON.stringify(request.data.usuario), {
                    maxAge: 259200,
                    path: '/',
                });

                setCookie(null, 'token', request.data.value, {
                    maxAge: 259200,
                    path: '/',
                });

                navigate("/")
            } else {
                messages.push("Ocorreu alguma ao editar seu dados, tente novamente mais tarde.")
                setMessages([...messages])
                setText("Confirmar")
            }

        } catch (error: any) {
            messages.push(error.response.data)
            setMessages([...messages])
            setText("Confirmar")
        }
    }

    return (
        <>
            <Header />
            <Container>
                <InputCustom
                    label="Nome"
                    value={user_name}
                    maxLength={50}
                    placeholder="Digite seu nome"
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
                <InputCustom
                    label="E-mail"
                    value={email}
                    maxLength={150}
                    placeholder="Digite seu e-mail"
                    type="email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <InputCustom
                    label="Telefone"
                    value={phoneNumber}
                    maxLength={50}
                    placeholder="Digite seu número"
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                />
                {messages.length > 0 &&
                    <div style={{ marginLeft: ".7rem", marginTop: "1rem", width: "20rem" }}>
                        <AlertCustom
                            text={messages}
                            variant="danger"
                        />
                    </div>
                }
                <div style={{ marginLeft: ".7rem", marginTop: "1rem" }}>
                    <ButtonCustom
                        text={text}
                        onClick={Submit}
                        heitgh="2rem"
                        width="20rem"
                    />
                </div>

            </Container>
            <Footer />
        </>
    )
}