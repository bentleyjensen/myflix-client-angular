import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  @Input() loginData = {
    username: '',
    password: '',
  }

  constructor (
    public router: Router,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Send data to the server to perform the login. Save the JWT.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(result => {
      // Close dialog on success
      this.dialogRef.close();

      // A true success is a JWT in the response
      if (result && result.token) {
        // Store the JWT
        localStorage.setItem('token', result.token);

        // Notify the user
        this.snackBar.open('Success!', 'OK', {
          duration: 2000
        });
        // Send them to the movies
        this.router.navigate(['movies']);
      }
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 5000
      });
    });
  }
}
