import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { action } from '@nativescript/core/ui/dialogs';
import { SnackBar } from '@nativescript-community/ui-material-snackbar';
import { OpinionesService, Opinion } from '../domain/opiniones.service';

// Validador personalizado en el mismo archivo
function longitudMinimaBusqueda(longitud: number = 3) {
    return (control: { value: string }): { [key: string]: any } | null => {
        if (!control.value || control.value.trim().length === 0) {
            return null; // Campo vacío es válido
        }
        
        if (control.value.trim().length < longitud) {
            return { 
                longitudMinima: {
                    requiredLength: longitud,
                    actualLength: control.value.trim().length,
                    message: `Mínimo ${longitud} caracteres`
                }
            };
        }
        
        return null;
    };
}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {

  noticia: string = 'Noticia no disponible';
  opiniones: Opinion[] = [];
  opinionesFiltradas: Opinion[] = [];
  textoBusqueda: string = '';
  errorBusqueda: string = '';

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
    this.cargarOpiniones();
  }

  cargarOpiniones(): void {
    this.opiniones = this.opinionesService.buscar();
    this.opinionesFiltradas = [...this.opiniones];
  }

  validarBusqueda(): boolean {
    this.errorBusqueda = '';
    
    const validador = longitudMinimaBusqueda(3);
    const resultado = validador({ value: this.textoBusqueda });
    
    if (resultado && resultado.longitudMinima) {
      this.errorBusqueda = resultado.longitudMinima.message;
      return false;
    }
    
    return true;
  }

  filtrarOpiniones(): void {
    this.errorBusqueda = '';
    
    if (!this.validarBusqueda()) {
      this.mostrarSnackBar(this.errorBusqueda);
      return;
    }

    if (!this.textoBusqueda || this.textoBusqueda.trim().length === 0) {
      this.opinionesFiltradas = [...this.opiniones];
      this.mostrarSnackBar("Mostrando todas las opiniones");
    } else {
      const texto = this.textoBusqueda.toLowerCase().trim();
      this.opinionesFiltradas = this.opiniones.filter(opinion => 
        opinion.usuario.toLowerCase().includes(texto) ||
        opinion.comentario.toLowerCase().includes(texto)
      );
      this.mostrarSnackBar(`Encontradas ${this.opinionesFiltradas.length} opiniones`);
    }
  }

  limpiarBusqueda(): void {
    this.textoBusqueda = "";
    this.errorBusqueda = "";
    this.opinionesFiltradas = [...this.opiniones];
    this.mostrarSnackBar("Búsqueda limpiada");
  }

  simularPull(): void {
    const nuevaOpinion = this.opinionesService.generarOpinionAleatoria();
    this.opinionesService.agregar(nuevaOpinion);
    this.cargarOpiniones();
    this.mostrarSnackBar("Nueva opinión agregada: " + nuevaOpinion.usuario);
  }

  onPull(event: any): void {
    const pullRefresh = event.object;
    setTimeout(() => {
      this.simularPull();
      pullRefresh.refreshing = false;
    }, 1000);
  }

  eliminarOpinion(opinion: Opinion): void {
    this.opinionesService.eliminar(opinion.id);
    this.cargarOpiniones();
    this.mostrarSnackBar(`Opinión de ${opinion.usuario} eliminada`);
  }

  votoPositivo(opinion: Opinion): void {
    opinion.puntuacion = Math.min(5, opinion.puntuacion + 1);
    this.mostrarSnackBar(`Voto positivo para ${opinion.usuario}`);
  }

  votoNegativo(opinion: Opinion): void {
    opinion.puntuacion = Math.max(1, opinion.puntuacion - 1);
    this.mostrarSnackBar(`Voto negativo para ${opinion.usuario}`);
  }

  seleccionarCategoria(opinion: Opinion): void {
    action("Selecciona categoría:", "Cancelar", ["Información", "Sugerencia", "Crítica"])
      .then(result => {
        if (result !== "Cancelar") {
          this.mostrarSnackBar(`Categoría cambiada a: ${result}`);
        }
      });
  }

  mostrarSnackBar(mensaje: string): void {
    this.snackbar.simple(mensaje, "OK");
  }

  volverAListado(): void {
    this.router.navigate(['/search/listado']);
  }

  volverAtras(): void {
    this.router.back();
  }
}