import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  favorites: string[] = [];

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar,
    ) {

  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/'])
    } else {
      this.getMovies();
      this.getFavorites();
    }
  }

  /**
   * Pull all the movies from the database and set the state
   */
  getMovies(): void {
    this.fetchApiDataService.getMovies().subscribe((res: any) => {
      this.movies = res;
      return this.movies;
    });
  }

  /**
   * Pull the users data, and create an array of favorites containing movie titles.
   */
  getFavorites(): void {
    this.fetchApiDataService.getUser().subscribe((res: any) => {
      res.favorites.forEach((movie: any) => {
        this.favorites.push(movie._id);
      });
    });
  }

  /**
   * Get the correct server link for the movie posters from the data service
   * @param imageName name of the image to get the link for
   * @returns an href for the image
   */
  getImageLink(imageName: string): string {
    return this.fetchApiDataService.getImageLink(imageName);
  }

  /**
   * Open a modal with genre information
   * @param movie a movie object
   */
  handleGenre(movie: any): void {
    this.dialog.open(GenreModalComponent, {
      width: '50%',
      data: movie.genre,
    });
  }

  /**
   * Open a modal with director information
   * @param movie a movie object
   */
  handleDirector(movie: any): void {
    this.dialog.open(DirectorModalComponent, {
      width: '50%',
      data: movie.director,
    });
  }

  /**
   * Open a modal with more movie information
   * @param movie a movie object
   */
  handleSynopsis(movie: any): void {
    console.log("opening movie: ", movie);
    this.dialog.open(MovieModalComponent, {
      width: '50%',
      data: movie,
    });
  }

  /**
   * Add or remove a movie from a user's favorites list
   * @param id id of the movie to toggle
   */
  toggleFavorite(id: string): void {
    if (this.favorites.includes(id)) {
      this.removeFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }

  /**
   * Remove a movie from the user's favorites
   * @param id id of the movie to remove
   */
  removeFavorite(id: string): void {
    this.fetchApiDataService.deleteFavorite(id).subscribe((res) => {
      const idIdx = this.favorites.indexOf(id);
      this.favorites.splice(idIdx, 1);
      this.snackBar.open('Removed Favorite', 'OK', {
        duration: 3000
      });
    });
  }

  /**
   * Add a movie to the user's favorites
   * @param id id of the movie to add
   */
  addFavorite(id: string): void {
    this.fetchApiDataService.postFavorite(id).subscribe((res) => {
      this.favorites.push(id);
      this.snackBar.open('Added Favorite', 'OK', {
        duration: 3000
      });
    });
  }

}
