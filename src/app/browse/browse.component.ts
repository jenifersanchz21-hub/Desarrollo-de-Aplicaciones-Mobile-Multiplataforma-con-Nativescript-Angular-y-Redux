// src/app/browse/browse.component.ts
import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Noticias2Service } from '../domain/noticias2.service'
import { FavoritosService } from '../domain/favoritos.service'

@Component({
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  resultados: any[] = [];
  query: string = '';
  isLoading: boolean = false;
  modoFavoritos: boolean = false;

  constructor(
    private noticiasService: Noticias2Service,
    private favoritosService: FavoritosService
  ) {
    console.log("BrowseComponent inicializado");
  }

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  buscarAhora(): void {
    if (!this.query.trim()) return;

    this.isLoading = true;
    this.modoFavoritos = false;
    
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

  // Agregar a favoritos usando SQLite
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

  // Cargar favoritos desde SQLite
  async cargarFavoritos(): Promise<void> {
    try {
      this.modoFavoritos = true;
      const favoritos = await this.favoritosService.obtenerFavoritos();
      this.resultados = favoritos.map(fav => ({
        id: fav.id,
        titulo: fav.nombre,
        fecha: fav.fecha,
        esFavorito: true
      }));
      console.log("Favoritos cargados:", this.resultados.length);
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    }
  }

  onItemTap(item: any): void {
    console.log("Item seleccionado: ", item);
  }

  limpiarBusqueda(): void {
    this.query = '';
    this.resultados = [];
    this.modoFavoritos = false;
  }

  verFavoritos(): void {
    this.cargarFavoritos();
  }

  // Eliminar favorito
  async eliminarFavorito(item: any): Promise<void> {
    if (item.id) {
      try {
        const resultado = await this.favoritosService.eliminarFavorito(item.id);
        if (resultado.exito) {
          alert(`🗑️ "${item.titulo}" eliminado de favoritos`);
          this.cargarFavoritos(); // Recargar la lista
        }
      } catch (error) {
        console.error("Error al eliminar favorito:", error);
      }
    }
  }
}