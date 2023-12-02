import { Competencia } from "./competencia.model";
import { Curso } from "./curso.model";
import { Endereco } from "./endereco.model";
import { Modalidade } from "./modalidade.model";
import { Turno } from "./turno.model";

export class Estudante {

    constructor(
        public id?: number,
        public cpf?: string,
        public nome?: string,
        public sobre?: string,
        public dataNascimento?: Date,
        public telefone?: string,
        public endereco?: Endereco,
        public valorDaBolsa?: number,
        public email?: string,
        public senha?: string,
        public competencias?: Competencia[],
        public curso?: Curso,
        public modalidade?: Modalidade,
        public turno?: Turno,
        public linkCurriculo?: string,
        public linkFoto?: string
    ) {}

}
