import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent {

  constructor(
    public router: Router,
  ) {}

  /**
   * Navigate the user to the movies page
   */
  navigateToMovies() {
    this.router.navigate(['movies']);
  }

  /**
   * Navigate the user to the profile page
   */
  navigateToProfile() {
    this.router.navigate(['profile']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

}
