import { Component, OnInit, Input } from '@angular/core';
import { Cuenta } from 'src/app/logica/entidades/cuenta';
import { Movimiento } from 'src/app/logica/entidades/movimiento';
import { ActivatedRoute } from '@angular/router';
import { CuentaService } from 'src/app/logica/servicios/cuenta.service';
import { MovimientoService } from 'src/app/logica/servicios/movimiento.service';
import { CategoriaMovimiento } from 'src/app/logica/entidades/categoria_movimiento';
import { TipoCategoria } from 'src/app/logica/entidades/tipo_categoria';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss']
})
export class MovimientoComponent implements OnInit {

  cuenta: Cuenta;
  movimiento: Movimiento;
  movimientos: Movimiento[];
  columnas: string[] = ['id', 'valor', 'fecha', 'descripcion', 'categoria', 'tipo'];
  tiposCategoria: TipoCategoria[];
  categoriasMovimiento: CategoriaMovimiento[];
  cuentas: Cuenta[];
  tipoCategoria: TipoCategoria;
  cuentaDestino: Cuenta;

  constructor(
      private route: ActivatedRoute, 
      private cuentaService: CuentaService,
      private movimientoService: MovimientoService) { 

    }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');   
    this.movimiento = new Movimiento(); 
    this.getCuenta(id);
    this.getMovimientos(id);
    this.getTiposCategoriaMovimiento();
    this.getListadoCuentas();
  }

  getCuenta(id: number){        
    this.cuentaService.getCuenta(id).subscribe(cuenta => this.cuenta = cuenta);
  }

  getMovimientos(id: number){    
    this.movimientoService.getMovimientos(id).subscribe(movimientos => this.movimientos = movimientos);
  }

  getTiposCategoriaMovimiento(){
    this.movimientoService.getTiposCategoria().subscribe(tiposCategoria => this.tiposCategoria = tiposCategoria);
  }

  getCategoriasMovimiento(){    
    this.movimientoService.getCategoriasMovimiento(this.tipoCategoria.id).subscribe(categoriasMovimiento => this.categoriasMovimiento = categoriasMovimiento);
  }

  getListadoCuentas(){
    this.cuentaService.getCuentas().subscribe(cuentas => this.cuentas = cuentas);
  }

  createMovimiento(){
    this.movimiento.valor = this.tipoCategoria.id == 1 ? this.movimiento.valor : -1*this.movimiento.valor;
    this.movimiento.cuenta = this.cuenta;
    if( this.tipoCategoria.id == 3 ){
      var transferencia = new Movimiento();
      transferencia.cuenta = this.cuentaDestino;
      transferencia.idCategoriaMovimiento = this.movimiento.idCategoriaMovimiento;
      transferencia.descripcion = this.movimiento.descripcion;
      transferencia.valor = -1*this.movimiento.valor;
      //
      this.movimientoService.createMovimiento(this.movimiento).subscribe(
        (result)=> this.movimientoService.createMovimiento(transferencia).subscribe((result)=>this.ngOnInit())
      );
    }
    else{
      this.movimientoService.createMovimiento(this.movimiento).subscribe((result)=>this.ngOnInit());
    }    
  }

}
