import { Component, Input, OnInit } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [  ]
})

export class HomeComponent implements OnInit {

  carga:boolean = false;
  promociones:any[] = [];

  public beneficios: Array<any> = [
    { texto: "Servicio de emergencia 24 horas los 7 días a la semana.", icono: "assets/images/icons/iconos-beneficios/servicio-24-horas-icono.png"},
    { texto: "Crédito para empresas.", icono: "assets/images/icons/iconos-beneficios/credito-para-empresas.png"},
    { texto: "Tarifas competitivas.", icono: "assets/images/icons/iconos-beneficios/tarifas-competitivas.png"},
    { texto: "Seguro y mantenimientos incluidos.", icono: "assets/images/icons/iconos-beneficios/seguros-mantenimientos-incluidos.png"},
  ];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    /* Prevent Saturday and Sunday for select. */
    return day !== 0 && day !== 6 ;
}

  constructor(private rently:RentasService, private router: Router) { 

    this.getPromociones();
  }

  ngOnInit(): void {
    this.carga = true;
  }

  getPromociones(){
    this.rently.getPromociones().subscribe((response:any) =>{
      this.promociones = response;
    });
  }

  goFlotillas(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/empresarial']);
  }

  goRentaApps(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/renta-apps']);
  }

  goEventos(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/evento']);
  }

  goTraslados(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/traslados-chofer']);
  }

  goRequisitos(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/requisitos']);
  }

}
