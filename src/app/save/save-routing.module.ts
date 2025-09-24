import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SaveListComponent } from './save-list.component'
import { SaveDetailsComponent } from './save-details.component'

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' }, // Ruta por defecto
  { path: 'list', component: SaveListComponent },
  { path: 'details', component: SaveDetailsComponent }
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class SaveRoutingModule { }