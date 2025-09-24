import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SearchComponent } from './search.component'
import { ListadoComponent } from './listado.component'
import { DetalleComponent } from './detalle.component'

const routes: Routes = [
  { 
    path: '', 
    component: SearchComponent 
  },
  { 
    path: 'listado', 
    component: ListadoComponent 
  },
  { 
    path: 'detalle', 
    component: DetalleComponent 
  }
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SearchRoutingModule {}