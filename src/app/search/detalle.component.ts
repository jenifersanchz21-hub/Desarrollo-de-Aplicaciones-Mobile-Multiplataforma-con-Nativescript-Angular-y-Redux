import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { alert, action } from '@nativescript/core/ui/dialogs';
import { SnackBar } from '@nativescript-community/ui-material-snackbar';
import { OpinionesService, Opinion } from '../domain/opiniones.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {

  noticia: string = 'Noticia no disponible';
  opiniones: Array<Opinion> = [];

  private snackbar: SnackBar;

  constructor(
    private route: ActivatedRoute,
    private router: RouterExtensions,
    private opinionesService: OpinionesService
  ) {
    this.snackbar = new SnackBar();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.noticia = params['noticia'] || 'Noticia no disponible';
    });
    this.opiniones = this.opinionesService.buscar();
  }

  // Pull to Refresh
  onPull(event: any): void {
    const pullRefresh = event.object;
    setTimeout(() => {
      const nuevaOpinion = this.opinionesService.generarOpinionAleatoria();
      this.opinionesService.agregar(nuevaOpinion);
      this.opiniones = [...this.opinionesService.buscar()];
      pullRefresh.refreshing = false;
      this.mostrarSnackBar("Nueva opinión agregada");
    }, 1000);
  }

  // Eliminar opinión (CORREGIDO)
  eliminarOpinion(opinion: Opinion): void {
    this.opinionesService.eliminar(opinion.id);
    this.opiniones = [...this.opinionesService.buscar()];
    this.mostrarSnackBar(`Opinión de ${opinion.usuario} eliminada`);
  }

  // Voto positivo
  votoPositivo(opinion: Opinion): void {
    opinion.puntuacion = Math.min(5, opinion.puntuacion + 1);
    this.mostrarSnackBar(`Voto positivo para ${opinion.usuario}`);
  }

  // Voto negativo
  votoNegativo(opinion: Opinion): void {
    opinion.puntuacion = Math.max(1, opinion.puntuacion - 1);
    this.mostrarSnackBar(`Voto negativo para ${opinion.usuario}`);
  }

  // Selección de categoría
  seleccionarCategoria(opinion: Opinion): void {
    action("Selecciona categoría:", "Cancelar", ["Información", "Sugerencia", "Crítica"])
      .then(result => {
        if (result !== "Cancelar") {
          this.mostrarSnackBar(`Categoría cambiada a: ${result}`);
        }
      });
  }

  // Mostrar SnackBar correctamente
  mostrarSnackBar(mensaje: string): void {
    this.snackbar.simple(mensaje, "OK");
  }

  // Volver al listado
  volverAListado(): void {
    this.router.navigate(['/search/listado']);
  }

  // Volver atrás
  volverAtras(): void {
    this.router.back();
  }
}