import { Component } from '@angular/core';
import { RentasService } from 'src/app/services/rentas.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-requisitos-renta-apps',
  templateUrl: './requisitos-renta-apps.component.html',
  styleUrls: ['./requisitos-renta-apps.component.css']
})

export class RequisitosRentaAppsComponent {

  constructor(private rently:RentasService, private router: Router) { 

  }

  goRentaApps(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/renta-apps']);
  }

}