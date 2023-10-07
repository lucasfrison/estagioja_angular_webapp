import { PerfilAcesso } from "./perfil-acesso.model";

export class AuthResponse {

    constructor(
        public id?: number,
        public email?: string,
        public perfil?: PerfilAcesso
    ) {}

}
