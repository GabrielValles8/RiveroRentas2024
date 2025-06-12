import { Component, Input, OnInit } from '@angular/core';
import { RentasService } from 'src/app/services/rentas.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {

  @Input() title:boolean;
  @Input() description:boolean;

  promociones:any[] = [];
  showForm:boolean=false;
  tituloPop:string="";
  descripionPop:string="";
  imagenPop:string="";
  isLoaded:boolean=false;

  constructor(private rently:RentasService,  private router: Router) { 
    this.isLoaded = true;
    this.getPromociones();
  }

  ngOnInit(): void {
  }

  getPromociones(){
    this.rently.getPromociones().subscribe((response:any) =>{
      this.promociones = response;
        this.isLoaded= false;
    });
  }

  showModal(e:any){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/detalle-promocion',e.id]);
    this.showForm = true;
    this.tituloPop = e.titulo,
    this.descripionPop = e.descripcion;
    this.imagenPop = e.imagen;

  }

  hideModal(){
    this.showForm = false;
    this.tituloPop = "",
    this.descripionPop = "";
    this.imagenPop = "";
  }

}
