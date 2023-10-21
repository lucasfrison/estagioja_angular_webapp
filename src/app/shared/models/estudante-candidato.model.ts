import { Endereco } from "./endereco.model";

export class EstudanteCandidato {

    constructor(
        public id: number,
        public nome: string,
        public dataDeNascimento: Date,
        public endereco: Endereco,
        public linkCurriculo: string,
        public linkFoto: string
    ) {}

}
