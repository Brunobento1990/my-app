import { Container } from "./styles";
import { ChangeEvent } from "react"

interface IConfig {
    type?: string,
    placeholder?: string,
    maxLength?: number,
    value: any,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    step?: number,
    label: string,
}

export function InputCustom({ type, maxLength, placeholder, value, onChange, step, label }: IConfig) {
    return (
        <Container>
            <label>
                {label}
            </label>
            <input
                type={type}
                maxLength={maxLength}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                step={step}
            />

        </Container>
    )
}