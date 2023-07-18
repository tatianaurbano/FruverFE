import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';

const routes: Routes = [
  {path:'productos',  component: ListaProductosComponent},
  {path:'productos/agregar',  component: EditarProductosComponent},
  {path:'productos/editar/:idProducto',  component: EditarProductosComponent},
  {path:'inicioSesion',  component: InicioSesionComponent},
  {path:'carrito',  component: CarritoComponent},
  {path:'productos/detalle/:idProducto',  component: DetalleProductoComponent},
  {path:'listaPedidos', component: ListaPedidosComponent},

  {path:'**', redirectTo:'productos', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
