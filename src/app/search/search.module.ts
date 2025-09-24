import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import { ListadoComponent } from './listado.component'
import { DetalleComponent } from './detalle.component'
import { NoticiasService } from '../domain/noticias.service'
import { OpinionesService } from '../domain/opiniones.service' // ← Agregar este

@NgModule({
  imports: [NativeScriptCommonModule, SearchRoutingModule],
  declarations: [
    SearchComponent,
    ListadoComponent,
    DetalleComponent
  ],
  providers: [NoticiasService, OpinionesService], // ← Agregar OpinionesService
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}