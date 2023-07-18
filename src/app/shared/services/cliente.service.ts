import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  BASE_URL = 'http://localhost:3000';
  constructor(
    private http: HttpClient
  ) { }

  obtenerClientes() {
    return this.http.get<ClienteModel[]>(`${this.BASE_URL}/clientes`);
  }

  obtenerCliente(cedula: string) {
    return this.http.get(`${this.BASE_URL}/clientes/${cedula}`);
  }

  crearCliente(cliente: ClienteModel) {
    return this.http.post<ClienteModel>(`${this.BASE_URL}/clientes`, cliente);
  }

  actualizarCliente(cliente: ClienteModel) {
    return this.http.put<ClienteModel>(`${this.BASE_URL}/clientes/${cliente.cedula}`, cliente);
  }

  borrarCliente(idCliente: string) {
    return this.http.delete(`${this.BASE_URL}/clientes/${idCliente}`);
  }


}
