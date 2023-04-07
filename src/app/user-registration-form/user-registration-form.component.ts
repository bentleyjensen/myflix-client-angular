import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    username: '',
    password: '',
    email: '',
    birthdate: '',
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  // This function is responsible for sending the data to the server
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(result => {
      // Close dialog on success
      this.dialogRef.close();
      this.snackBar.open(result, 'OK', {
        duration: 5000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 5000
      });
    });
  }
}
