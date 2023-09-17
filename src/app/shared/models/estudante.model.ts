import { Endereco } from "./endereco.model";

export class Estudante {

    constructor(
        private _id?: number,
        private _cpf?: string,
        private _nome?: string,
        private _dataNascimento?: Date,
        private _telefone?: string,
        private _endereco?: Endereco,
        private _email?: string,
        private _senha?: string
    ) {}

    get id(): number | undefined {
        return this._id;
    }

    set id(value: number | undefined) {
        this._id = value;
    }

    get cpf(): string | undefined {
        return this._cpf;
    }

    set cpf(value: string | undefined) {
        this._cpf = value;
    }

    get nome(): string | undefined {
        return this._nome;
    }

    set nome(value: string | undefined) {
        this._nome = value;
    }

    get dataNascimento(): Date | undefined {
        return this._dataNascimento;
    }

    set dataNascimento(value: Date | undefined) {
        this._dataNascimento = value;
    }

    get telefone(): string | undefined {
        return this._telefone;
    }

    set telefone(value: string | undefined) {
        this._telefone = value;
    }

    get endereco(): Endereco | undefined {
        return this._endereco;
    }

    set endereco(value: Endereco | undefined) {
        this._endereco = value;
    }

    get email(): string | undefined {
        return this._email;
    }

    set email(value: string | undefined) {
        this._email = value;
    }

    get senha(): string | undefined {
        return this._senha;
    }

    set senha(value: string | undefined) {
        this._senha = value;
    }

}
