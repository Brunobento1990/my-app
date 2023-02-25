import Alert from 'react-bootstrap/Alert';

interface IConfig {
    text: string[];
    variant: string;
}

export function AlertCustom({ text, variant }: IConfig) {
    return (
        <Alert variant={variant}>
            {text.map((error, index) => (
                <div key={index}><span>{error}</span><br /></div>
            ))}
        </Alert>
    )
}