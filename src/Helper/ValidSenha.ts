export function ValidSenha(senha : string){
    const regexSenha = /^(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.*[A-Z]).{8,}$/;
    return regexSenha.test(senha)
}