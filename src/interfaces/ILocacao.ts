export default interface ILocacao {
    id: string;
    contato: string;
    data: Date;
    descricao: string;
    endereco: string;
    estilo: [];
    email: string;
    foto: string;
    nome: string;
    preco: number;
    tipoAlocacao: [];
    tipoImovel: string;
    pessoas: number;
    site: string;
}