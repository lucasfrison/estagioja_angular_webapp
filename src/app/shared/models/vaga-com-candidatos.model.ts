import { Competencia } from "./competencia.model";
import { Curso } from "./curso.model";
import { Modalidade } from "./modalidade.model";
import { Turno } from "./turno.model";

export class VagaComCandidatos {

    constructor(
        public id?: number,
        public titulo?: string,
        public turno?: Turno,
        public descricao?: string,
        public requisitos?: Competencia[],
        public cursos?: Curso[],
        public responsabilidades?: string,
        public beneficios?: string,
        public status?: string,
        public valorDaBolsa?: number,
        public modalidade?: Modalidade,
        public idEmpresa?: number,
        public idEstudantes?: number[],
        public prazo?: Date,
        public quantidadeCandidaturas?: number,
        public nomeEmpresa?: string
    ) {}

}
