import { Competencia } from "./competencia.model";
import { Curso } from "./curso.model";
import { Empresa } from "./empresa.model";
import { Modalidade } from "./modalidade.model";
import { Turno } from "./turno.model";

export class Vaga {

    constructor(
       public id?: number, 
       public titulo?: string,
       public descricao?: string,
       public cursos?: Curso[],
       public responsabilidades?: string,
       public beneficios?: string,
       public status?: string,
       public valorDaBolsa?: number,
       public modalidade?: Modalidade,
       public requisitos?: Competencia[],
       public prazo?: Date,
       public turno?: Turno,
       public idEmpresa?: number
    ) {}

}
