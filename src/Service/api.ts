import axios from 'axios';

let api = axios.create({
    baseURL: "https://localhost:7186/"
});

export async function PostAll(url: string, body: any) {
    return await api.post(url, body)
};

export async function GetAll(url: string) {
    return await api.get(url)
}

export async function PostCarrinho(url : string ,body: any, config : any) {
    // console.log(config)
    // let apiCarrinho = axios.create({
    //     baseURL: `https://localhost:7186/carrinho/create`,
    //     headers:{
    //         'Authorization': config
    //     }
    // })
    // console.log(apiCarrinho)
    return await api.post(url,body, config);
}