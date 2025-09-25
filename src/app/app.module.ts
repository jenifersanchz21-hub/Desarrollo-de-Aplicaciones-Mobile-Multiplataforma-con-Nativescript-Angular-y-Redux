import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NativeScriptHttpClientModule } from '@nativescript/angular'; // ← Agregar esto
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiasService } from './domain/noticias.service';
import { OpinionesService } from './domain/opiniones.service';
import { Noticias2Service } from './domain/noticias2.service'; 
import { FavoritosService } from './domain/favoritos.service';

// --- Registro del PullToRefresh ---
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
    NativeScriptHttpClientModule, 
  ],
  declarations: [AppComponent],
  providers: [
    NoticiasService,
    OpinionesService,
    Noticias2Service,
    FavoritosService 
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}