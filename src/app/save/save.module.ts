import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { SaveRoutingModule } from './save-routing.module'
import { SaveListComponent } from './save-list.component'
import { SaveDetailsComponent } from './save-details.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SaveRoutingModule
  ],
  declarations: [
    SaveListComponent,
    SaveDetailsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SaveModule { }