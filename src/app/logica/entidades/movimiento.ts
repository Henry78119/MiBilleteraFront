import { CategoriaMovimiento } from "./categoria_movimiento";
import { Cuenta } from "./cuenta";

export class Movimiento{
    id: number;
    valor: number;
    fecha: Date;
    descripcion: string;
    idCategoriaMovimiento: CategoriaMovimiento = new CategoriaMovimiento();
    cuenta: Cuenta;
}