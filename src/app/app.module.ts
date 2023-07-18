import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    EditarProductosComponent,
    DetalleProductoComponent,
    NavbarComponent,
    InicioSesionComponent,
    CarritoComponent,
    ListaPedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
