import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cuenta } from '../entidades/cuenta';
import { TipoCuenta } from '../entidades/tipo_cuenta';
import { API } from './api';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient){}  

  getCuentas(): Observable<Cuenta[]>{
    return this.http.get<Cuenta[]>(API+'cuenta');    
  }

  getCuenta(id:number): Observable<Cuenta>{
    return this.http.get<Cuenta>(API+'cuenta/'+id);
  }

  createCuenta(cuenta: Cuenta): Observable<any>{
    console.log("createCuenta("+cuenta+")");
    return this.http.post<any>(API+'cuenta/', JSON.stringify(cuenta), {headers: new HttpHeaders({'Content-Type':  'application/json'})});
  }

  updateCuenta(cuenta: Cuenta): Observable<any>{
    console.log("updateCuenta("+cuenta+")");
    return this.http.put<any>(API+'cuenta'/*/'+cuenta.id*/, JSON.stringify(cuenta), {headers: new HttpHeaders({'Content-Type':  'application/json'})});
  }
}
