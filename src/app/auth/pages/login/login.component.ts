import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6),Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login() {

    if (this.miFormulario.valid ) {
       const { email, password } = this.miFormulario.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response === true) {

            this.mostrarSnackBar('Bienvenido','mat-accent')

            this.router.navigateByUrl('/dashboard');

          }else{
               this.mostrarSnackBar(response , 'mat-warn');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }




  }

  mostrarSnackBar(message: string, clase: string) {

    //la clase que recibe debe ser porejemplo mat-war , mat-primary etc..
    this.snackBar.open(message,'', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['mat-toolbar', clase],
    })

  }
}
