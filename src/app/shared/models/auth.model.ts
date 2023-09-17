export class Auth {

    constructor(
        private _id: number,
        private _email: string,
        private _senha: string,
    ) {}

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get senha(): string {
        return this._senha;
    }

    set senha(value: string) {
        this._senha = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

}
