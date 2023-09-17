export class Endereco {
    constructor(
        private _cep?: string,
        private _localidade?: string,
        private _uf?: string,
        private _bairro?: string,
        private _numero?: number,
        private _logradouro?: string,
        private _complemento?: string,
    ) {}

    get cep(): string | undefined {
        return this._cep;
    }

    set cep(value: string | undefined) {
        this._cep = value;
    }

    get localidade(): string | undefined {
        return this._localidade;
    }

    set localidade(value: string | undefined) {
        this._localidade = value;
    }

    get uf(): string | undefined {
        return this._uf;
    }

    set uf(value: string | undefined) {
        this._uf = value;
    }

    get bairro(): string | undefined{
        return this._bairro;
    }

    set bairro(value: string | undefined) {
        this._bairro = value;
    }

    get numero(): number | undefined{
        return this._numero;
    }

    set numero(value: number | undefined) {
        this._numero = value;
    }

    get logradouro(): string | undefined{
        return this._logradouro;
    }

    set logradouro(value: string | undefined) {
        this._logradouro = value;
    }

    get complemento(): string | undefined {
        return this._complemento;
    }

    set complemento(value: string | undefined) {
        this._complemento = value;
    }

}
