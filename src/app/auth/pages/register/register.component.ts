import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;

  miFormulario: FormGroup = this.fb.group(
    {
      nombre: ['', [Validators.required]],
      correo: [
        '',
        [
          Validators.pattern(this.validatorService.emailPattern),
          Validators.required,
        ],
      ],
      password: ['', [Validators.minLength(6), Validators.required]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validatorService: ValidatorsService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registro() {
    if (this.miFormulario.valid) {
      const { nombre, correo, password } = this.miFormulario.value;
      this.authService.crearUSuario(nombre, correo, password).subscribe({
        next: (response) => {
          if (response === true) {
            this.mostrarSnackBar('Bienvenido', 'mat-accent');
            this.router.navigateByUrl('/dashboard');
          }else{
            this.mostrarSnackBar(response,'mat-warn')
          }
        },
      });
    }
    this.router.navigateByUrl('/dashboard');
  }

  mostrarSnackBar(message: string, clase: string) {
    //la clase que recibe debe ser porejemplo mat-war , mat-primary etc..
    this.snackBar.open(message, '', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['mat-toolbar', clase],
    });
  }
}
