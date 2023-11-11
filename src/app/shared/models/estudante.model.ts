import { Competencia } from "./competencia.model";
import { Curso } from "./curso.model";
import { Endereco } from "./endereco.model";

export class Estudante {

    constructor(
        public id?: number,
        public cpf?: string,
        public nome?: string,
        public dataDeNascimento?: Date,
        public telefone?: string,
        public endereco?: Endereco,
        public email?: string,
        public senha?: string,
        public competencias?: Competencia[],
        public curso?: Curso
    ) {}

}
