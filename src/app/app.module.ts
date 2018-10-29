import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CuentaComponent } from './presentacion/cuenta/cuenta.component';
import { MovimientoComponent } from './presentacion/movimiento/movimiento.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule }    from '@angular/common/http';
import { ReporteComponent } from './presentacion/reporte/reporte.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CuentaComponent,
    MovimientoComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, HttpClientModule,
    MatGridListModule, MatCardModule, MatTableModule,
    MatToolbarModule, MatListModule, MatIconModule, 
    MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTabsModule, MatDatepickerModule, MatNativeDateModule 
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
