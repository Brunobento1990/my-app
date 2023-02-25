import { ButtonCustom } from "../../Components/Button";
import { IProduto } from "../../Interfaces/IProduto";
import { Container } from "./styles";
import { useState, ChangeEvent } from "react"
import { InputCustom } from "../../Components/Input/InputCustom";
import { AlertCustom } from "../../Components/Alert";
import { db } from "../../Firebase/Config";
import { collection , addDoc , Timestamp } from "firebase/firestore";

export function ProdutoCreate() {

    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [tamanho, setTamanho] = useState("");
    const [cor, setCor] = useState("");
    const [imagem, setImagem] = useState("")
    const [text, setText] = useState("Finalizar")
    const [messages, setMessages] = useState([] as string[])
    const [variant, setVariant] = useState("")
    const [tipo, setTipo] = useState(0);

    const ImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result as string;
                setImagem(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    async function Submit() {

        setText("Aguarde...")

        messages.length = 0

        let produto: IProduto = {
            id: 0,
            descricao,
            preco,
            tamanho,
            cor,
            imagem,
            tipo
        }

        if (!produto.descricao) {
            messages.push("Campo descrição é obrigatório !")
            setMessages([...messages])
        }
        if (produto.preco <= 0) {
            messages.push("Campo preço é obrigatório !")
            setMessages([...messages])
        }

        if (!produto.tamanho) {
            messages.push("Campo tamanho é obrigatório !")
            setMessages([...messages])
        }

        if (messages.length > 0) {
            setVariant("danger")
            setText("Finalizar")
            return;
        }

        try {

            const resp = await addDoc(
                collection(db,"produtos"),
                produto
            )
                if(resp){
                    console.log(resp.id)
                }

        } catch (error: any) {
            console.log(error)
        }

        // const request = await PostAll("produto/create", produto)

        // if (request.status === 201) {
        //     messages.push("Cadastro efetuado com sucesso !")
        //     setMessages([...messages])
        //     setVariant("success")
        //     setText("Finalizar")
        //     setDescricao("")
        //     setCor("")
        //     setImagem("")
        //     setPreco(0)
        //     setTamanho("")
        // } else {
        //     messages.push("Ocorreu algum erro, tente novamente mais tarde!")
        //     setMessages([...messages])
        //     setVariant("danger")
        //     setText("Finalizar")
        // }
    }

    return (
        <Container>
            <h3>Cadastro de Produto</h3>
            <InputCustom
                type="text"
                maxLength={150}
                placeholder="Digite a descrição"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value)}
                value={descricao}
                label="Descrição"
            />
            <InputCustom
                type="number"
                placeholder="Digite o preço do produto"
                step={0.01}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPreco(parseFloat(e.target.value))}
                value={preco}
                label="Preço"
            />
            <InputCustom
                type="text"
                placeholder="Digite o tamanho do produto"
                step={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTamanho(e.target.value)}
                value={tamanho}
                label="Tamanho"
            />

            <InputCustom
                type="text"
                maxLength={50}
                placeholder="Digite a cor"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCor(e.target.value)}
                value={cor}
                label="Cor"
            />
            <InputCustom
                type="file"
                value={undefined}
                label={"Selecione a foto"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => ImageUpload(e)}
            />
            <div className="containerRadio">
                <div>
                    <input
                        type="radio"
                        id="camarao"
                        name="tipo"
                        value="1"
                        checked={tipo === 1}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTipo(parseInt(e.target.value))}
                    />
                    <label htmlFor="camarao">Camarão</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="jogheade"
                        name="tipo"
                        value="2"
                        checked={tipo === 2}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTipo(parseInt(e.target.value))}
                    />
                    <label htmlFor="jogheade">Jig</label>
                </div>
            </div>
            {messages.length > 0 &&
                <div style={{ marginLeft: ".2rem", marginTop: "1rem", width: "20rem" }}>
                    <AlertCustom
                        text={messages}
                        variant={variant}
                    />
                </div>
            }
            <div style={{ marginLeft: ".2rem", marginTop: "1rem" }}>
                <ButtonCustom
                    text={text}
                    onClick={Submit}
                    heitgh="2rem"
                    width="20rem"
                />
            </div>
        </Container>
    )
}