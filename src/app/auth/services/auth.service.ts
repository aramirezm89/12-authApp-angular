import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/interfaces';
import {environment} from '../../../environments/environment.prod'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.backendURl;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {

    const url: string = `${this.baseURL}/auth`;
    const body = { email, password };
    console.log(body)
    return this.http.post<AuthResponse>(url,  body );
  }
}


