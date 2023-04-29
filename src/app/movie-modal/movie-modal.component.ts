import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent {
  public movie: any = {};

  constructor(
    public fetchApiDataService: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      _id: string;
      title: string;
      description: string;
      director: {
        name: string;

      };
      year: number;
      genre: {
        name: string;
        description: string;
      };
    }
  ) {

  }

  ngOnInit(): void {
    this.getMovie(this.data.title);
  }

  public getMovie(movieTitle: string): void {
    this.fetchApiDataService.getMovie(movieTitle).subscribe((res: any) => {
      this.movie = res;
      console.log(this.movie);
      return this.movie;
    })
  }

  public getImageLink(): string {
    return this.fetchApiDataService.getImageLink(this.data._id);
  }

}
