import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.backendURl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}


  crearUSuario(name:string,email:string,password:string){
    const url: string = `${this.baseURL}/auth/new`;
    const usuario = {name,email,password}
    return this.http.post<AuthResponse>(url,usuario).pipe(
      tap(authResponse =>{
        if(authResponse.ok){
          localStorage.setItem('token', authResponse.token!);
          this._usuario = { name: authResponse.name!, uid: authResponse.uid! };
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.message))
    )
  }

  login(email: string, password: string) {
    const url: string = `${this.baseURL}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((authResponse) => {
        if (authResponse.ok) {
          localStorage.setItem('token', authResponse.token!);
          this._usuario = { name: authResponse.name!, uid: authResponse.uid! };
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.message))
    );
  }


  validarToken(): Observable<boolean>{
    const url: string = `${this.baseURL}/auth/renew`;
    const headers = new HttpHeaders().set('x-token',localStorage.getItem('token') || '')
    return this.http.get<AuthResponse>(url,{headers}).pipe(
      map(authResponse =>{
           localStorage.setItem('token', authResponse.token!);
           this._usuario = { name: authResponse.name!, uid: authResponse.uid! };
        return authResponse.ok
      }),
      catchError(err => of(false))
    )
  }

  logout(){
    localStorage.removeItem('token');
  }
}
