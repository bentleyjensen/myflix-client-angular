import { Component, Input, OnInit } from '@angular/core';

import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent {
  @Input() movieTitle: string = '';
  public movie: any = {};

  constructor(public fetchApiDataService: FetchApiDataService) {

  }

  ngOnInit(): void {
    this.getMovie(this.movieTitle);
  }

  public getMovie(movieTitle: string): void {
    this.fetchApiDataService.getMovie(movieTitle).subscribe((res: any) => {
      this.movie = res;
      console.log(this.movie);
      return this.movie;
    })
  }

  public getImageLink(): string {
    return this.fetchApiDataService.getImageLink(this.movie._id);
  }

}
