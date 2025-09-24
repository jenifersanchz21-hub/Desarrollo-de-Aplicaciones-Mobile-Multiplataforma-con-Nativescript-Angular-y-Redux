import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, isAndroid, isIOS } from '@nativescript/core'

@Component({
  selector: 'SaveList',
  templateUrl: './save-list.component.html',
  styleUrls: ['./save-list.component.css']
})
export class SaveListComponent implements OnInit {
  platformMessage: string = '';
  platformIcon: string = '';

  constructor(private router: Router) {
    // Código específico para Android usando if
    if (isAndroid) {
      this.platformMessage = 'Ejecutando en Android';
      this.platformIcon = '⚡'; // Ícono diferente para Android
    } else if (isIOS) {
      this.platformMessage = 'Ejecutando en iOS';
      this.platformIcon = ''; // Ícono Apple para iOS
    }
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  navigateToDetails(): void {
    this.router.navigate(['/save/details'])
  }
}