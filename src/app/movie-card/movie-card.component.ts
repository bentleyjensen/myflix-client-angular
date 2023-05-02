import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { FetchApiDataService } from "../fetch-api-data.service";

import { GenreModalComponent } from "../genre-modal/genre-modal.component";
import { MovieModalComponent } from "../movie-modal/movie-modal.component";
import { DirectorModalComponent } from "../director-modal/director-modal.component";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public dialog: MatDialog,
    ) {

  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiDataService.getMovies().subscribe((res: any) => {
      this.movies = res;
      return this.movies;
    });
  }

  getImageLink(imageName: string): string {
    return this.fetchApiDataService.getImageLink(imageName);
  }

  handleGenre(movie: any): void {
    this.dialog.open(GenreModalComponent, {
      width: '50%',
      data: movie.genre,
    });
  }

  handleDirector(movie: any): void {
    this.dialog.open(DirectorModalComponent, {
      width: '50%',
      data: movie.director,
    });
  }

  handleSynopsis(movie: any): void {
    console.log("opening movie: ", movie);
    this.dialog.open(MovieModalComponent, {
      width: '50%',
      data: movie,
    });
  }

  toggleFavorite(id: string): void {

  }

}
