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

  public fetchUser(): void{
    const myUser: User = {
      username: 'Bentimus',
      email: 'bentimus@maximus.com',
      birthdate: '1996-07-19',
      password: '',
      confirmPassword: '',
      favorites: [
        {
          _id: '6293196ff04c1332bdae9494',
          title: 'Inception',
        },{
          _id: '6293196ff04c1332bdae9495',
          title: 'Batman Begins',
        },{
          _id: '6293196ff04c1332bdae9493',
          title: 'Interstellar',
        },
      ],
    }

    this.userDetails = myUser;
  }

  public deleteFavorite(): void {

  }

  public updateUser(): void {

  }

  public deleteUser(): void {

  }
}
