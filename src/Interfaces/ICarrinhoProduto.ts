import { IProduto } from "./IProduto";

export interface ICarrinhoProduto {
    id: number,
    carrinhoId: number,
    produtoId: number,
    produto: IProduto | null,
    quantidade: number
}