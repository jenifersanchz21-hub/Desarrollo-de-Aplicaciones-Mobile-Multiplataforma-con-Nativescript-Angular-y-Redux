import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

@Component({
  selector: 'SaveDetails',
  templateUrl: './save-details.component.html',
})
export class SaveDetailsComponent implements OnInit {
  constructor(private router: Router) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  navigateToList(): void {
    this.router.navigate(['/save'])
  }
}