import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cuenta } from './entidades/cuenta';
import { TipoCuenta } from './entidades/tipo_cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient){}  

  getCuentas(): Observable<Cuenta[]>{
    return this.http.get<Cuenta[]>('http://localhost:8090/MiBilletera/cuenta');    
  }

  getCuenta(id:number): Observable<Cuenta>{
    return this.http.get<Cuenta>('http://localhost:8090/MiBilletera/cuenta/'+id);
  }

  createCuenta(cuenta: Cuenta): Observable<any>{
    return this.http.post<any>('http://localhost:8090/MiBilletera/cuenta/', JSON.stringify(cuenta), {headers: new HttpHeaders({'Content-Type':  'application/json'})});
  }

  updateCuenta(cuenta: Cuenta): Observable<any>{
    return this.http.put<any>('http://localhost:8090/MiBilletera/cuenta/'+cuenta.id, JSON.stringify(cuenta), {headers: new HttpHeaders({'Content-Type':  'application/json'})});
  }
}
