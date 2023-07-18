import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  producto = new ProductoModel("", "", "", 0);
  idProducto = '';

  constructor(private productoService: ProductoService, private route: ActivatedRoute, 
    private router: Router,   public loginService: LoginService
    ) { }
 
  ngOnInit() {
    this.idProducto = this.route.snapshot.params['idProducto'];
    console.log("El id de Producto es :" + this.idProducto);

    // si se obtiene el id del producto, se obtiene la informacion del producto
    if (this.idProducto) {
      this.productoService.obtenerProducto(this.idProducto).subscribe(data => {
        this.producto = data;
      }, error => {
        console.log(error);
      });
    } else {
      this.router.navigate(['/productos']);

    }
  }

}
