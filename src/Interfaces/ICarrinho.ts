import { ICarrinhoProduto } from "./ICarrinhoProduto";

export interface ICarrinho {
    id: number,
    usuarioId: number,
    total: number,
    carrinhoProdutos: ICarrinhoProduto [] 
}