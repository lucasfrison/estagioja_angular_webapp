import { Endereco } from "./endereco.model";

export class Empresa {

    constructor(
        private _id?: number,
        private _cnpj?: string,
        private _razaoSocial?: string,
        private _nomeFantasia?: string,
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

    get cnpj(): string | undefined {
        return this._cnpj;
    }

    set cnpj(value: string | undefined) {
        this._cnpj = value;
    }

    get razaoSocial(): string | undefined {
        return this._razaoSocial;
    }

    set razaoSocial(value: string | undefined) {
        this._razaoSocial = value;
    }

    get nomeFantasia(): string | undefined {
        return this._nomeFantasia;
    }

    set nomeFantasia(value: string | undefined) {
        this._nomeFantasia = value;
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
