export class ClienteModel{
    constructor(
        public cedula: string,
        public nombre: string,
        public apellido: string,
        public correo: string,
        public telefono: string,
        public contrasena: string,
        public tipo: string
    ){}
}