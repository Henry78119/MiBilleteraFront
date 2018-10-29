import { Injectable } from '@angular/core';
import { Movimiento } from '../entidades/movimiento';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoCategoria } from '../entidades/tipo_categoria';
import { CategoriaMovimiento } from '../entidades/categoria_movimiento';
import { API } from './api';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private http: HttpClient) {} 

  getMovimientos(id: number): Observable<Movimiento[]>{
    console.log("getMovimientos("+id+")");
    return this.http.get<Movimiento[]>(API+'movimiento/'+id);
  }

  createMovimiento(movimiento: Movimiento): Observable<any>{
    console.log("createMovimiento("+movimiento+")");
    return this.http.post<any>(API+'movimiento/', JSON.stringify(movimiento), {headers: new HttpHeaders({'Content-Type':  'application/json'})});
  }

  getTiposCategoria(){
    console.log("getTiposCategoria()");
    return this.http.get<TipoCategoria[]>(API+'tipo-categoria');
  }

  getCategoriasMovimiento(idTipoCategoria: number){
    console.log("getCategoriasMovimiento("+idTipoCategoria+")");
    return this.http.get<CategoriaMovimiento[]>(API+'categoria/'+idTipoCategoria);
  }

}
