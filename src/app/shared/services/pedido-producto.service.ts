import { Injectable } from '@angular/core';
import { PedidoProductoModel } from '../pedidoProducto.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoProductoService {

  constructor(
    private http: HttpClient
  ) { }

  BASE_URL = 'http://localhost:3000';

  obtenerPedidoProductos(){
    return this.http.get<PedidoProductoModel[]>(`${this.BASE_URL}/pedidos_productos`);
  }

  obtenerPedidoProducto(idPedidoProducto: string){
    return this.http.get<PedidoProductoModel>(`${this.BASE_URL}/pedidos_productos/${idPedidoProducto}`);
  }

  agregarPedidoProducto(pedidoProducto: PedidoProductoModel){
    return this.http.post<PedidoProductoModel>(`${this.BASE_URL}/pedidos_productos`,pedidoProducto);
  }

  actualizarPedidoProducto(pedidoProducto: PedidoProductoModel){
    return this.http.put<PedidoProductoModel>(`${this.BASE_URL}/pedidos_productos/${pedidoProducto.idPedido}/${pedidoProducto.idProducto}`,pedidoProducto);
  }


  borrarPedidoProducto(pedidoProducto: PedidoProductoModel){
    return this.http.delete<PedidoProductoModel>(`${this.BASE_URL}/pedidos_productos/${pedidoProducto.idPedido}/${pedidoProducto.idProducto}`);
  }

}
