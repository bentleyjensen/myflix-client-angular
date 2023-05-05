import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FetchApiDataService } from "../fetch-api-data.service";

type User = {
  username: string;
  email: string;
  birthdate: Date | string;
  favorites: any[];
  password: string;
  confirmPassword: string;
};

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  @Input() userDetails: User = {
    username: '',
    email: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
    favorites: [],
  }

  favorites: any[] = [];
  hasFavorites = false;

  constructor (
    public fetchApiDataService: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/'])
    } else {
      this.fetchUser();
    }
  }

  public movieTrackBy(index: number, movie: any): string {
    return movie.id;
  }

  public fetchUser(): void{
    this.fetchApiDataService.getUser().subscribe((res: any) => {
      // res.birthdate = res.split('T')[0];
      this.userDetails = res;
      this.favorites = res.favorites;
      this.hasFavorites = this.favorites.length > 0;
      this.userDetails.birthdate = this.userDetails.birthdate.toString().split('T')[0];
      return this.userDetails;
    });
  }

  public deleteFavorite(id: string): void {
    console.log('delete favorite: ', id);
    this.fetchApiDataService.deleteFavorite(id).subscribe((res: any) => {
      // res is a full user object
      this.userDetails.favorites = res.favorites;
      this.favorites = res.favorites;
      this.hasFavorites = this.favorites.length > 0;
    });
    return;
  }

  public updateUser(): void {
    if (this.userDetails.password !== this.userDetails.confirmPassword) {
      this.snackBar.open('Passwords must match', 'OK', {
        duration: 5000
      });
    }
    console.log('User to be updated: ', this.userDetails);
    this.fetchApiDataService.editUser(this.userDetails).subscribe((res: any) => {
      console.log(res);
      if(res.error) {
        this.snackBar.open(res.error.message, 'OK', {
          duration: 5000
        });
      } else {
        this.snackBar.open('Success!', 'OK', {
          duration: 2000
        });
      }

    });
  }

  public deleteUser(): void {
    this.fetchApiDataService.deleteUser(this.userDetails).subscribe((res: any) => {
      this.snackBar.open('Success!', 'OK', {
        duration: 5000
      });
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    });
  }
}
