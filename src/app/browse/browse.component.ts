// src/app/browse/browse.component.ts
import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Noticias2Service } from '../domain/noticias2.service'
import { FavoritosService } from '../domain/favoritos.service' // ← Nuevo servicio

@Component({
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  resultados: any[] = [];
  query: string = '';
  isLoading: boolean = false;

  constructor(
    private noticiasService: Noticias2Service,
    private favoritosService: FavoritosService // ← Inyectar servicio
  ) {
    console.log("BrowseComponent inicializado");
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  buscarAhora(): void {
    if (!this.query.trim()) return;

    this.isLoading = true;
    this.noticiasService.buscar(this.query).subscribe(
      (resultados: any) => {
        this.resultados = Array.isArray(resultados) ? resultados : [resultados];
        this.isLoading = false;
      },
      (error) => {
        console.error("Error en la búsqueda: ", error);
        this.isLoading = false;
      }
    );
  }

  // ✅ NUEVO MÉTODO: Agregar a favoritos usando SQLite
  async agregarFavorito(noticia: any): Promise<void> {
    const nombre = noticia.title || noticia.titulo || 'Sin título';
    
    try {
      const resultado = await this.favoritosService.agregarFavorito(nombre);
      if (resultado.exito) {
        alert(`✅ "${nombre}" agregado a favoritos`);
      } else {
        alert("❌ Error al agregar a favoritos");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error al agregar a favoritos");
    }
  }

  // ✅ NUEVO MÉTODO: Cargar favoritos desde SQLite
  async cargarFavoritos(): Promise<void> {
    try {
      const favoritos = await this.favoritosService.obtenerFavoritos();
      this.resultados = favoritos.map(fav => ({
        titulo: fav.nombre,
        esFavorito: true, // Para identificar que viene de la BD
        fecha: fav.fecha
      }));
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    }
  }

  cargarDatosIniciales(): void {
    this.cargarFavoritos(); // ← Ahora carga desde SQLite
  }

  onItemTap(item: any): void {
    console.log("Item seleccionado: ", item);
  }

  limpiarBusqueda(): void {
    this.query = '';
    this.cargarFavoritos(); // ← Recargar favoritos al limpiar
  }

  // ✅ NUEVO MÉTODO: Cambiar entre búsqueda y favoritos
  verFavoritos(): void {
    this.cargarFavoritos();
  }
}