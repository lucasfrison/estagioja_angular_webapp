import { Vaga } from "./vaga.model";

export class Competencia {
    constructor(
        private _id: number,
        private _descricao: string,
        private _vagas: Vaga[]
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

    get vagas(): Vaga[] {
        return this._vagas;
    }

    set vagas(value: Vaga[]) {
        this._vagas = value;
    }
}

