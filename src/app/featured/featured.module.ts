import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { FeaturedRoutingModule } from './featured-routing.module'
import { FeaturedComponent } from './featured.component'
import { NoticiasService } from '../domain/noticias.service'

@NgModule({
  imports: [NativeScriptCommonModule, FeaturedRoutingModule],
  declarations: [FeaturedComponent],
  //providers: [NoticiasService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FeaturedModule {}
