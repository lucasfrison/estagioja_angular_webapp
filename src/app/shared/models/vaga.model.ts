import { Competencia } from "./competencia.model";
import { Curso } from "./curso.model";
import { Modalidade } from "./modalidade.model";
import { Turno } from "./turno.model";

export class Vaga {

    constructor(
        private _id?: number, 
        private _titulo?: string,
        private _descricao?: string,
        private _cursos?: Curso[],
        private _responsabilidades?: string,
        private _beneficios?: string,
        private _status?: string,
        private _valorDaBolsa?: number,
        private _modalidade?: Modalidade,
        private _requisitos?: Competencia[],
        private _prazo?: Date,
        private _turno?: Turno
    ) {}

    get turno(): Turno | undefined {
        return this._turno;
    }

    set turno(value: Turno | undefined) {
        this._turno = value;
    }

    get id(): number | undefined {
        return this._id;
    }

    set id(value: number | undefined) {
        this._id = value;
    }

    get titulo(): string | undefined {
        return this._titulo;
    }

    set titulo(value: string | undefined) {
        this._titulo = value;
    }

    get descricao(): string | undefined {
        return this._descricao;
    }

    set descricao(value: string | undefined) {
        this._descricao = value;
    }

    get cursos(): Curso[] | undefined {
        return this._cursos;
    }

    set cursos(value: Curso[] | undefined) {
        this._cursos = value;
    }

    get responsabilidades(): string | undefined {
        return this._responsabilidades;
    }

    set responsabilidades(value: string | undefined) {
        this._responsabilidades = value;
    }

    get beneficios(): string | undefined {
        return this._beneficios;
    }

    set beneficios(value: string | undefined) {
        this._beneficios = value;
    }

    get status(): string | undefined {
        return this._status;
    }

    set status(value: string | undefined) {
        this._status = value;
    }

    get valorDaBolsa(): number | undefined {
        return this._valorDaBolsa;
    }

    set valorDaBolsa(value: number | undefined) {
        this._valorDaBolsa = value;
    }

    get modalidade(): Modalidade | undefined {
        return this._modalidade;
    }

    set modalidade(value: Modalidade | undefined) {
        this._modalidade = value;
    }

    get requisitos(): Competencia[] | undefined {
        return this._requisitos;
    }

    set requisitos(value: Competencia[] | undefined) {
        this._requisitos = value;
    }

    get prazo(): Date | undefined {
        return this._prazo;
    }

    set prazo(value: Date | undefined) {
        this._prazo = value;
    }

}
