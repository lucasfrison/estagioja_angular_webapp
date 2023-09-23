export class Endereco {
    constructor(
        public cep?: string,
        public localidade?: string,
        public uf?: string,
        public bairro?: string,
        public numero?: number,
        public logradouro?: string,
        public complemento?: string,
    ) {}
}
