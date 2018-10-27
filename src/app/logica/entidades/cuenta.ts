import { TipoCuenta } from "./tipo_cuenta";


export class Cuenta{
    id: number;
    nombre: string;
    tipoCuenta: TipoCuenta;
    saldo: number;
    fechaApertura: Date;
}