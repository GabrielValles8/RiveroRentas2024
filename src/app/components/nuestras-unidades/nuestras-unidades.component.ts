import { Component, OnInit , ViewEncapsulation , Renderer2} from '@angular/core';
import { RentasService } from 'src/app/services/rentas.service';
import { MatCardModule } from '@angular/material/card';
import { FormControl, Validators,FormGroup, Form } from "@angular/forms";
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import * as moment from "moment";

@Component({
  selector: 'app-nuestras-unidades',
  templateUrl: './nuestras-unidades.component.html',
  styleUrls: ['./nuestras-unidades.component.css']
})
export class NuestrasUnidadesComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  campaignOne = new FormGroup({
    start: new FormControl( moment().add(2, "days").format("YYYY-MM-DD")),
    end:new  FormControl( moment().add(4, "days").format("YYYY-MM-DD")),
  });

  unidades:any[] = [];
  autos:any[] = [];
  suvs:any[] = [];
  pickups:any[] = [];
  pasajeros:any[] = [];
  carga:any[] = [];
  error:string = '';
  isLoaded:boolean = true;
  showForm:boolean = false;

  //Contenido modal
  autoSelect:any=null;
  autoImg:any=null;
  calendar1:boolean = true;
  calendar2:boolean = false;

  fecha:any = new Date();
  fromDate = new FormControl(moment(this.fecha, "DD-MM-YYYY HH:mm").add(1, "days").format());
  toDate = new FormControl(moment(this.fecha, "DD-MM-YYYY HH:mm").add(2, "days").format());
  fechaS:Date;
  fechaS2:Date;
  fechaBlock:Date;
  classe:any=["mat-calendar-body-cell-content mat-focus-indicator"];
  diaClave:any=0;
  sensor:any=0;
  diaSelected:any;
  modalLicencia:boolean = false;

  fechaInicio:any;
  fechaEntrega:any;

  fromV:any;
  toV:any;
  modeloV:any;

  disponibilidad:boolean=true;
  reservaLista:boolean=false;
  similares:boolean=false;

  categoriaSelect:any;

  constructor(private rently:RentasService, private renderer: Renderer2) { 

    this.disableDays(this.classe);
    this.fechaInicio =  moment().add(1, "days").format("YYYY-MM-DD");
    this.fechaEntrega =  moment().add(3, "days").format("YYYY-MM-DD");

    let currentYear = new Date();
    currentYear.setDate(currentYear.getDate()+1);
    this.minDate = currentYear;

    let currentMonth = new Date();
    currentMonth.setMonth(currentMonth.getMonth()+4);

    this.fechaS = currentMonth;

    let currentYear2 = new Date();
    currentYear2.setDate(currentYear2.getDate()+3);
    this.fechaS2 = currentYear2;

    this.rently.getCategorias().subscribe((data:any) =>{
      this.isLoaded = true;
      const category = data;
     console.log(category);
      if (category.ErrorCode) {
        this.isLoaded = false;
        this.error = category.ErrorMessage;
      } else if(data.length == 0){
       this.isLoaded = false;
       this.error = "No se encontraron resultados, intente con diferente fecha.";
      }else{
        for (let i = 0; i < category.length; i++) {
          const vehiculo = category[i].Models;
          for (let j = 0; j < vehiculo.length; j++) {
            const detalle = vehiculo[j];
            if (detalle.Category.Name == "CARROS"){
              this.autos.push(detalle); 
            } else if (detalle.Category.Name == "SUV"){
              this.suvs.push(detalle);
            } else if (detalle.Category.Name == "PICK UP"){
              this.pickups.push(detalle);
            } else if (detalle.Category.Name == "PASAJEROS"){
              this.pasajeros.push(detalle);
            } else if (detalle.Category.Name == "CARGA"){
              this.carga.push(detalle);
            }
          }        
        }

        console.log(this.unidades);
        this.isLoaded = false;
      }
    })

  }

  showModal(auto:any,img:any,model:any,categoria:any){
    console.log(categoria, "Auto-Model")
    this.showForm = true;
    this.autoSelect = auto;
    this.autoImg = img;
    this.modeloV = model;
    this.categoriaSelect = categoria;
    this.ngBeforeViewInit();
  }

  hideModal(){
    window.location.reload();
  }

  myFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();

      /* Prevent Saturday and Sunday for select. */
      return day !== 0 ;
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.fechaInicio=moment(dateRangeStart.value,"DD-MM-YYYY").format("YYYY-MM-DD");
    this.fechaEntrega=moment(dateRangeEnd.value,"DD-MM-YYYY").format("YYYY-MM-DD");

    // EN ESTE APARTADO, SE ELIMINO EL %20 EN LA SECCION DEL MOMENTO +" "+hora.value YA QUE CAUSABA PROBLEMAS AL CONTRUIR LA URL
  }

  changeDate(fechin:Date){
    console.log(fechin);
    this.disponibilidad = true;
    this.similares = false;
    this.checkDisponible();
    this.fromV = moment(fechin,"DD-MM-YYYY").format("YYYY-MM-DD 11:00");
    let currentDate = new Date(fechin);
    console.log(currentDate);
    currentDate.setDate(fechin.getDate()+1);
    console.log(currentDate);
    let currentMonth = new Date();
    currentMonth.setMonth(fechin.getMonth()+4);
    this.fechaBlock = currentDate;
    var detFec = fechin;
    var fechaSplit = detFec.toString().split(" ");
    this.diaClave = fechaSplit[2];
    this.fechaS = fechin;
    this.fechaS2 = currentMonth;

    this.calendar1 = false;
    
    setTimeout(() => {
      this.disableDays(this.classe);
      this.ngAfterViewInit();
      this.ngBeforeViewInit();
    }, 10);
    this.calendar2 = true;
  }

  ngAfterViewInit() {

    const buttons = document
     .querySelectorAll('.mat-calendar-previous-button');
    
    if (buttons) {
      console.log(buttons);
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          if (this.showForm== true){
            this.sensor = this.sensor - 1;
          }

          if (this.sensor == 0){
            setTimeout(() => {
              this.disableDays(this.classe);
            }, 10);
          }

        });
      });
    }
  }

  ngBeforeViewInit() {
    const buttons = document
     .querySelectorAll('.mat-calendar-next-button');
    
    if (buttons) {

      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this.sensor = this.sensor + 1;
          console.log(this.sensor);
          if (this.sensor == 0){
            setTimeout(() => {
              this.disableDays(this.classe);
            }, 10);
          }

        });
      });
    }
  }

  changeDateS(fechin:Date){
    if (this.reservaLista == true){
      this.sensor = 0;
      this.reservaLista = false;

      let currentYear = new Date();
      currentYear.setDate(currentYear.getDate()+1);
      this.minDate = currentYear;
  
      let currentMonth = new Date();
      currentMonth.setMonth(currentMonth.getMonth()-4);
  
      this.fechaS = currentMonth;
      this.diaClave = currentMonth;
      console.log(this.fechaS);
  
      let currentYear2 = new Date();
      currentYear2.setDate(currentYear2.getDate()+3);
      this.fechaS2 = currentYear2;

      this.fechaInicio =  moment().add(1, "days").format("YYYY-MM-DD");
      this.fechaEntrega =  moment().add(3, "days").format("YYYY-MM-DD");
      this.disponibilidad = true;
      this.similares = false;
      this.xDisponible();
      this.calendar2 = false;
      this.calendar1 = true;
      this.diaSelected = null;
      setTimeout(() => {
        console.log("ChangeDateS");
        this.ngAfterViewInit();
        this.ngBeforeViewInit();
      }, 10);

    } else {
      this.fechaS2 = fechin;
      this.selectedDays(this.classe);
      var detFec = fechin;
      var fechaSplit = detFec.toString().split(" ");
      this.diaSelected = fechaSplit[2];
      this.toV = moment(fechin,"DD-MM-YYYY").format("YYYY-MM-DD 11:00");
      this.validarReserva(this.fromV, this.toV, this.modeloV, 'local');
    }

  }

  validarReserva(fromV:any , toV:any, modeloV:any , licens:any){

    this.rently.getReservacion(fromV, toV, modeloV).subscribe((response:any) =>{
      if (response.ErrorCode == "3") {
        this.disableDays(this.classe);
        this.selectedDays(this.classe);
        let currentYear = new Date();
        currentYear.setDate(currentYear.getDate()+1);
        this.minDate = currentYear;
    
        let currentMonth = new Date();
        currentMonth.setMonth(currentMonth.getMonth()-4);
        this.diaClave = currentMonth;
        
        this.fechaS = currentMonth;
    
        let currentYear2 = new Date();
        currentYear2.setDate(currentYear2.getDate()+3);
        this.fechaS2 = currentYear2;

        this.fechaInicio =  moment().add(1, "days").format("YYYY-MM-DD");
        this.fechaEntrega =  moment().add(3, "days").format("YYYY-MM-DD");
        this.disponibilidad = false;
        this.similares = true;
        this.xDisponible();
        this.calendar2 = false;
        this.calendar1 = true;
        this.diaSelected = null;
        this.sensor = 0;

        this.rently.getInitialSearch(this.fromV, this.toV).subscribe((data: any) =>{
          if(data.length == 0){

          } else {
            this.similares = true;
            const similar = document.getElementById('btnSimilares');
            if (similar != null){
                similar.classList.add('similarActivo');
            }
          }
        });

        setTimeout(() => {
          console.log("ValidarReserva");
          this.ngAfterViewInit();
          this.ngBeforeViewInit();
        }, 10);

      } else {
        this.reservaLista=true;
        this.checkReserva();
        //window.location.href = "envia-tu-reserva/"+fromV+"/"+ toV +"/"+modeloV+"/"+licens;
      }
    });

  }

  goLicencia(){
    this.modalLicencia = true;
    this.showForm = false;
  }

  goReserva(tipoLicencia:any){
    window.location.href = "envia-tu-reserva/"+this.fromV+"/"+ this.toV +"/"+this.modeloV+"/"+tipoLicencia;
  }

  goSimilares(fe1:any,fe2:any,categoria:any){

    if (categoria == "CARROS"){
      categoria = "true/false/false/false";
    } else if (categoria == "SUV"){
      categoria = "false/true/false/false";
    } else if (categoria == "PICK UP"){
      categoria = "false/false/false/true";
    } else if (categoria == "CARGA"){
      categoria = "false/false/false/true";
    } else if (categoria == "PASAJEROS"){
      categoria = "false/false/true/false";
    }
    window.location.href = "resultado-filtro/"+ fe1 +"/"+ fe2 +"/"+categoria+"/local";
  }

  fechaFormat(x:any){
    let fecha = x;
    var newFecha =moment(fecha, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY");
    return newFecha;
  }

  disableDays(days: string[]) {
    const dayElements = document.querySelectorAll(
      '.mat-calendar-body-cell-content'
    );
    let i=0;
    Array.from(dayElements).forEach((element) => {

      i++;
      const matchingDay = days.find((d) => d === element.getAttribute('class')) !== undefined;
      let c = 'demoClass'+i;

      if (this.diaClave == i){
        this.renderer.addClass(element, 'demoClass');
        this.renderer.setAttribute(element, 'disabled', '');
      }

    });
  }

  selectedDays(days: string[]) {
    const dayElements = document.querySelectorAll(
      '.mat-calendar-body-cell-content'
    );
    let i=0;
    Array.from(dayElements).forEach((element) => {

      i++;
      const matchingDay = days.find((d) => d === element.getAttribute('class')) !== undefined;
      let c = 'demoClass'+i;

      if (this.diaSelected == i){
        this.renderer.addClass(element, 'selectClass');
      }

    });
  }

  xDisponible(){
    const cotizador = document.getElementById('text-disp');
    if (cotizador != null){
        cotizador.classList.add('showDisp');
      }
  }

  checkDisponible(){
    const cotizador = document.getElementById('text-disp');
    if (cotizador != null){
        cotizador.classList.remove('showDisp');
      }
  }

  xReserva(){
    const cotizador = document.getElementById('btn-NU-continuar');
    if (cotizador != null){
        cotizador.classList.remove('hideBTN-NU');
      }
  }

  checkReserva(){
    const cotizador = document.getElementById('btn-NU-continuar');
    if (cotizador != null){
        cotizador.classList.add('showBTN-NU');
    }
  }

  ngOnInit(): void {
  }

}
