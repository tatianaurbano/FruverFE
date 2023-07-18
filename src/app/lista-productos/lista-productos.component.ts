import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/services/producto.service';
import { LoginService } from '../shared/services/login.service';
import { PedidoModel } from '../shared/pedido.model';
import { PedidoProductoModel } from '../shared/pedidoProducto.model';
import { PedidoService } from '../shared/services/pedido.service';
import { PedidoProductoService } from '../shared/services/pedido-producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit{
  productos: Observable<ProductoModel[]> | undefined;

  pedido = new PedidoModel("","", new Date(), "");
  pedidoProducto = new PedidoProductoModel("","","");

  constructor(private productoService: ProductoService, public loginService: LoginService
    , private pedidoService: PedidoService, private pedidoProductoService: PedidoProductoService,
    private router: Router
    ) { }

  ngOnInit(){
    // obtener los productos
    this.productos = this.productoService.obtenerProductos();
  }

  // funcion para borrar un producto
  borrarProducto(idProducto: string) { 
    this.productoService.borrarProducto(idProducto).subscribe(data => { 
      console.log("Registro Eliminado");
      this.ngOnInit();
    });
  }


  // funcion para agregar un pedido
  onSubmit(idxForm: number) {
    let form = document.getElementById("PedidoForm"+idxForm) as HTMLFormElement;
    let idProducto = form.elements.namedItem("idProducto") as HTMLInputElement;
    let cantidad = form.elements.namedItem("cantidad") as HTMLInputElement;
    console.log("idProducto", idProducto.value, "cantidad", cantidad.value);

    this.pedido.cedula = this.loginService.getUsuario().cedula;
    this.pedido.fecha = new Date();
    

    // agregar el pedido
    this.pedidoService.agregarPedido(this.pedido).subscribe(data => {
      this.pedido = data;
      console.log("Pedido Agregado", this.pedido);
      this.pedidoProducto.idPedido = this.pedido.idPedido;
      this.pedidoProducto.idProducto = idProducto.value;
      this.pedidoProducto.cantidad = cantidad.value;
      console.log("Pedido Producto", this.pedidoProducto);
      // agregar el producto del pedido
      this.pedidoProductoService.agregarPedidoProducto(this.pedidoProducto).subscribe(data => {
        this.pedidoProducto = data;
        console.log("Pedido Producto Agregado", this.pedidoProducto);
        window.location.reload();
      }, error => {
        console.log(error);
      }
      );
      
      
    }, error => {
      console.log(error);
    }
    );     
    
  }
}
