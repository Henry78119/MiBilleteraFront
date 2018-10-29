import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuentaComponent } from './presentacion/cuenta/cuenta.component';
import { MovimientoComponent } from './presentacion/movimiento/movimiento.component';
import { ReporteComponent } from './presentacion/reporte/reporte.component';

const routes: Routes = [
  { path: '', redirectTo: '/cuentas', pathMatch: 'full' },
  {path: 'cuentas', component: CuentaComponent},
  {path: 'movimientos/:id', component: MovimientoComponent},
  {path: 'reportes', component: ReporteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
