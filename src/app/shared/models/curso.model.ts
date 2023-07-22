import { Modalidade } from "./modalidade.model";
import { Turno } from "./turno.model";
import { Vaga } from "./vaga.model";

export class Curso {
    constructor(
        private _id: number,
        private _descricao: string,
        private _modalidade: Modalidade,
        private _vagas: Vaga[],
        private _turno: Turno
    ) {}

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get descricao(): string {
        return this._descricao;
    }

    set descricao(value: string) {
        this._descricao = value;
    }

    get modalidade(): Modalidade {
        return this._modalidade;
    }

    set modalidade(value: Modalidade) {
        this._modalidade = value;
    }

    get vagas(): Vaga[] {
        return this._vagas;
    }

    set vagas(value: Vaga[]) {
        this._vagas = value;
    }

    get turno(): Turno {
        return this._turno;
    }

    set turno(value: Turno) {
        this._turno = value;
    }

}
