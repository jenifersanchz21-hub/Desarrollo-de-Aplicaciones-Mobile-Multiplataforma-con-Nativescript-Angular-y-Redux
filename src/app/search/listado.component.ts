import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { NoticiasService } from '../domain/noticias.service';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {
  
  constructor(
    public noticias: NoticiasService,
    private router: RouterExtensions
  ) { }

  ngOnInit(): void {
    console.log('Listado cargado');
  }

  onItemTap(event: any): void {
    const noticia = event.item;
    console.log('Navegando a detalle con:', noticia);
    
    // Ruta ABSOLUTA
    this.router.navigate(['/search/detalle'], {
      queryParams: { noticia: noticia || 'Noticia sin título' }
    });
  }

  volverASearch(): void {
    // Ruta ABSOLUTA
    this.router.navigate(['/search']);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }
}