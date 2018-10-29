import { Injectable } from '@angular/core';
import { Movimiento } from '../entidades/movimiento';
import { API } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IngresosVsEgresos } from '../entidades/ingresos_vs_egresos';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private datePipe: DatePipe, private http: HttpClient) { }

  getMovimientosPorCategoria(idTipoCategoria: number){
    return this.http.get<Movimiento[]>(API+'reporte/movimientosPorCategoria/'+idTipoCategoria);
  }

  getMovimientosPorTipo(idTipo: number){
    return this.http.get<Movimiento[]>(API+'reporte/movimientosPorTipo/'+idTipo);
  }

  getMovimientosPorPeriodo(fechaIni: Date, fechaFin: Date){
    return this.http.get<Movimiento[]>(API+'reporte/movimientosPorPeriodo/'+this.datePipe.transform(fechaIni, 'yyyy-MM-dd')+'/'+this.datePipe.transform(fechaFin, 'yyyy-MM-dd'));
  }

  getIngresosVsEgresos(){
    return this.http.get<IngresosVsEgresos[]>(API+'reporte/ingresosVsEgresos');
  }

}
