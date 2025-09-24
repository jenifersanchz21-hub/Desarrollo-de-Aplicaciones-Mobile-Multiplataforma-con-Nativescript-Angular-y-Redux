import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiasService } from './domain/noticias.service';
import { OpinionesService } from './domain/opiniones.service';

// --- Registro del PullToRefresh ---
// Esta es la forma recomendada y correcta de registrar un elemento en NativeScript.
import { registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';

registerElement("PullToRefresh", () => PullToRefresh);
// --- Fin del registro ---

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
  ],
  declarations: [AppComponent],
  providers: [
    NoticiasService,
    OpinionesService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}