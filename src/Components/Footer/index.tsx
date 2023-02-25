import { Container } from './styles';
import { House, Heart , UserCircle } from "phosphor-react";
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <Container>
            <Link to="/">
                <House size={32} color="#fdee10" />
            </Link>
            <Link to="/favoritos">
                <Heart size={32} color="#fdee10" />
            </Link>
            <Link to="/minhaconta">
                <UserCircle size={32} color="#fdee10" />
            </Link>
        </Container>
    )
}