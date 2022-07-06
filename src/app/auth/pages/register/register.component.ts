import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.email]],
    password: ['', [Validators.minLength(6)]],
    password2: ['', [Validators.minLength(6)]],
  });
  constructor(private fb: FormBuilder,private router:Router) {}

  ngOnInit(): void {}

  registro() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
     this.router.navigateByUrl('/dashboard');
  }
}
