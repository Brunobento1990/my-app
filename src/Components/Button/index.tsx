import { Container } from "./styles";

interface IData {
    text: string;
    onClick?: () => void;
    width?: string;
    heitgh?: string
}

export function ButtonCustom({ text, onClick, heitgh, width }: IData) {

    let altura = heitgh ? heitgh : "1.5rem";
    let largura = width ? width : "7rem"

    return (
        <Container>
            <button
                onClick={onClick}
                style={{ width: largura, height: altura }}
            >
                {text}
            </button>
        </Container>
    )
}