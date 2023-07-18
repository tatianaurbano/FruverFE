import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // funcion para iniciar sesion
  iniciarSesion(cedula: string, contrasena: string) {
    this.http.post(`${this.BASE_URL}/login`, {
      cedula: cedula,
      contrasena: contrasena
    }).subscribe(data => {
      if (data) {
        localStorage.setItem('usuario', JSON.stringify(data));
        this.router.navigate(['/']);
      }
    });
  }

  // funcion para retornar la informacion del usuario
  getUsuario() {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  // funcion para verificar si el usuario esta logueado
  isLogged() {
    if (localStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }

  // funcion para cerrar sesion
  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }

  isAdmin() {    
    if (this.getUsuario().tipo === 'admin') {
      return true;
    }
    return false;
  }

}
