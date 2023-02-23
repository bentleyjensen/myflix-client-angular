import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// Url providing data for the app
// Url should end in slash
const apiURL = 'YOUR_HOSTED_API_URL_HERE/';

// Importable under root scope
@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // http client available to whole class
  constructor(private http: HttpClient) {

  }

  // Register a new user
  public userRegistration(userDetails: any): Observable<any> {
    console.log('register user: ', userDetails);
    // Non-auth POST request
    return this.http.post(apiURL + 'user/register', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Login an existing user
  public userLogin(userDetails: any): Observable<any> {
    console.log('user Login: ', userDetails);
    // Non-auth POST request
    return this.http.post(apiURL + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // get User
  public getUser(): Observable<any> {
    console.log('get User');
    return this.httpAuthGet('user');
  }

  // edit User
  public editUser(userDetails: any): Observable<any> {
    console.log('edit User: ', userDetails);
    return this.httpAuthPut('user', userDetails);
  }

  // delete User
  public deleteUser(userDetails: any): Observable<any> {
    console.log('delete User: ', userDetails);
    return this.httpAuthDelete('user', userDetails);
  }

  // get Favorites
  // This might not work. The server doesn't have an endpoint for this specifically
  // Might want to GET /user and return the populated favorites?
  public getFavorites(): Observable<any> {
    console.log('get Favorites');
    return this.httpAuthGet('/user/favorites');
  }

  // post Favorites
  public postFavorites(favoriteId: string): Observable<any> {
    console.log('post Favorites: ', favoriteId);
    // The server does not expect a body for this request.
    return this.httpAuthPost(`user/favorite/${favoriteId}`, {});
  }

  // delete Favorites
  public deleteFavorites(favoriteId: string): Observable<any> {
    console.log('del Favorites: ', favoriteId);
    return this.httpAuthDelete(`user/favorite/${favoriteId}`, favoriteId);
  }

  // get Movies (plural)
  public getMovies(): Observable<any> {
    console.log('get Movies');
    return this.httpGet('movies');
  }

  // get Movie (singular)
  public getMovie(movieTitle: string): Observable<any> {
    console.log('get Movie: ', movieTitle);
    return this.httpGet(`movies/title/${movieTitle}`);
  }

  // get Director
  public getDirector(directorName: string): Observable<any> {
    console.log('get Director: ', directorName);
    return this.httpGet(`directors/${directorName}`);
  }

  // get Genre
  public getGenre(genre: string): Observable<any> {
    console.log('get Genre: ', genre);
    return this.httpGet(`movies/genre/${genre}`);
  }

  // Generic get request without auth
  // returns response data
  private httpGet(endpoint: string): any {
    return this.http.get(apiURL + endpoint)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  // Generic get request that tries to set the Authorization: Bearer header
  // returns response data
  private httpAuthGet(endpoint: string): any {
    const headers = this.getHeaders();
    return this.http.get(apiURL + endpoint, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  private httpAuthPost(endpoint: string, body: any): any {
    const headers = this.getHeaders();

    return this.http.post(apiURL + endpoint, body, { headers })
      .pipe(catchError(this.handleError));

  }

  private httpAuthPut(endpoint: string, body: any): any {
    const headers = this.getHeaders();

    return this.http.post(apiURL + endpoint, body, { headers })
      .pipe(catchError(this.handleError));

  }

  private httpAuthDelete(endpoint: string, body: any): any {
    const headers = this.getHeaders();

    return this.http.delete(apiURL + endpoint, { headers, body })
      .pipe(catchError(this.handleError));

  }


  private getHeaders(): HttpHeaders {
    // Token defaults to empty string
    const token = localStorage.getItem('token') || '';

    // Set auth headers if we have a token
    let headers = new HttpHeaders();
    if (token) {
      headers = new HttpHeaders({
        Authorization: 'Bearer ' + token,
      });
    }

    return headers;
  }

  // Untyped response data extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  // General Error Handler
  private handleError(error: HttpErrorResponse): any {
    // Check for nested error
    if (error.error instanceof ErrorEvent) {
      console.error('Error: ', error.error.message); 
    } else {
      // not nested error
      console.error(
        `Error Status code ${error.status}\n` +
        `Error body is: ${error.error}`);
    }

    return throwError(() => new Error('Error in Fetch API data service'))
  }
}
