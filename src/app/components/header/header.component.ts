import { Component, OnInit } from '@angular/core';
import {NavigationEnd, NavigationStart,Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  home:number=1;

  constructor(private router: Router) { 

    // suscribirse a los eventos de navegación
    // así se obtendrá información cada vez que se navegue en la aplicación
    router.events.subscribe(e => {
      // obtener la url navegada con la propiedad url del router

      // los eventos de navegación son varios así que se filtra solo uno
      setTimeout(() => {
      if(e instanceof NavigationEnd){
        console.log(this.router);
         this.registrar(this.router.url);

         const urlPosition = e.urlAfterRedirects;

         const urlParts = e.urlAfterRedirects.split("/");
         console.log(urlParts)

         if (e.urlAfterRedirects == '/home'){
            this.home = 1;
         } else if (urlParts[1] == 'renta-apps' || urlParts[1] == 'requisitos-renta-apps'){
          this.home = 2;
         } else if (urlParts[1] == 'traslados-chofer' || urlParts[1] == 'evento'){
          this.home = 3;
         }
         
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
