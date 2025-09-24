import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { NoticiasService } from '../domain/noticias.service';

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  constructor(
    private noticias: NoticiasService,
    private router: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.noticias.agregar("¡Noticia 1!");
    this.noticias.agregar("¡Noticia 2!");
    this.noticias.agregar("¡Noticia 3!");
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  irAListado(): void {
    // Ruta ABSOLUTA desde la raíz
    this.router.navigate(['/search/listado']);
  }
}