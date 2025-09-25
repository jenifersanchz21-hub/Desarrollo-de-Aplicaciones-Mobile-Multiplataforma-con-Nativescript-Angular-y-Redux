import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { NoticiasService } from '../domain/noticias.service';
import { ArchivoService } from '../domain/archivo.service';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application, View, Color, action, AnimationCurve } from '@nativescript/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {
  
  @ViewChild("listItem", { static: false }) listItem: ElementRef;
  loadingImages: { [key: number]: boolean } = {};

  constructor(
    public noticias: NoticiasService,
    private archivoService: ArchivoService,
    private router: RouterExtensions
  ) { }

  ngOnInit(): void {
    console.log('Listado cargado - Imágenes desde múltiples fuentes');
  }

  // Manejo de carga de imágenes
  onImageLoadStart(args: any, index: number): void {
    console.log(`Iniciando carga de imagen para índice ${index}`);
    this.loadingImages[index] = true;
  }

  onImageLoadEnd(args: any, index: number): void {
    console.log(`Carga completada de imagen para índice ${index}`);
    this.loadingImages[index] = false;
    
    // Opcional: pequeña animación cuando la imagen carga
    if (args.object) {
      args.object.animate({
        opacity: 0,
        duration: 0
      }).then(() => {
        args.object.animate({
          opacity: 1,
          duration: 500
        });
      });
    }
  }

  onItemTap(event: any): void {
    const noticia = event.item;
    console.log('Navegando a detalle con:', noticia);
    
    this.router.navigate(['/search/detalle'], {
      queryParams: { noticia: noticia || 'Noticia sin título' }
    });
  }

  onLongPress(args: any, noticia: string, index: number): void {
    console.log('Long Press detectado en:', noticia);
    
    this.animarElemento(args.object).then(() => {
      this.mostrarDialogoOpciones(noticia, index);
    });
  }

  animarElemento(elemento: any): Promise<void> {
    const view = elemento as View;
    
    return view.animate({
      backgroundColor: new Color("#E3F2FD"),
      duration: 300,
      curve: AnimationCurve.easeInOut
    }).then(() => {
      return view.animate({
        backgroundColor: new Color("white"),
        duration: 300,
        curve: AnimationCurve.easeInOut
      });
    });
  }

  mostrarDialogoOpciones(noticia: string, index: number): void {
    action({
      title: "Opciones para:",
      message: noticia.length > 30 ? noticia.substring(0, 30) + "..." : noticia,
      cancelButtonText: "Cancelar",
      actions: ["Archivar", "Borrar"]
    }).then((result) => {
      if (result === "Archivar") {
        this.archivarElemento(noticia);
      } else if (result === "Borrar") {
        this.borrarElemento(noticia, index);
      }
    });
  }

  archivarElemento(noticia: string): void {
    this.archivoService.archivar(noticia, 'noticia');
    alert({
      title: "Elemento Archivado",
      message: `"${noticia}" ha sido archivado correctamente.`,
      okButtonText: "Aceptar"
    });
  }

  borrarElemento(noticia: string, index: number): void {
    action({
      title: "Confirmar Borrado",
      message: "¿Estás seguro de que quieres borrar este elemento?",
      cancelButtonText: "Cancelar",
      actions: ["Sí, borrar"]
    }).then((result) => {
      if (result === "Sí, borrar") {
        this.archivoService.eliminar(noticia);
        alert({
          title: "Elemento Borrado",
          message: `"${noticia}" ha sido eliminado correctamente.`,
          okButtonText: "Aceptar"
        });
      }
    });
  }

  volverASearch(): void {
    this.router.navigate(['/search']);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }
}