import { Component } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import * as appSettings from "tns-core-modules/application-settings"

@Component({
  selector: 'EditarUsuario',
  templateUrl: './editar-usuario.component.html',
})
export class EditarUsuarioComponent {
  nuevoNombre: string = ''

  constructor(private router: RouterExtensions) {}

  guardarNombre(): void {
    if (this.validarNombre()) {
      appSettings.setString("nombreUsuario", this.nuevoNombre)
      this.router.navigate(['/settings'], { clearHistory: true })
    }
  }

  validarNombre(): boolean {
    return this.nuevoNombre.trim().length >= 2
  }

  cancelar(): void {
    this.router.back()
  }
}