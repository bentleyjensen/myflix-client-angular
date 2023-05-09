import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// Url providing data for the app
// Url should end in slash
// const apiURL = 'http://localhost:8000/';
const apiURL = 'https://shrouded-fortress-53636.herokuapp.com/';

// Importable under root scope
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // http client available to whole class
  constructor(private http: HttpClient) {

  }

  /**
   * Create a new user
   * @param userDetails a user object
   * @returns an observable with the user that was created
   */
  public userRegistration(userDetails: any): Observable<any> {
    const dateRegex = /^(19|20)\d\d\-(1[012]|0[1-9])\-(30|31|0[1-9]|[12]\d)$/;

    // Non-auth POST request
    return this.http.post(apiURL + 'user/register', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param userDetails an object with username and email
   * @returns An observable containing an object with a JWT
   */
  public userLogin(userDetails: any): Observable<any> {
    // Non-auth POST request
    return this.httpPost('login', userDetails);
  }

  /**
   * Get info for the currently logged in user
   * @returns An observable with the full user object
   */
  public getUser(): Observable<any> {
    console.log('get User');
    return this.httpAuthGet('user');
  }

  /**
   * Update information for the user (such as password)
   * @param userDetails A user object
   * @returns An observable with the updated user
   */
  public editUser(userDetails: any): Observable<any> {
    console.log('edit User: ', userDetails);
    return this.httpAuthPut('user', userDetails);
  }

  /**
   * Remove a user from the database
   * @param userDetails a user object
   * @returns an observable with the server response (response body is blank, use HTTP status code)
   */
  public deleteUser(userDetails: any): Observable<any> {
    console.log('delete User: ', userDetails);
    return this.httpAuthDelete('user', userDetails);
  }

  /**
   * Get a list of the user's favorites
   * @deprecated
   * @see getUser
   * @returns Observable with user's favorites
   */
  public getFavorites(): Observable<any> {
    console.log('get Favorites');
    return this.httpAuthGet('/user/favorites');
  }

  /**
   * Add a movie to the user's favorites list
   * @param favoriteId id of a movie
   * @returns Observable with the full user object post-update
   */
  public postFavorite(favoriteId: string): Observable<any> {
    console.log('post Favorites: ', favoriteId);
    // The server does not expect a body for this request.
    return this.httpAuthPost(`user/favorite/${favoriteId}`, {});
  }

  /**
   * Remove a movie from the user's favorites list
   * @param favoriteId id of a movie
   * @returns Observable with the full user object post-update
   */
  public deleteFavorite(favoriteId: string): Observable<any> {
    console.log('del Favorites: ', favoriteId);
    return this.httpAuthDelete(`user/favorite/${favoriteId}`, favoriteId);
  }

  /**
   * Fetch all movies from the server
   * @returns Observable with a list of all movies
   */
  public getMovies(): Observable<any> {
    return this.httpGet('movies');
  }

  /**
   * Fetch one movie from the server, by title
   * @param movieTitle string title of the movie
   * @returns Observable with a movie object
   */
  public getMovie(movieTitle: string): Observable<any> {
    return this.httpGet(`movies/title/${movieTitle}`);
  }

  /**
   * Fetch one movie from the server, by id
   * @param movieId id of the movie
   * @returns Observable with a movie object
   */
  public getMovieById(movieId: string): Observable<any> {
    return this.httpGet(`movies/id/${movieId}`);
  }

  /**
   * Fetch a director from the server
   * @param directorName full name of the director
   * @returns Observable with a director object
   */
  public getDirector(directorName: string): Observable<any> {
    return this.httpGet(`directors/${directorName}`);
  }

  /**
   * Fetch a genre from the server
   * @param genre name of the genre to fetch
   * @returns Observable with a director object
   */
  public getGenre(genre: string): Observable<any> {
    return this.httpGet(`movies/genre/${genre}`);
  }

  /**
   * 
   * @param imageName name of the image (typically equivalent to movieId)
   * @returns href of the image
   */
  public getImageLink(imageName: string): string {
    return `${apiURL}images/${imageName}.jpg`
  }

  /**
   * Generic GET request without auth headers
   * @param endpoint the endpoint to send the request to
   * @returns server response
   */
  private httpGet(endpoint: string): any {
    return this.http.get(apiURL + endpoint)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Generic PUST request without auth headers
   * @param endpoint the endpoint to send the request to
   * @returns server response
   */
  private httpPost(endpoint: string, body: any): any {
    return this.http.post(apiURL + endpoint, body)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Generic get request that tries to set the Authorization: Bearer header
   * @param endpoint the endpoint to send the request to
   * @returns Observable with the server response
   */
  private httpAuthGet(endpoint: string): any {
    const headers = this.getHeaders();
    return this.http.get(apiURL + endpoint, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Generic POST request that tries to set the Authorization: Bearer token
   * @param endpoint the endpoint to send the request to
   * @param body content for the body of the request
   * @returns Observable with the server response
   */
  private httpAuthPost(endpoint: string, body: any): any {
    const headers = this.getHeaders();

    return this.http.post(apiURL + endpoint, body, { headers })
      .pipe(catchError(this.handleError));

  }

  /**
   * Generic PUT request that tries to set the Authorization: Bearer token
   * @param endpoint the endpoint to send the request to
   * @param body content for the body of the request
   * @returns Observable with the server response
   */
  private httpAuthPut(endpoint: string, body: any): any {
    const headers = this.getHeaders();

    return this.http.put(apiURL + endpoint, body, { headers })
      .pipe(catchError(this.handleError));

  }

    /**
   * Generic DELETE request that tries to set the Authorization: Bearer token
   * @param endpoint the endpoint to send the request to
   * @param body content for the body of the request
   * @returns Observable with the server response
   */
  private httpAuthDelete(endpoint: string, body: any): any {
    const headers = this.getHeaders();

    return this.http.delete(apiURL + endpoint, { headers, body })
      .pipe(catchError(this.handleError));

  }


  /**
   * Create headers for a HTTP request
   * @returns headers, including Authorization
   */
  private getHeaders(): HttpHeaders {
    // Token defaults to empty string
    const token = localStorage.getItem('token') || '';

    const headerObj = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': '',
    }

    // Set auth headers if we have a token
    if (token) {
      headerObj.Authorization = 'Bearer ' + token;
    }

    return new HttpHeaders(headerObj);
  }

  /**
   * Extract the data from an HTTP response
   * @param res a response from a HTTP request
   * @returns the body of the HTTP response
   */
  private extractResponseData(res: Object): any {
  // private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  // General Error Handler
  private handleError(error: any): any {
    let defaultErrorMsg: string = 'Default Error Message: Something bad happened. Try again later.';
    let errorMsg: string = defaultErrorMsg;

    if (error.error && typeof error.error == 'string') {
      errorMsg = error.error;
    // } else if (error.error.hasOwnProperty('message')) {
    //   errorMsg = error.error.message;
    } else if (error.error.hasOwnProperty('error') && error.error.error.hasOwnProperty('message')) {
      errorMsg = error.error.error.message;
    } else if (error.errors && Array.isArray(error.errors)) {
      errorMsg = error.errors;
    }

    if (errorMsg === defaultErrorMsg) {
      console.log(error);
    }
    return throwError(errorMsg);
  }
}
