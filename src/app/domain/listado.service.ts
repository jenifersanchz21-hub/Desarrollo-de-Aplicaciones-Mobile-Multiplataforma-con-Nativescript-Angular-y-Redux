import { Injectable } from "@angular/core";

@Injectable()
export class ListadoService {
    private listado: Array<string> = ["Listado 1", "Listado  2", "Listado  3"];
    
    agregar(x: string) {
        this.listado.push(x);
    }

    buscar() {
        return this.listado;
    }
}
