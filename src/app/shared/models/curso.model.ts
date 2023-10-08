import { Modalidade } from "./modalidade.model";
import { Turno } from "./turno.model";
import { Vaga } from "./vaga.model";

export class Curso {
    constructor(
        public id: number,
        public descricao: string,
        public modalidade: Modalidade,
        public turno: Turno
    ) {}

}
