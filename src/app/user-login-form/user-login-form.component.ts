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

  // This function is responsible for sending the data to the server
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(result => {
      // Close dialog on success
      this.dialogRef.close();
      this.snackBar.open(result, 'OK', {
        duration: 5000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 5000
      });
    });
  }
}
