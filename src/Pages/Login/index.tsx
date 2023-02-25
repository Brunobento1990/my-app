import { Container } from "./styles";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { useState, ChangeEvent } from 'react'
import { InputCustom } from "../../Components/Input/InputCustom";
import { ButtonCustom } from "../../Components/Button";
import { PostAll } from "../../Service/api";
import { Link, useNavigate } from "react-router-dom";
import { AlertCustom } from "../../Components/Alert";
import { IUserLogin } from "../../Interfaces/IUserLogin";
import { setCookie } from 'nookies';
import { ValidEmail } from "../../Helper/ValidEmail";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Config";

export function Login() {

    const [text, setText] = useState("Confirmar")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messages, setMessages] = useState([] as string[])
    const navigate = useNavigate();

    async function Submit() {

        messages.length = 0
        setText("Aguarde...")

        if (!ValidEmail(email)) {
            messages.push("E-mail inválido.")
            setMessages([...messages])
        }

        if (!email) {
            messages.push("Informe seu nome.")
            setMessages([...messages])
        }

        if (!password) {
            messages.push("Informe a sua senha.")
            setMessages([...messages])
        }

        if (messages.length > 0) {
            setText("Confirmar")
            return;
        }

        let user: IUserLogin = {
            email,
            password
        }

        try{

            const resp = await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password
            )
            if (resp) {

                setCookie(null, 'id', resp.user.uid, {
                    maxAge: 259200,
                    path: '/',
                });

                navigate("/")
                
            } else {
                setText("Confirmar")
                messages.push("E-mail ou senha inálidas.")
                setMessages([...messages])
            }
            console.log(resp)

        }catch(error : any){
            console.log(error)
            setText("Confirmar")
            messages.push("E-mail ou senha inálidas.")
            setMessages([...messages])
        }

        // try {

        //     const request = await PostAll("Usuario/Login", user);

        //     if (request.status === 200) {
        //         setCookie(null, 'user', JSON.stringify(request.data.usuario), {
        //             maxAge: 259200,
        //             path: '/',
        //         });

        //         setCookie(null, 'token', request.data.value, {
        //             maxAge: 259200,
        //             path: '/',
        //         });

        //         navigate("/")
        //     } else {
        //         messages.push("Usuário o senha inválidos.")
        //         setMessages([...messages])
        //         setText("Confirmar")
        //     }

        // } catch (error: any) {
        //     messages.push(error.response.data)
        //     setMessages([...messages])
        //     setText("Confirmar")
        // }

    }

    return (

        <>
            <Header />
            <Container>
                <h1 style={{ margin: "1rem" }}>Login</h1>
                <InputCustom
                    label="E-mail"
                    value={email}
                    maxLength={50}
                    placeholder="Digite seu email"
                    type="email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <InputCustom
                    label="Senha"
                    value={password}
                    maxLength={20}
                    placeholder="Digite sua senha"
                    type="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                {messages.length > 0 &&
                    <div style={{ marginLeft: ".7rem", marginTop: "1rem", width: "22rem" }}>
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
                        width="22rem"
                    />
                </div>
                <div className="containerLink">
                    <Link to="/usuario/create">
                        Criar conta
                    </Link>

                    <Link to="/usuario/recuperarsenha">
                        Esqueceu sua senha?
                    </Link>
                </div>

            </Container>
            <Footer />

        </>
    )
}