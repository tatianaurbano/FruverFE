import { Component } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { ClienteModel } from '../shared/cliente.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

  cliente = new ClienteModel('', '', '', '', '', '', '');

  constructor(
    public loginService: LoginService,
    private router: Router
  ) { }


  // funcion para iniciar sesion
  onSubmit () {
    this.loginService.iniciarSesion(this.cliente.cedula, this.cliente.contrasena);
  }


}
