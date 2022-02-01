export default interface ILocacao {
    visivel: boolean;
    id: string;
    sexo: string;
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
    vagas: number;
    site: string;
}