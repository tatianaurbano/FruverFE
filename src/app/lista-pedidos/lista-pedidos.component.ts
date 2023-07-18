import { Component,OnInit } from '@angular/core';
import { PedidoModel } from '../shared/pedido.model';
import { PedidoService } from '../shared/services/pedido.service';
import { ProductoService } from '../shared/services/producto.service';
import { Observable } from 'rxjs';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { PedidoProductoModel } from '../shared/pedidoProducto.model';
import { PedidoProductoService } from '../shared/services/pedido-producto.service';
import { ClienteModel } from '../shared/cliente.model';
import { ClienteService } from '../shared/services/cliente.service';


@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  pedidos: Observable<PedidoModel[]> | undefined;
  pedidoProductos: Observable<PedidoProductoModel[]> | undefined;
  cliente = new ClienteModel('','','','','','','');
  ArrayPedidos: any[] = [];

  constructor(private pedidoProductoService: PedidoProductoService, private pedidoService: PedidoService, private loginService: LoginService,
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    // si no existe un usuario logueado, redirigir a la pagina principal
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/']);
    }

    // obtener los pedidos y los productos de los pedidos
    this.pedidos = this.pedidoService.obtenerPedidos();
    this.pedidoProductos = this.pedidoProductoService.obtenerPedidoProductos();

    this.pedidos.pipe().subscribe((data: any) => {

      this.ArrayPedidos = data;
      // recorre cada pedido y le agrega la informacion del producto
      this.ArrayPedidos?.forEach((element: any) => {
        this.pedidoProductos?.pipe().subscribe((data: any) => {
          data.forEach((element2: any) => {
            this.productoService.obtenerProducto(element2.idProducto).pipe().subscribe((data: any) => {
              element2.nombreProducto = data.nombre;
              element2.precioProducto = data.precio;
              if (element.idPedido == element2.idPedido) {
                element.cantidad = element2.cantidad;
                element.idProducto = element2.idProducto;
                element.nombre = element2.nombreProducto;
                element.precio = element2.precioProducto;
              }
            });
            // obtiene la informacion del cliente y la agrega al pedido
            this.clienteService.obtenerCliente(element.cedula).pipe().subscribe((data: any) => {
              element.nombreCliente = data.nombre;
              element.apellidoCliente = data.apellido;
            });
          });
          

        });

      });
    });
  }

  // funcion para aprobar un pedido cambiando su estado a 1
  aprobarPedido(idPedido: string){
    let pedido = new PedidoModel(idPedido, '', new Date(), '1');
    this.pedidoService.actualizarPedido(pedido).subscribe((data: any) => {
      if (data) {
        window.location.reload();
      }
    });
  }

  // funcion para rechazar un pedido cambiando su estado a 2
  rechazarPedido(idPedido: string){
    let pedido = new PedidoModel(idPedido, '', new Date(), '2');
    this.pedidoService.actualizarPedido(pedido).subscribe((data: any) => {
      if (data) {
        window.location.reload();
      }
    });
  }
}
