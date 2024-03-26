import { Component, OnInit } from '@angular/core';
import {NavigationEnd, NavigationStart,Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  home:boolean=true;

  constructor(private router: Router) { 

    // suscribirse a los eventos de navegación
    // así se obtendrá información cada vez que se navegue en la aplicación
    router.events.subscribe(e => {
      // obtener la url navegada con la propiedad url del router

      // los eventos de navegación son varios así que se filtra solo uno
      setTimeout(() => {
      if(e instanceof NavigationEnd){
         this.registrar(this.router.url);
         if (e.urlAfterRedirects == '/home'){
            this.home = true;
         } else {
          this.home = false;
         }
         console.log(e.url);
      }
     
      }, 10);
    });
    
    
  }

  private registrar(url : string){
   
    console.log(url);

  }

  ngOnInit(): void {
  }

}
