import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ClienteModel } from '../cliente.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cliente = new ClienteModel('', '', '', '', '', '', '');
  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    if (this.isLogged()) {
      this.usuario();
    }

  }

  // funcion para cerrar sesion
  cerrarSesion() {
    this.loginService.cerrarSesion();
    window.location.reload();
  }

  // funcion para iniciar sesion

  iniciarSesion(usuario: string, password: string) {
    this.loginService.iniciarSesion(usuario, password);
    window.location.reload();
  }

  // funcion para verificar si hay un usuario logueado
  isLogged() {
    return this.loginService.isLogged();
  }

  // funcion para verificar si el usuario logueado es un administrador
  isAdmin() {
    return this.loginService.isAdmin();
  }

  // funcion para obtener los datos del usuario logueado en el local storage
  usuario() {
    let datos = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(datos);

    this.cliente.cedula = datos.cedula;
    this.cliente.nombre = datos.nombre;
    this.cliente.apellido = datos.apellido;
    this.cliente.correo = datos.correo;
    this.cliente.telefono = datos.telefono;
    this.cliente.tipo = datos.tipo;
  }

}
