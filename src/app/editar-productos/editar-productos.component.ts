import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit {

  idProducto = '';
  producto = new ProductoModel("", "", "", 0);
  mensaje = '';
  titulo = 'Crear Producto';

  constructor(private productoService: ProductoService, private route: ActivatedRoute, private router: Router,
    public loginService: LoginService ) { }


  ngOnInit() {
    // si no existe un usuario logueado y no es un administrador, redirigir a la pagina principal
    if (!this.loginService.isLogged() && !this.loginService.isAdmin()) {
      this.router.navigate(['/']);
    }

    this.idProducto = this.route.snapshot.params['idProducto'];
    console.log("El id de Producto es :" + this.idProducto);

    if (this.idProducto) {
      //Editar
      this.titulo = 'Editar Producto';
      this.productoService.obtenerProducto(this.idProducto).subscribe(data => {
        this.producto = data;
      }, error => {
        console.log(error);
      });
    }
    else {
      //Nuevo Producto
    }

  }

  // funcion para crear o editar un producto 
  onSubmit() {
    console.log("Submit realizado");
    if (this.producto.idProducto) {
      //Viene de Editar
      this.productoService.actualizarProducto(this.producto).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/productos']);
        }
      );
    }
    else {
      //Viene de crear Nuevo Producto
      console.log('Nuevo Producto');
      this.productoService.agregarProducto(this.producto).subscribe(data => {
        this.router.navigate(['/productos']);
      });
    }

  }

}
