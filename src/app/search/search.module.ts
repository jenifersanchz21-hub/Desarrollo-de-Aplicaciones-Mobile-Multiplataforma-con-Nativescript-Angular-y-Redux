import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import { SearchFormComponent } from './search-form.component'
import { OpinionSearchFormComponent } from './opinion-search-form.component'
import { ListadoComponent } from './listado.component'
import { DetalleComponent } from './detalle.component'
import { NoticiasService } from '../domain/noticias.service'
import { OpinionesService } from '../domain/opiniones.service'
import { ArchivoService } from '../domain/archivo.service' 

@NgModule({
  imports: [NativeScriptCommonModule, SearchRoutingModule],
  declarations: [
    SearchComponent,
    ListadoComponent,
    DetalleComponent,
    OpinionSearchFormComponent,
    SearchFormComponent
  ],
  providers: [NoticiasService, OpinionesService, ArchivoService], 
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}