import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { RouterExtensions } from '@nativescript/angular'
import * as appSettings from "tns-core-modules/application-settings"

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  nombreUsuario: string = ''

  constructor(private router: RouterExtensions) {}

  ngOnInit(): void {
    this.cargarNombreUsuario()
  }

  cargarNombreUsuario(): void {
    this.nombreUsuario = appSettings.getString("nombreUsuario", "No configurado")
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  irAEdicion(): void {
    this.router.navigate(['/settings/editar'])
  }
}