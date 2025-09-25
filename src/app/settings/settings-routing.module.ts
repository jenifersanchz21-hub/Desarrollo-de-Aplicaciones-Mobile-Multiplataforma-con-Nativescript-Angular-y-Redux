import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SettingsComponent } from './settings.component'
import { EditarUsuarioComponent } from './editar-usuario.component'

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'editar', component: EditarUsuarioComponent }
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SettingsRoutingModule {}