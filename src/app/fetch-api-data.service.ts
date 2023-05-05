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

  // Register a new user
  public userRegistration(userDetails: any): Observable<any> {
    const dateRegex = /^(19|20)\d\d\-(1[012]|0[1-9])\-(30|31|0[1-9]|[12]\d)$/;

    // Non-auth POST request
    return this.http.post(apiURL + 'user/register', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Login an existing user
  public userLogin(userDetails: any): Observable<any> {
    // Non-auth POST request
    return this.httpPost('login', userDetails);
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
  public postFavorite(favoriteId: string): Observable<any> {
    console.log('post Favorites: ', favoriteId);
    // The server does not expect a body for this request.
    return this.httpAuthPost(`user/favorite/${favoriteId}`, {});
  }

  // delete Favorites
  public deleteFavorite(favoriteId: string): Observable<any> {
    console.log('del Favorites: ', favoriteId);
    return this.httpAuthDelete(`user/favorite/${favoriteId}`, favoriteId);
  }

  // get Movies (plural)
  public getMovies(): Observable<any> {
    return this.httpGet('movies');
  }

  // get Movie (singular)
  public getMovie(movieTitle: string): Observable<any> {
    return this.httpGet(`movies/title/${movieTitle}`);
  }

  // get Movie by ID
  public getMovieById(movieId: string): Observable<any> {
    return this.httpGet(`movies/id/${movieId}`);
  }

  // get Director
  public getDirector(directorName: string): Observable<any> {
    return this.httpGet(`directors/${directorName}`);
  }

  // get Genre
  public getGenre(genre: string): Observable<any> {
    return this.httpGet(`movies/genre/${genre}`);
  }

  // get an image
  public getImageLink(imageName: string) {
    return `${apiURL}images/${imageName}.jpg`
  }

  // Generic get request without auth
  // returns response data
  private httpGet(endpoint: string): any {
    return this.http.get(apiURL + endpoint)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  // Generic POST request without auth
  // returns response data
  private httpPost(endpoint: string, body: any): any {
    return this.http.post(apiURL + endpoint, body)
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

    return this.http.put(apiURL + endpoint, body, { headers })
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

  // Untyped response data extraction
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

  // private handleError(error: HttpErrorResponse): any {
  //   // There are (unfortunately) several different error objects passed,
  //   // and we have to locate the message differently for each.
  //   let errorMsg: string;

  //   if (error.error) {
  //     if (error.error.info?.message) {
  //       errorMsg = error.error.info.message;

  //     } else if (typeof error.error == 'string') {
  //       errorMsg = error.error;

  //     } else if (Array.isArray(error.error.errors)) {
  //       errorMsg = error.error.errors[0].msg
  //     }
  //   }

  //   return throwError(() => new Error(errorMsg ));
  // }
}
