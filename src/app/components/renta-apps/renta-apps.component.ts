import { Component } from '@angular/core';
import { RentasService } from 'src/app/services/rentas.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-renta-apps',
  templateUrl: './renta-apps.component.html',
  styleUrls: ['./renta-apps.component.css']
})
export class RentaAppsComponent {

  autos:any[] = [];
  isLoaded:boolean = true;

  constructor(private rently:RentasService, private router: Router) {

    this.rently.getCategorias().subscribe((data:any) =>{
      this.isLoaded = true;
      const category = data;

      if (category.ErrorCode) {
        this.isLoaded = false;
      } else if(data.length == 0){
       this.isLoaded = false;
      }else{
        for (let i = 0; i < category.length; i++) {
          const vehiculo = category[i].Models;
          for (let j = 0; j < vehiculo.length; j++) {
            const detalle = vehiculo[j];
            if (detalle.Category.Name == "CARROS"){
              this.autos.push(detalle); 
            }
          }
        }
        this.isLoaded = false;
      }
      console.log(this.autos)
    })

  }

  Capitalize(x:any) {
    var parts = x;
    var inicial = parts[0];
    var resto = parts.toLowerCase()
    var marcaFinal = inicial + resto.substring(1);
    return marcaFinal;
  }

  goRentaApps(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/requisitos-renta-apps','14']);
  }

}
