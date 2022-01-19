export default interface ILocacao {
    id: number;
    nome: string;
    endereco: string;
    contato: string;
    descricao: string;
    preco: number;
    data: Date;
    tipoAlocacao: [];
    tipoImovel: string;
    pessoas: number;
    foto: string;
    email: string;
}