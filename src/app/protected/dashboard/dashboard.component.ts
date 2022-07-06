import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Usuario{
  name:string,
  correo:string,
  token : string
}

const usuarios : Usuario[] = [
  {name:'Antonio',correo:'aramirez@gmail.com',token:'dfadfadfa'}
]
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dataSource = usuarios;
  displayedColumns: string[] = ['nombre','correo', 'token'];

  constructor(private router : Router) {}

  ngOnInit(): void {}

  logout(){
    this.router.navigateByUrl('/auth')
  }
}
