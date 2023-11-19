import { Endereco } from "./endereco.model";

export class Empresa {

    constructor(
        public id?: number,
        public cnpj?: string,
        public razaoSocial?: string,
        public nomeFantasia?: string,
        public telefone?: string,
        public endereco?: Endereco,
        public email?: string,
        public senha?: string,
        public descricao?: string,
        public ramoDeAtuacao?: string,
        public linkFoto?: string
    ) {}

}
