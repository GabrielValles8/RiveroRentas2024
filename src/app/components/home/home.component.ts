import { Component, OnInit } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";
import { Router, ActivatedRoute } from "@angular/router";

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

  constructor(private rently:RentasService, private router: Router, private route: ActivatedRoute) { 

    this.getPromociones();

      this.route.queryParams.subscribe(params => {
        console.log(params);

        const utm_source = params['utm_source'];
        const utm_campaign = params['utm_campaign'];
        const gclid = params['gclid'];

        console.log('Source:', utm_source);
        console.log('Campaign:', utm_campaign);
        console.log('GCLID:', gclid);
      });
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

    this.router.navigate(['/empresarial'], {
      queryParamsHandling: 'merge'
    });
  }

  goRentaApps(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.router.navigate(['/renta-apps'], {
      queryParamsHandling: 'merge'
    });
  }

  goEventos(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.router.navigate(['/evento'], {
      queryParamsHandling: 'merge'
    });
  }

  goTraslados(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.router.navigate(['/traslados-chofer'], {
      queryParamsHandling: 'merge'
    });
  }

  goRequisitos(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    
    this.router.navigate(['/requisitos'], {
      queryParamsHandling: 'merge'
    });
  }

}
