import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TipoCategoria } from 'src/app/logica/entidades/tipo_categoria';
import { CategoriaMovimiento } from 'src/app/logica/entidades/categoria_movimiento';
import { ReporteService } from 'src/app/logica/servicios/reporte.service';
import { MovimientoService } from 'src/app/logica/servicios/movimiento.service';
import { Movimiento } from 'src/app/logica/entidades/movimiento';
import { IngresosVsEgresos } from 'src/app/logica/entidades/ingresos_vs_egresos';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  constructor(
    private reporteService: ReporteService,
    private movimientoService: MovimientoService) { }

  ngOnInit() {
    this.getTiposCategoriaMovimiento();
  }

  tipoCategoria: TipoCategoria;
  categoriaMovimiento: CategoriaMovimiento;
  tiposCategoria: TipoCategoria[];
  categoriasMovimiento: CategoriaMovimiento[];
  @ViewChild('canvasGraficaCategoria') canvasGraficaCategoria : ElementRef; 

  columnasCategoria: string[] = ['id', 'valor', 'fecha', 'descripcion', 'cuenta'];
  movimientosCategoria: Movimiento[];

  getTiposCategoriaMovimiento(){
    this.movimientoService.getTiposCategoria().subscribe(tiposCategoria => this.tiposCategoria = tiposCategoria);
  }

  getCategoriasMovimiento(){    
    this.movimientoService.getCategoriasMovimiento(this.tipoCategoria.id).subscribe(categoriasMovimiento => this.categoriasMovimiento = categoriasMovimiento);
  }

  calcularReporteCategoria(){
    this.reporteService.getMovimientosPorCategoria(this.categoriaMovimiento.id).subscribe(
      (movimientos) => {
        this.movimientosCategoria = movimientos;
        this.pintarGraficaCategoria();
      }
    );
  }

  pintarGraficaCategoria(){
    let ctx: CanvasRenderingContext2D = this.canvasGraficaCategoria.nativeElement.getContext('2d');
    var size   = Math.min(ctx.canvas.width, ctx.canvas.height);
    var border = (Math.min( 10, size*0.1 )/2);
    ctx.fillStyle = 'rgb(222,222,222)';
    ctx.fillRect(border, border, ctx.canvas.width-2*border, ctx.canvas.height-2*border);
    if( this.movimientosCategoria ){
      var minX = 0;
      var maxX = this.movimientosCategoria.length;      
      //
      var minY = Number.MAX_VALUE;
      var maxY = Number.MIN_VALUE;
      for (var i = 0; i < this.movimientosCategoria.length; i++) {
        minY = Math.min(minY, this.movimientosCategoria[i].valor);
        maxY = Math.max(maxY, this.movimientosCategoria[i].valor);
      }
      //
      var valueX, oldValueX = null, valueY, oldValueY = null;
      //Eje horizontal
      valueY = ctx.canvas.height - ((ctx.canvas.height-2*border)/(maxY-minY))*(-minY)+border;
      ctx.strokeStyle = 'rgb(0,0,0)';
      ctx.beginPath();
      ctx.moveTo(border, valueY);
      ctx.lineTo(ctx.canvas.width-2*border, valueY);
      ctx.stroke();
      ctx.closePath();
      
      for (var i = 0; i < this.movimientosCategoria.length; i++) {
        valueX = i;
        valueY = this.movimientosCategoria[i].valor;
        // Y = ((b-a)/(max-min))*(X-min)+a                         
        valueX = (((ctx.canvas.width-2*border)-0)/(maxX-minX))*(valueX-minX)+border;
        valueY = (((ctx.canvas.height-2*border)-0)/(maxY-minY))*(valueY-minY)+border;
        //Y se invierte por el tema de la pantalla
        valueY = ctx.canvas.height-valueY;
        ctx.strokeStyle = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
        if( oldValueX != null && oldValueY != null ){
          ctx.beginPath();
          ctx.moveTo(oldValueX, oldValueY);
          ctx.lineTo(valueX, valueY);
          ctx.stroke();
          ctx.closePath();
        }           
        ctx.arc(valueX, valueY, border, 0, 2*Math.PI);
        ctx.fill();           
        //
        oldValueX = valueX;
        oldValueY = valueY;
      }       
    }    
  }

  @ViewChild('canvasGraficaPeriodo') canvasGraficaPeriodo : ElementRef;

  columnasPeriodo: string[] = ['id', 'valor', 'fecha', 'descripcion', 'categoria', 'tipo', 'cuenta'];
  movimientosPeriodo: Movimiento[];

  fechaInicial: Date;
  fechaFinal: Date;

  calcularReportePeriodo(){
    this.reporteService.getMovimientosPorPeriodo(this.fechaInicial, this.fechaFinal).subscribe(
      (movimientos) => {
        this.movimientosPeriodo = movimientos;
        this.pintarGraficaPeriodo();
      }
    );
  }

  pintarGraficaPeriodo(){
    let ctx: CanvasRenderingContext2D = this.canvasGraficaPeriodo.nativeElement.getContext('2d');
    var size   = Math.min(ctx.canvas.width, ctx.canvas.height);
    var border = (Math.min( 10, size*0.1 )/2);
    ctx.fillStyle = 'rgb(222,222,222)';
    ctx.fillRect(border, border, ctx.canvas.width-2*border, ctx.canvas.height-2*border);
    if( this.movimientosPeriodo ){
      var minX = -1;
      var maxX = this.movimientosPeriodo.length+1;      
      //
      var minY = Number.MAX_VALUE;
      var maxY = Number.MIN_VALUE;
      for (var i = 0; i < this.movimientosPeriodo.length; i++) {
        minY = Math.min(minY, this.movimientosPeriodo[i].valor);
        maxY = Math.max(maxY, this.movimientosPeriodo[i].valor);
      }
      //
      var valueX, oldValueX = null, valueY, oldValueY = null;
      //Eje horizontal
      valueY = ctx.canvas.height - ((ctx.canvas.height-2*border)/(maxY-minY))*(-minY)+border;
      ctx.strokeStyle = 'rgb(0,0,0)';
      ctx.beginPath();
      ctx.moveTo(border, valueY);
      ctx.lineTo(ctx.canvas.width-2*border, valueY);
      ctx.stroke();
      ctx.closePath();
      
      for (var i = 0; i < this.movimientosPeriodo.length; i++) {
        valueX = i;
        valueY = this.movimientosPeriodo[i].valor;
        // Y = ((b-a)/(max-min))*(X-min)+a                         
        valueX = (((ctx.canvas.width-2*border)-0)/(maxX-minX))*(valueX-minX)+border;
        valueY = (((ctx.canvas.height-2*border)-0)/(maxY-minY))*(valueY-minY)+border;
        //Y se invierte por el tema de la pantalla
        valueY = ctx.canvas.height-valueY;
        ctx.strokeStyle = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
        ctx.fillStyle   = ctx.strokeStyle;
        if( oldValueX != null && oldValueY != null ){
          ctx.beginPath();
          ctx.moveTo(oldValueX, oldValueY);
          ctx.lineTo(valueX, valueY);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.arc(valueX, valueY, border, 0, 2*Math.PI);
        ctx.fill();           
        //
        oldValueX = valueX;
        oldValueY = valueY;
      }       
    }    
  }

  columnasIngresosEgresos: string[] = ['nombre', 'sumatoria'];
  ingresosEgresos: IngresosVsEgresos[];

  @ViewChild('canvasGraficaIngresosEgresos') canvasGraficaIngresosEgresos : ElementRef;

  calcularReporteIngresosEgresos(){
    this.reporteService.getIngresosVsEgresos().subscribe(
      (ingresosEgresos) => {
        this.ingresosEgresos = ingresosEgresos;
        this.pintarGraficaIngresosEgresos();
      }
    );
  }

  pintarGraficaIngresosEgresos(){
    let ctx: CanvasRenderingContext2D = this.canvasGraficaIngresosEgresos.nativeElement.getContext('2d');
    var size   = Math.min(ctx.canvas.width, ctx.canvas.height);
    var border = (Math.min( 10, size*0.1 )/2);
    ctx.fillStyle = 'rgb(222,222,222)';
    ctx.fillRect(border, border, ctx.canvas.width-2*border, ctx.canvas.height-2*border);
    if( this.ingresosEgresos ){
      var cienPorCiento = 0;
      for(var i = 0; i < this.ingresosEgresos.length; i++){
        cienPorCiento += Math.abs( this.ingresosEgresos[i].sumatoria );        
      }
      var aInicial = 0;
      var aActual  = 0;   
      ctx.strokeStyle = 'rgb(0,0,0)';         
      for(var i = 0; i < this.ingresosEgresos.length; i++){                                      
        aActual += ((2*Math.PI*Math.abs( this.ingresosEgresos[i].sumatoria )/cienPorCiento));                    
        ctx.fillStyle = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
        ctx.beginPath();
        ctx.moveTo(ctx.canvas.width/2, ctx.canvas.height/2);
        ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, size/2-2*border, aInicial, aActual);
        ctx.lineTo(ctx.canvas.width/2, ctx.canvas.height/2);
        ctx.closePath();
        ctx.fill();
        
        aInicial += aActual;
        aActual  =  0;
      }
    }
  }

}
