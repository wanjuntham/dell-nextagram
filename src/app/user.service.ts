import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const baseUrl = 'https://insta.nextacademy.com/api/v1'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

const signedInHttpOptions = authToken => {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authToken,
    }),
  }
}

interface SignupResponse {
  auth_token: string
  message: string
  status: string
  user: BackendUser
}

interface BackendUser {
  id: number
  profile_picture: string
  username: string
}

interface SignupData {
  username: string
  email: string
  password: string
}

interface AuthResponse {
  status: string
  auth_token: string
  message: string
  user: BackendUser
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

  submitSignUp(data: SignupData) {
    const url = `${baseUrl}/users/`
    const params = data

    this.http.post(url, params, httpOptions).subscribe(response => {
      const responseData = response as AuthResponse
      console.log(responseData.user.id)

      localStorage.setItem('authToken', responseData.auth_token)
    })
  }

  getMyImages() {
    const url = `${baseUrl}/images/me/`
    const authToken = localStorage.getItem('authToken')
    const options = signedInHttpOptions(authToken)

    this.http.get(url, options).subscribe(response => {
      console.log(response)
    })
  }

  submitLogin(data) {
    const url = `${baseUrl}/login`

    this.http.post(url, data, httpOptions).subscribe(response => {
      const responseData = response as AuthResponse
      localStorage.setItem('authToken', responseData.auth_token)
    })
  }
}
