import { Component, OnInit, Input } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";
import { ActivatedRoute, Router } from "@angular/router"; 

@Component({
  selector: 'app-ficha-tecnica',
  templateUrl: './ficha-tecnica.component.html',
  styleUrls: ['./ficha-tecnica.component.css']
})
export class FichaTecnicaComponent {

  categoria:any = 1;
  unidades:any = [];
  unidadesExpandibles: { [key: string]: boolean } = {};
  loaderActivo: boolean = false;
  modalGaleria:boolean = false;
  modalObservaciones:boolean = false;
  galeria:any = [];

  constructor(private rently:RentasService, private activeroute:ActivatedRoute, private router: Router) {

    this.rently.getModelos(this.categoria).subscribe((response:any) =>{
      this.unidades = response[0];

/*       for (let i = 0; i < response[0].Models.length; i++) {
          this.unidades.push( response[0].Models[i] );
        
      } */
      console.log(response[0]); 
    });

  }

  expandirInfo(id:any, categoria:any){
    
    const spinner = document.getElementById('loader'+id);
    const contenido = document.getElementById('content'+id);
    const desp = document.getElementById('despliegue1'+id);
    const contraer = document.getElementById('contraer'+id);

    if(desp) {
      desp.style.display = 'none';
    }

    if(contraer) {
      contraer.style.display = 'block';
    }

    if(spinner) {
      spinner.style.display = 'flex';
    }

    this.unidadesExpandibles[id] = !this.unidadesExpandibles[id];

    let fechaActual= this.obtenerFechaActual();

    let fechaSemanal= this.obtenerFechaSemanal();

    this.rently.getFichaTecnica(id,categoria).subscribe((response:any) =>{
      console.log(response);

      Object.keys(response).forEach((key) => {
        
        const elemento = document.getElementById(key+id);

        if (elemento) {

          if( key == "semanal" || key == "precio_mensual"){
            elemento.innerText = '$ ' + new Intl.NumberFormat('en-MX').format(response[key]);
          } else if (key == "diario") {
            console.log(this.unidades.find((unidad: { Id: any; }) => unidad.Id === id));
            let unity = this.unidades.find((unidad: { Id: any; }) => unidad.Id === id);
            elemento.innerText = '$ ' + new Intl.NumberFormat('en-MX').format(unity["DailyPrice"] + response[key]);
          } else {
            elemento.innerText = response[key];
          }
            
        }
          
      });

    if(spinner) {
      spinner.style.display = 'none';
    }

    if(contenido){
      contenido.style.display = 'block';
    }
    });
    
  }

  expandirInfoDos(id:any){
    const contraer = document.getElementById('contraer'+id);
    const desp2 = document.getElementById('despliegue2'+id);

    if(contraer) {
      contraer.style.display = 'block';
    }

    if(desp2) {
      desp2.style.display = 'none';
    }

    this.unidadesExpandibles[id] = !this.unidadesExpandibles[id];
  }

  contraerInfo(id:any){
    const contraer = document.getElementById('contraer'+id);
    const desp2 = document.getElementById('despliegue2'+id);

    if(contraer) {
      contraer.style.display = 'none';
    }

    if(desp2) {
      desp2.style.display = 'block';
    }

    this.unidadesExpandibles[id] = !this.unidadesExpandibles[id];
  }

  estaExpandido(id: string): boolean {
    return !!this.unidadesExpandibles[id];
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    const año = hoy.getFullYear() + 1;
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia} 11:00`;
  }

  obtenerFechaSemanal(): string {
    const hoySem = new Date();
    hoySem.setDate(hoySem.getDate() + 7);
    const añoSem = hoySem.getFullYear() + 1;
    const mesSem = String(hoySem.getMonth() + 1).padStart(2, '0');
    const dia = String(hoySem.getDate()).padStart(2, '0');

    return `${añoSem}-${mesSem}-${dia} 11:00`;
  }

  changeCategoria(categoria:any){
    this.rently.getModelos(categoria).subscribe((response:any) =>{
      this.unidades = response[0];
      console.log(this.unidades);
    });
  }

  verGaleria(id:any){
    this.modalGaleria = true;

    this.rently.getGaleria(id).subscribe((response:any) =>{
      this.galeria = response.data;
    });

  }

  verObservaciones(id:any){
    this.modalObservaciones = true;
  }

  cerrarModal(modal:any){
    this.modalObservaciones = false;
  }

  descargarImagenes(){
    
    const forceDownload = (url: string, filename: string) => {
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', filename);
      a.setAttribute('target', '_blank'); // para abrir en nueva pestaña si el navegador bloquea
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    this.galeria.forEach((url:any, index:any) => {
      forceDownload(url, `imagen_${index}.jpg`);
    });
  }

}
