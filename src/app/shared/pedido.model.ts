export class PedidoModel {
    constructor(
        public idPedido: string,
        public cedula: string,
        public fecha: Date,
        public estado: string,
    ){}
}