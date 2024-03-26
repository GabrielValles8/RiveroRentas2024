import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { MatCardModule } from '@angular/material/card';

import * as moment from "moment";
import { supportsScrollBehavior } from '@angular/cdk/platform';
interface Horario {
  value: string;
  viewValue: string;
}

const today = new Date();

const month = today.getMonth();
const year = today.getFullYear();
const day = today.getDay();

@Component({
  selector: 'app-home-renta',
  templateUrl: './home-renta.component.html',
  styles: [
  ]
  
})


export class HomeRentaComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  campaignOne = new FormGroup({
    start: new FormControl( moment().add(2, "days").format("YYYY-MM-DD")),
    end:new  FormControl( moment().add(4, "days").format("YYYY-MM-DD")),
  });
  
  horarios: Horario[] = [
    {value: '10:00', viewValue: '10:00'},
    {value: '10:30', viewValue: '10:30'},
    {value: '11:00', viewValue: '11:00'},
    {value: '11:30', viewValue: '11:30'},
    {value: '12:00', viewValue: '12:00'},
    {value: '12:30', viewValue: '12:30'},
    {value: '13:00', viewValue: '13:00'},
    {value: '13:30', viewValue: '13:30'},
    {value: '14:00', viewValue: '14:00'},
    {value: '14:30', viewValue: '14:30'},
    {value: '15:00', viewValue: '15:00'},
    {value: '15:30', viewValue: '15:30'},
    {value: '16:00', viewValue: '16:00'},
    {value: '16:30', viewValue: '16:30'},
    {value: '17:00', viewValue: '17:00'},
    {value: '17:30', viewValue: '17:30'},
    {value: '18:00', viewValue: '18:00'}
  ];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    /* Prevent Saturday and Sunday for select. */
    return day !== 0 ;
}

  filter: number;
  filterLic: number;
  sltCarList:any[] = [
    {id: 5, type: 'Carros', isChecked: false, img: "assets/images/botones/btn_unidad_carros.png", select: "assets/images/botones/btn_unidad_carros.png"},
    {id: 31, type: 'Suvs', isChecked: false, img: "assets/images/botones/btn_unidad_suvs.png", select: "assets/images/botones/btn_unidad_suvs.png"},
    {id: 9, type: 'Pasajeros', isChecked: false, img: "assets/images/botones/btn_unidad_pasajeros.png", select: "assets/images/botones/btn_unidad_pasajeros.png"},
    {id: 16, type: 'Carga', isChecked: false, img: "assets/images/botones/btn_unidad_carga.png", select: "assets/images/botones/btn_unidad_carga.png"}
  ];
  //Variables seccion
  sltLicenseNl: boolean = false;
  sltLicenseFo: boolean =false;
  license: string = 'local';
  
  //Variables seccion fecha
  fecha:any = new Date();
  minFechaInicio:any;
  fechaInicio:any;
  minFechaEntrega:any;
  fechaEntrega:any;
  minEntrega:any;
  minDate2:any;
  fromDate = new FormControl(moment(this.fecha, "DD-MM-YYYY HH:mm").add(1, "days").format());
  toDate = new FormControl(moment(this.fecha, "DD-MM-YYYY HH:mm").add(2, "days").format());

  constructor(private datepipe: DatePipe, private router: Router) { 

    let date: Date = new Date();
    let horaNum = date.getHours();

    if (horaNum < 9) {
      horaNum = 10 - horaNum;
    } else {
      horaNum = 0;
    }

    let currentYear = new Date();
    currentYear.setDate(currentYear.getDate()+1);
    this.minDate = currentYear;
  
    this.minFechaInicio =new Date();
    this.minFechaEntrega =  moment().add(1, "days").format("DD-MM-YYYY HH:mm");

    this.filter = 0;
    this.filterLic = 0;
    this.minFechaInicio =new Date();
    this.minFechaEntrega =  moment().add(1, "days").format("DD-MM-YYYY HH:mm");
    this.fechaInicio = moment().add(1, 'days').add(horaNum, 'hours').format("YYYY-MM-DD 11:00");
    this.fechaEntrega = moment().add(2, 'days').format("YYYY-MM-DD 11:00");
  }

  ngOnInit(): void {
  }

  setInicio(e:any){
   
    let fechaActual = moment(e, "DD-MM-YYYY HH:mm").day();
    this.fechaInicio = moment(e, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
    //this.fechaInicio = new Date(this.fechaInicio);
    if (fechaActual !== 6) {
      
      this.fechaEntrega = moment(e, "DD-MM-YYYY HH:mm").add(1, "days").format("YYYY-MM-DD HH:mm");
      this.toDate = new FormControl(moment(e, "DD-MM-YYYY HH:mm").add(1, "days").format());
    } else {
    
      this.fechaEntrega = moment(e, "DD-MM-YYYY HH:mm").add(2, "days").format("YYYY-MM-DD HH:mm");
     
      this.toDate = new FormControl(moment(e, "DD-MM-YYYY HH:mm").add(2, "days").format());
    }
    this.minEntrega = moment(e, "DD-MM-YYYY HH:mm").add(1, "days").format();

  }

  setEntrega(e:any){
    this.fechaEntrega = moment(e, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
    this.toDate = new FormControl(moment(e, "DD-MM-YYYY HH:mm").format());
  }

  onAddingCar(i:any){
    console.log(i);
    if (this.sltCarList[i].isChecked == true) {
        this.sltCarList[i].isChecked = false;
    } else {
        this.sltCarList[i].isChecked = true;
    }
  }

  onAddingLicenseNl(fechaInicio:any, fechaEntrega:any, carros:any, suvs:any, pasajeros:any, carga:any){
    const quad = (document.getElementById('manualFecha1') as HTMLInputElement).value;
    const quik = (document.getElementById('manualFecha2') as HTMLInputElement).value;

    let stringFecha = quad;
    const [d, m, y] = stringFecha.split('/');
    let dateConversion = new Date(`${y}/${m}/${d}`);
    var ft1 = dateConversion.toLocaleString();

    let stringFecha2 = quik;
    const [D, M, Y] = stringFecha2.split('/');
    let dateConversion2 = new Date(`${Y}/${M}/${D}`);
    var ft2 = dateConversion2.toLocaleString();

    let quad1 = moment(quad, "DD-MM-YYYY");
    let quik1 = moment(quik, "DD-MM-YYYY");

    if (quad1 >= quik1 || quad == null || quik == null || quad == '' || quik == '' || ft1 === 'Invalid Date' || ft2 === 'Invalid Date' ) {
      alert('Fechas Inválidas, seleccione correctamente el plazo deseado.')
    } else {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    this.router.navigate(['/resultado-filtro', fechaInicio , fechaEntrega , carros , suvs , pasajeros, carga , "local"])
    }

/*  //this.sltLicenseNl = !this.sltLicenseNl;
    if (this.sltLicenseNl == true) {
      this.sltLicenseFo = false;
      this.sltLicenseNl = false;
      this.license = '';
    } else {
      this.sltLicenseFo = false;
      this.sltLicenseNl = true;
      this.license = 'local';
    } */
  }

  onAddingLicenseFo(fechaInicio:any, fechaEntrega:any, carros:any, suvs:any, pasajeros:any, carga:any){
    const quad = (document.getElementById('manualFecha1') as HTMLInputElement).value;
    const quik = (document.getElementById('manualFecha2') as HTMLInputElement).value;

    let stringFecha = quad;
    const [d, m, y] = stringFecha.split('/');
    let dateConversion = new Date(`${y}/${m}/${d}`);
    var ft1 = dateConversion.toLocaleString();

    let stringFecha2 = quik;
    const [D, M, Y] = stringFecha2.split('/');
    let dateConversion2 = new Date(`${Y}/${M}/${D}`);
    var ft2 = dateConversion2.toLocaleString();

    let quad1 = moment(quad, "DD-MM-YYYY");
    let quik1 = moment(quik, "DD-MM-YYYY");

    if (quad1 >= quik1 || quad == null || quik == null || quad == '' || quik == '' || ft1 === 'Invalid Date' || ft2 === 'Invalid Date' ) {
      alert('Fechas Inválidas, seleccione correctamente el plazo deseado.')
    } else {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    this.router.navigate(['/resultado-filtro', fechaInicio , fechaEntrega , carros , suvs , pasajeros, carga , "foraneo"])
    }
/*     //this.sltLicenseFo = !this.sltLicenseFo;
    if (this.sltLicenseFo == true) {
      this.sltLicenseFo = false;
      this.sltLicenseNl = false;
      this.license = '';
    } else {
      this.sltLicenseFo = true;
      this.sltLicenseNl = false;
      this.license = 'foraneo';
      
    } */
  }

  resultado(){
    this.router.navigate(['/resultado-filtro', this.fechaInicio])
  }
  
/*   dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement,hora: HTMLInputElement) {
    this.fechaInicio=moment(dateRangeStart.value,"DD-MM-YYYY").format("YYYY-MM-DD")+" "+hora.value;
    this.fechaEntrega=moment(dateRangeEnd.value,"DD-MM-YYYY").format("YYYY-MM-DD")+" "+hora.value;

    // EN ESTE APARTADO, SE ELIMINO EL %20 EN LA SECCION DEL MOMENTO +" "+hora.value YA QUE CAUSABA PROBLEMAS AL CONTRUIR LA URL
  } */

  dateStartChange(dateRangeStart: HTMLInputElement) {
    let date: Date = new Date();
    let horaNum = date.getHours();

    if (horaNum < 9) {
      horaNum = 9;
    }

    this.fechaInicio=moment(dateRangeStart.value,"DD-MM-YYYY HH:mm").add(horaNum, "hour").format("YYYY-MM-DD 11:00");
    this.minDate2 = moment(dateRangeStart.value,"DD-MM-YYYY").add(2, "days").format("YYYY-MM-DD");

    const quick = document.getElementById('manualFecha2');
    if (quick != null) { 
      quick.removeAttribute("disabled");
    }

  }

  dateEndChange(dateRangeEnd: HTMLInputElement) {
    let date: Date = new Date();
    let horaNum = date.getHours();

    if (horaNum < 9) {
      horaNum = 9;
    }

    this.fechaEntrega=moment(dateRangeEnd.value,"DD-MM-YYYY HH:mm").add(horaNum, "hour").format("YYYY-MM-DD 11:00");
  }

  filterLicense(){
    const quad = (document.getElementById('manualFecha1') as HTMLInputElement).value;
    const quik = (document.getElementById('manualFecha2') as HTMLInputElement).value;

    let stringFecha = quad;
    const [d, m, y] = stringFecha.split('/');
    let dateConversion = new Date(`${y}/${m}/${d}`);
    var ft1 = dateConversion.toLocaleString();

    let stringFecha2 = quik;
    const [D, M, Y] = stringFecha2.split('/');
    let dateConversion2 = new Date(`${Y}/${M}/${D}`);
    var ft2 = dateConversion2.toLocaleString();

    let quad1 = moment(quad, "DD-MM-YYYY");
    let quik1 = moment(quik, "DD-MM-YYYY");

    if (quad1 >= quik1 || quad == null || quik == null || quad == '' || quik == '' || ft1 === 'Invalid Date' || ft2 === 'Invalid Date') {
      alert('Fechas Inválidas, seleccione correctamente el plazo deseado.')
    } else {

      if (window.matchMedia("(min-width: 480px)").matches) {
      } else {
        window.scroll({
          top: 255,
          left: 0,
          behavior: 'smooth',
        });
      }

      const cotizador = document.getElementById('cuadro-licencia');

      if (cotizador != null) {
        cotizador.classList.add('filtro-homeActive');
      }
  
      if (this.filterLic == 0){
        this.filterLic = 1
      } else {
        this.filterLic = 0
      }
    }

  }

  showFiltroHome(){

    this.filter = 1;
    
    const cotizador = document.getElementById('cuadro-home');

    if (cotizador != null) {
      cotizador.classList.add('filtro-homeActive');
    }

    const quad = document.getElementById('div-filter');

    if (quad != null) {
      quad.classList.add('div-filter-Active');
    }
  }

  close(){

    const cotizador = document.getElementById('cuadro-home');
    const selLic = document.getElementById('cuadro-licencia');
    const quad = document.getElementById('div-filter');

    if (quad != null) {
      quad.classList.remove('div-filter-Active');
    }

    if (cotizador != null) {
      cotizador.classList.remove('filtro-homeActive');
    }

    if (selLic != null) {
      selLic.classList.remove('filtro-homeActive');
    }

    this.filter = 0;
    this.filterLic = 0;
  }

  manualDate(){
    const quad = document.getElementById('manualFecha1');
    const quick = document.getElementById('manualFecha2');
    const quor = document.getElementById('pickDate2');

    let eco = this.minDate.toLocaleString();

    var fechaSplit = eco.split(",");

    var fechaSplit1 = eco.split("/");

    var diaX = Number(fechaSplit1[0]);
    var mesX = Number(fechaSplit1[1]);
    let fechon1 = '0';

    if (diaX < 10){
      var dia = diaX.toLocaleString();
      dia = '0'+diaX;
      fechon1 = dia+'/';
    } else {
      var dia = diaX.toLocaleString();
      fechon1 = dia+'/';
    }

    if (mesX < 10){
      var mes = mesX.toLocaleString();
      mes = '0'+mesX;
      fechon1 = fechon1 + mes+'/';
    } else {
      var mes = mesX.toLocaleString();
      fechon1 = fechon1 + mes+'/';
    }

    fechon1 = fechon1 + fechaSplit1[2].substr(0,4);

    if (quad != null && quick != null && quor != null) {
      quad.setAttribute("value",fechon1);  
      this.fechaInicio = moment(fechon1,"DD-MM-YYYY HH:mm").format("YYYY-MM-DD 11:00"); 
      this.minDate2 =  moment(fechon1,"DD-MM-YYYY").add(2,"days").format("YYYY-MM-DD"); 
      quick.removeAttribute("disabled");
      quor.removeAttribute("disabled");
    }
}

  manualDate2(){
    const quick = document.getElementById('manualFecha2');
    const queb = (document.getElementById('manualFecha1') as HTMLInputElement).value;

    var newFecha = moment(queb,"DD-MM-YYYY").add(1,"days").format("DD/MM/YYYY");

    if (quick != null) {
      quick.setAttribute("value",newFecha);
      this.fechaEntrega = moment(newFecha,"DD-MM-YYYY HH:mm").format("YYYY-MM-DD 11:00"); 
    }
    //var newFecha =moment(quad, "DD-MM-YYYY").format("DD-MM-YYYY"); 
  }

}
