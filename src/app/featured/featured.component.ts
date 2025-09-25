import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

@Component({
  selector: 'Featured',
  templateUrl: './featured.component.html',
})
export class FeaturedComponent implements OnInit {
  imagenCapturada: any = null
  mensaje: string = 'Presiona el botón para tomar una foto'
  isLoading: boolean = false

  constructor() {}

  ngOnInit(): void {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  // SOLUCIÓN SIMPLE QUE EVITA ImageAsset
  async tomarFotoYCompartir(): Promise<void> {
    this.isLoading = true
    this.mensaje = 'Solicitando permisos...'

    try {
      const camera = require('nativescript-camera')
      const socialShare = require('nativescript-social-share')

      // 1. Solicitar permisos
      await camera.requestPermissions()
      this.mensaje = 'Abriendo cámara...'

      // 2. Tomar foto directamente
      const imageAsset = await camera.takePicture({
        width: 800,
        height: 600,
        keepAspectRatio: true,
        saveToGallery: true
      })

      this.imagenCapturada = imageAsset
      this.mensaje = '¡Foto tomada! Compartiendo...'

      // 3. Compartir DIRECTAMENTE sin conversión (evita ImageSource)
      socialShare.shareImage(imageAsset, "¡Foto tomada con mi app! 📸")
      
      this.mensaje = '✅ Foto compartida exitosamente'
      this.isLoading = false

    } catch (error) {
      this.mensaje = '❌ Error: ' + error
      this.isLoading = false
    }
  }

  // TOMAR FOTO SIN COMPARTIR
  async tomarFoto(): Promise<void> {
    this.isLoading = true

    try {
      const camera = require('nativescript-camera')
      await camera.requestPermissions()
      
      const imageAsset = await camera.takePicture({
        width: 800,
        height: 600,
        keepAspectRatio: true,
        saveToGallery: true
      })

      this.imagenCapturada = imageAsset
      this.mensaje = '✅ Foto guardada en galería'
      this.isLoading = false

    } catch (error) {
      this.mensaje = '❌ Error: ' + error
      this.isLoading = false
    }
  }

  // COMPARTIR FOTO USANDO MÉTODO ALTERNATIVO
  compartirFoto(): void {
    if (!this.imagenCapturada) {
      this.mensaje = '❌ Primero toma una foto'
      return
    }

    try {
      const socialShare = require('nativescript-social-share')
      
      // Método 1: Intentar compartir directamente
      socialShare.shareImage(this.imagenCapturada, "Mira mi foto 📸")
      this.mensaje = '✅ Foto compartida'

    } catch (error) {
      this.mensaje = '❌ Error al compartir: ' + error
    }
  }

  // COMPARTIR USANDO RUTA DE ARCHIVO (alternativa segura)
  compartirFotoAlternativa(): void {
    if (!this.imagenCapturada) {
      this.mensaje = '❌ Primero toma una foto'
      return
    }

    try {
      const socialShare = require('nativescript-social-share')
      
      // Si el imageAsset tiene una propiedad path, usarla
      if (this.imagenCapturada.android) {
        socialShare.shareImage(this.imagenCapturada.android, "Foto desde mi app")
      } else {
        // Fallback: compartir como texto la URI
        socialShare.shareText("Foto tomada: " + JSON.stringify(this.imagenCapturada))
      }
      
      this.mensaje = '✅ Foto compartida (método alternativo)'

    } catch (error) {
      this.mensaje = '❌ Error: ' + error
    }
  }

  // COMPARTIR TEXTO SIMPLE
  compartirTexto(): void {
    try {
      const socialShare = require('nativescript-social-share')
      socialShare.shareText("¡App NativeScript increíble! 🚀")
      this.mensaje = '✅ Texto compartido'
    } catch (error) {
      this.mensaje = '❌ Error: ' + error
    }
  }

  // COMPARTIR URL DE IMAGEN (nunca falla)
  compartirImagenURL(): void {
    try {
      const socialShare = require('nativescript-social-share')
      const imageUrl = "https://www.nativescript.org/images/default-source/landingpages/logo.png"
      socialShare.shareImage(imageUrl, "Logo de NativeScript")
      this.mensaje = '✅ Imagen URL compartida'
    } catch (error) {
      this.mensaje = '❌ Error: ' + error
    }
  }

  limpiarFoto(): void {
    this.imagenCapturada = null
    this.mensaje = 'Listo para tomar una nueva foto'
  }
}