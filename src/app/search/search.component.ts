import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application, View, Color, AnimationCurve } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { NoticiasService } from '../domain/noticias.service';

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  resultados: Array<string>;
  
  @ViewChild("layout", { static: false }) layout: ElementRef;

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
    // Ejecutar ambas animaciones
    this.animarBoton();
    this.animacionCompleja();
    
    // Navegar después de las animaciones
    setTimeout(() => {
      this.router.navigate(['/search/listado']);
    }, 1200);
  }

  animarBoton(): void {
    if (this.layout && this.layout.nativeElement) {
      const layout = <View>this.layout.nativeElement;
      layout.animate({
          backgroundColor: new Color("blue"),
          duration: 300,
          delay: 150
      }).then(() => layout.animate({
          backgroundColor: new Color("white"),
          duration: 300,
          delay: 150
      }));
    }
  }
  animacionCompleja(): void {
    if (this.layout && this.layout.nativeElement) {
      const layout = <View>this.layout.nativeElement;
      
      layout.animate({
        opacity: 0.7,
        scale: { x: 0.9, y: 0.9 },
        rotate: 5,
        translate: { x: 0, y: -10 },
        duration: 400,
        curve: AnimationCurve.easeInOut
      }).then(() => {
        return layout.animate({
          opacity: 1,
          scale: { x: 1, y: 1 },
          rotate: 0,
          translate: { x: 0, y: 0 },
          duration: 400,
          curve: AnimationCurve.spring
        });
      });
    }
  }

  buscarahora(s: string) {
    this.resultados = this.noticias.buscar().filter((x) => x.indexOf(s) >= 0);
  }
}