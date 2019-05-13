import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

const baseUrl = 'https://insta.nextacademy.com/api/v1'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

const authorizedHttpOptions = (authToken: string) => {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    }),
  }
}

interface User {
  id: number
  profile_picture: string
  username: string
}

interface LoginResponse {
  auth_token: string
  message: string
  status: string
  user: User
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${baseUrl}/users`)
  }

  getUserImages(userId: number) {
    return this.http.get(`${baseUrl}/images?userId=${userId}`)
  }


  getMyImages() {
    const authToken = localStorage.getItem('authToken')

    return this.http.get(
      `${baseUrl}/images/me`,
      authorizedHttpOptions(authToken)
    )
  }


  signUp(data: Object){
    this.http.post(`${baseUrl}/users/`, data, httpOptions)
    .pipe(catchError(this.handleError))
    .subscribe(response => {
      console.log(response)
    })
  }

  login(data: Object){
    this.http
      // .post(`${baseUrl}/login`, data, httpOptions)
      .post<LoginResponse>(`${baseUrl}/login`, data, httpOptions)
      .subscribe(response => {
        // const authToken = (response as LoginResponse).auth_token
        const authToken = response.auth_token

        // authorizedHttpOptions(authToken)
        localStorage.setItem('authToken', authToken)
      })
  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message)
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      )
    }
    return throwError('Something bad happened; please try again later.')
  }
}
