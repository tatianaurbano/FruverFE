import { Component, OnInit } from '@angular/core';
import { PedidoProductoModel } from '../shared/pedidoProducto.model';
import { PedidoProductoService } from '../shared/services/pedido-producto.service';
import { PedidoModel } from '../shared/pedido.model';
import { PedidoService } from '../shared/services/pedido.service';
import { ProductoService } from '../shared/services/producto.service';
import { Observable } from 'rxjs';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  pedidos: Observable<PedidoModel[]> | undefined;
  pedidoProductos: Observable<PedidoProductoModel[]> | undefined;

  ArrayPedidos: any[] = [];

  constructor(private pedidoProductoService: PedidoProductoService, private pedidoService: PedidoService, private loginService: LoginService,
    private productoService: ProductoService,
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
          });
        });

      });
    });
  }

  // funcion para borrar un pedido por id
  borrarPedido(idPedido: string, idProducto: string) {
    let pedidoProducto = new PedidoProductoModel(idPedido, idProducto, '0');
    this.pedidoProductoService.borrarPedidoProducto(pedidoProducto).subscribe((data: any) => {
      console.log(data);
      this.pedidoService.borrarPedido(idPedido).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/']);
      }, (error: any) => {
        console.log(error);
      }
      );
      this.router.navigate(['/']);
    }, (error: any) => {
      console.log(error);
    }
    );
  }

  // funcion para actualizar un pedido por id
  actualizarPedido(idPedido: string, idProducto: string) {
    let cantidad = (<HTMLInputElement>document.getElementById(`cantidad${idPedido}/${idProducto}`)).value;
    console.log("idPedido: ", idPedido, " idProducto: ", idProducto, " cantidad: ", cantidad);
    
    let pedidoProducto = new PedidoProductoModel(idPedido, idProducto, cantidad);
    this.pedidoProductoService.actualizarPedidoProducto(pedidoProducto).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/']);
    }
    );
    
  }
}
