import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { SettingsRoutingModule } from './settings-routing.module'
import { SettingsComponent } from './settings.component'
import { EditarUsuarioComponent } from './editar-usuario.component'

@NgModule({
  imports: [
    NativeScriptCommonModule, 
    SettingsRoutingModule,
    NativeScriptFormsModule
  ],
  declarations: [SettingsComponent, EditarUsuarioComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsModule {}