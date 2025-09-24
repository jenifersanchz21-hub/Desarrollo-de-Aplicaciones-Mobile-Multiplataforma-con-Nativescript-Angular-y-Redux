import { Injectable } from "@angular/core";

@Injectable()
export class DetalleService {
    private detalle: Array<string> = ["NOMBRE A", "NOMBREB", "NOMBRE C"];
    
    agregar(k: string) {
        this.detalle.push(k);
    }

    buscar() {
        return this.detalle;
    }
}
