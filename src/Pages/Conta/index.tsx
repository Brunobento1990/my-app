import { Login } from "../Login";
import { UsuarioEdit } from "../Usuario/UsuarioEdit";
import { parseCookies } from 'nookies';

export function Conta() {

    const cookies = parseCookies(); 
    const user = JSON.parse(cookies['user']);

    return (
        <>
            {
                user ?
                    <UsuarioEdit user={user} /> : <Login />
            }
        </>
    )
}