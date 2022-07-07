import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable ,of,tap} from 'rxjs';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import {environment} from '../../../environments/environment.prod'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.backendURl;
  private _usuario! : Usuario;

  get usuario(){
    return {...this._usuario}
  }
  constructor(private http: HttpClient) {}

  login(email: string, password: string){

    const url: string = `${this.baseURL}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url,  body )
          .pipe(
            tap(authResponse =>{
              if(authResponse.ok){
                this._usuario = {name:authResponse.name!,uid:authResponse.uid!}
              }
            }),
            map(resp =>resp.ok),
            catchError(err => of(err.error.message))
          );
  }
}


