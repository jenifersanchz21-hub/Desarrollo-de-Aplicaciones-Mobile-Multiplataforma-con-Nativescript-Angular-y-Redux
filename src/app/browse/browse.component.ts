import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Noticias2Service } from '../domain/noticias2.service'
import { FavoritosService } from '../domain/favoritos.service'
import * as socialShare from "nativescript-social-share"

@Component({
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  resultados: any[] = []
  query: string = ''
  isLoading: boolean = false
  modoFavoritos: boolean = false

  constructor(
    private noticiasService: Noticias2Service,
    private favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.cargarFavoritos()
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  buscarAhora(): void {
    if (!this.query.trim()) return
    this.isLoading = true
    this.modoFavoritos = false
    
    this.noticiasService.buscar(this.query).subscribe(
      (resultados: any) => {
        this.resultados = Array.isArray(resultados) ? resultados : [resultados]
        this.isLoading = false
      },
      (error) => {
        console.error("Error en la búsqueda: ", error)
        this.isLoading = false
      }
    )
  }

  async agregarFavorito(noticia: any): Promise<void> {
    const nombre = noticia.title || noticia.titulo || 'Sin título'
    try {
      const resultado = await this.favoritosService.agregarFavorito(nombre)
      if (resultado.exito) {
        alert(`✅ "${nombre}" agregado a favoritos`)
      }
    } catch (error) {
      alert("❌ Error al agregar a favoritos")
    }
  }

  async cargarFavoritos(): Promise<void> {
    try {
      this.modoFavoritos = true
      const favoritos = await this.favoritosService.obtenerFavoritos()
      this.resultados = favoritos.map(fav => ({
        id: fav.id,
        titulo: fav.nombre,
        fecha: fav.fecha,
        esFavorito: true
      }))
    } catch (error) {
      console.error("Error al cargar favoritos:", error)
    }
  }

  onItemTap(item: any): void {
    console.log("Item seleccionado: ", item)
  }

  limpiarBusqueda(): void {
    this.query = ''
    this.resultados = []
    this.modoFavoritos = false
  }

  verFavoritos(): void {
    this.cargarFavoritos()
  }

  async eliminarFavorito(item: any): Promise<void> {
    if (item.id) {
      try {
        const resultado = await this.favoritosService.eliminarFavorito(item.id)
        if (resultado.exito) {
          this.cargarFavoritos()
        }
      } catch (error) {
        console.error("Error al eliminar favorito:", error)
      }
    }
  }

  // COMPARTIR TEXTO
  compartirNoticia(item: any): void {
    const titulo = item.title || item.titulo || 'Noticia interesante'
    const descripcion = item.descripcion || item.body || ''
    const texto = `📰 ${titulo}\n\n${descripcion}\n\nCompartido desde mi app NativeScript`
    
    socialShare.shareText(texto)
      .then(() => console.log("Texto compartido"))
      .catch(error => console.error("Error al compartir:", error))
  }
}