import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Container } from "./styles";
import { useState, ChangeEvent } from 'react'
import { InputCustom } from "../../Components/Input/InputCustom";
import { ButtonCustom } from "../../Components/Button";
import { AlertCustom } from "../../Components/Alert";
import { ValidSenha } from "../../Helper/ValidSenha";
import { ValidEmail } from "../../Helper/ValidEmail";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/Config";

export function UsuarioCreate() {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [variante, setVariante] = useState("danger")
    const [text, setText] = useState("Confirmar")
    const [messages, setMessages] = useState([] as string[])

    function ValidString(value: string, message: string) {
        if (!value) {
            messages.push(message)
            setMessages([...messages])
        }
    }

    async function Submit() {

        setText("Aguarde...")
        messages.length = 0

        ValidString(displayName.trim(), "Campo nome é obrigatório !")
        ValidString(email.trim(), "Campo e-mail é obrigatório !")
        ValidString(password.trim(), "Campo senha é obrigatório !")
        ValidString(rePassword.trim(), "Confirmar a senha é obrigatório !")
        ValidString(phoneNumber.trim(), "Campo telefone é obrigatório !")

        if (!ValidEmail(email)) {
            messages.push("E-mail inválido")
            setMessages([...messages])
        }

        if (!ValidSenha(password)) {
            messages.push("Informe uma senha com 1 caracter especial, um número e uma letra maíscula.")
            setMessages([...messages])
        }

        if (password !== rePassword) {
            messages.push("As senhas estão diferentes .")
            setMessages([...messages])
        }

        if (messages.length > 0) {
            setText("Confirmar")
            return;
        }

        let data = {
            email ,
            password ,
            displayName,
            phoneNumber
        }

        try{

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            ) 

            const resp = await updateProfile(user, {
                displayName : data.displayName
            })

            setVariante("success")
            messages.push("Cadastro efetuado com sucesso, efetue o login.")
            setMessages([...messages])
            setText("Confirmar")

        }catch(error : any){
            console.log(error)
            setVariante("danger")
            messages.push(error)
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
                    value={displayName}
                    maxLength={50}
                    placeholder="Digite seu nome"
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
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
                    label="Senha"
                    value={password}
                    maxLength={20}
                    placeholder="Digite sua senha"
                    type="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <InputCustom
                    label="Confirmar senha"
                    value={rePassword}
                    maxLength={20}
                    placeholder="Confirme sua senha"
                    type="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRePassword(e.target.value)}
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
                            variant={variante}
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