export function ValidPrimeiroNome(nome : string){
    const regexPrimeiroNome = /^[A-Za-z]+$/;
    return regexPrimeiroNome.test(nome.trim());
}