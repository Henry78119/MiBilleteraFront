import { Injectable } from '@angular/core';
import { Movimiento } from './entidades/movimiento';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoCategoria } from './entidades/tipo_categoria';
import { CategoriaMovimiento } from './entidades/categoria_movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private http: HttpClient) {} 

  getMovimientos(id: number): Observable<Movimiento[]>{
    return this.http.get<Movimiento[]>('http://localhost:8090/MiBilletera/movimiento/'+id);
  }

  getTiposCategoria(){
    return this.http.get<TipoCategoria[]>('http://localhost:8090/MiBilletera/tipo-categoria');
  }

  getCategoriasMovimiento(idTipoCategoria: number){
    return this.http.get<CategoriaMovimiento[]>('http://localhost:8090/MiBilletera/categoria/'+idTipoCategoria);
  }

}
