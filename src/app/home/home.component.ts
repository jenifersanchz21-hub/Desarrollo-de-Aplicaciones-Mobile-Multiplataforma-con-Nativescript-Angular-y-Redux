import { Component } from '@angular/core'

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  // COMPARTIR IMAGEN LOCAL DESDE ASSETS
  compartirSample1(): void {
    this.compartirImagenLocal("~/app/assets/images/sample1.jpeg");
  }

  compartirSample2(): void {
    this.compartirImagenLocal("~/app/assets/images/sample2.jpeg");
  }

  compartirSample3(): void {
    this.compartirImagenLocal("~/app/assets/images/sample3.jpeg");
  }

  // COMPARTIR MÚLTIPLES IMÁGENES LOCALES
  compartirTodasLasImagenes(): void {
    const imagenes = [
      "~/app/assets/images/sample1.jpeg",
      "~/app/assets/images/sample2.jpeg", 
      "~/app/assets/images/sample3.jpeg"
    ];
    
    this.compartirMultiplesImagenes(imagenes);
  }

  // MÉTODO PRIVADO PARA COMPARTIR UNA IMAGEN
  private compartirImagenLocal(rutaImagen: string): void {
    try {
      const socialShare = require("nativescript-social-share");
      socialShare.shareImage(rutaImagen, "Imagen desde mi app")
        .then(() => console.log("Imagen compartida: " + rutaImagen))
        .catch(error => {
          console.error("Error:", error);
          alert("No se pudo compartir: " + rutaImagen);
        });
    } catch (error) {
      alert("Plugin no disponible");
    }
  }

  // MÉTODO PRIVADO PARA COMPARTIR MÚLTIPLES IMÁGENES
  private compartirMultiplesImagenes(rutas: string[]): void {
    try {
      const socialShare = require("nativescript-social-share");
      socialShare.shareImages(rutas, "Mis imágenes")
        .then(() => console.log("Múltiples imágenes compartidas"))
        .catch(error => alert("Error al compartir múltiples imágenes"));
    } catch (error) {
      alert("Plugin no disponible");
    }
  }

  // COMPARTIR TEXTO (por si acaso)
  compartirTexto(): void {
    try {
      const socialShare = require("nativescript-social-share");
      socialShare.shareText("¡Mira estas imágenes de mi app NativeScript! 📱");
    } catch (error) {
      alert("Plugin no disponible");
    }
  }
}