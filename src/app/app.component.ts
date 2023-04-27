import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}

// import { Component } from '@angular/core';
// import { MatDialog } from "@angular/material/dialog";

// import { UserRegistrationFormComponent } from "./user-registration-form/user-registration-form.component";
// import { UserLoginFormComponent } from "./user-login-form/user-login-form.component";
// import { MovieCardComponent } from './movie-card/movie-card.component';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'myflix-angular-client';

//   constructor(public dialog: MatDialog) { }

//   // click handler to open signup dialog
//   openUserRegistrationDialog(): void {
//     this.dialog.open(UserRegistrationFormComponent, {
//       width: '280px',
//     });
//   }

//   openUserLoginDialog(): void {
//     this.dialog.open(UserLoginFormComponent, {
//       width: '280px'
//     })
//   }

//   openMoviesDialog(): void {
//     this.dialog.open(MovieCardComponent, {
//       width: '500px'
//     });
//   }
// }
