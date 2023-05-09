import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: 'app-director-modal',
  templateUrl: './director-modal.component.html',
  styleUrls: ['./director-modal.component.scss']
})
export class DirectorModalComponent {
  movies: any[] = [];

  constructor(
    public fetchApiDataService: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      birthdate: string | Date;
      bio: string;
      movies: string[];
    },
  ) {

  }

  ngOnInit(): void {
    this.populateMovies();
    this.setBirthdate();
  }

  /**
   * Set the date to a string in the correct format (mm/dd/yyyy)
   */
  private setBirthdate(): void {
    let tmpDate: Date;

    if (typeof this.data.birthdate == 'string') {
      tmpDate = new Date(this.data.birthdate);
    }
    else if (this.data.birthdate instanceof Date)
      tmpDate = this.data.birthdate;
    else
      throw new Error('birthdate is the wrong type');

    this.data.birthdate = tmpDate.toLocaleDateString();
  }

  /**
   * Take the full movie objects passed in, and create an array of just their titles
   */
  private populateMovies(): void {
    const tmpMovies: string[] = [];
    this.data.movies.forEach((movieId) => {
      this.fetchApiDataService.getMovieById(movieId).subscribe((res: any) => {
        tmpMovies.push(res.title);
        return res.title;
      });
    });
    this.movies = tmpMovies;
    console.log(this.movies);
  }
}
