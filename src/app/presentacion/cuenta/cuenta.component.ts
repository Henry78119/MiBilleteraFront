import { Component, OnInit } from '@angular/core';
import { Cuenta } from 'src/app/logica/entidades/cuenta';
import { CuentaService } from 'src/app/logica/cuenta.service';
import { TipoCuenta } from 'src/app/logica/entidades/tipo_cuenta';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  cuentas : Cuenta[];  
  cuenta : Cuenta;

  constructor(private cuentaService: CuentaService) { }

  getCuentas(): void {
    this.cuenta = null;
    this.cuentaService.getCuentas().subscribe(cuentas => this.cuentas = cuentas);
  }

  ngOnInit() {
    this.getCuentas();
  }

  getIcon(cuenta: Cuenta): string{
    switch(cuenta.tipoCuenta){
      case TipoCuenta.AHORROS: return "account_balance_wallet";
      case TipoCuenta.BOLSILLO: return "inbox";
      case TipoCuenta.CORRIENTE: return "credit_card";
    }
    return "rounded_corner";
  }

  getTiposCuenta(){
    return [TipoCuenta.AHORROS, TipoCuenta.BOLSILLO, TipoCuenta.CORRIENTE];
  }

  showCreateCuenta() {
    this.cuenta = new Cuenta();
  }

  createCuenta(){
    this.cuentaService.createCuenta(this.cuenta).subscribe();
    this.getCuentas();
  }

  showUpdateCuenta(cuenta: Cuenta){
    this.cuenta = cuenta;
  }

  updateCuenta(){
    this.cuentaService.updateCuenta(this.cuenta).subscribe();
    this.getCuentas();
  }

}
