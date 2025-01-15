import { Component, OnInit } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";
import { ActivatedRoute, Router } from "@angular/router"; 

@Component({
    selector: 'traslado-chofer-form',
    templateUrl: './traslado-chofer-form.component.html'
  })

  export class FormTrasladosChoferComponent implements OnInit {

    nombre:string="";
    correo:string="";
    correoRentas:string="";
    telefono:string="";
    dia:string="";
    hora:string="";
    modelo:string="";
    mensaje:string="";
    body:string="";
    footer:string="";
    bcc:string="";
    subject:string="";
    loadedSpiner:boolean;
    error:string;
    sensor:string="traslado-chofer";
    status:string="";

    constructor(private rently:RentasService, private activeroute:ActivatedRoute, private router: Router) { 

    }

    ngOnInit(): void {
    }

    sendContact(){

    }

    reservarCorreo(){

      let correoCliente = this.correo;
  
      this.loadedSpiner = true;
  
      console.log(this.nombre, this.correo , this.telefono , correoCliente, this.hora);
  
      this.body+= "<h1>RIVERO RENTAS - SOLICITUD DE RESERVACION</h1>"+
      "<h4>INFORMACION DE CONTACTO</h4>"+
  
      "<table width='600px;' BORDER CELLPADDING=10 CELLSPACING=0>"+
  
      "<tr><th colspan=2>CLIENTE</th></tr>"+
      "<tr><th>Nombre:</th><td>"+this.nombre+"</td></tr>"+
      "<tr><th>Correo:</th><td>"+correoCliente+"</td></tr>"+
      "<tr><th>Telefono:</th><td>"+this.telefono+"</td></tr>"+
      "<tr><th>Día:</th><td>"+this.dia+"</td></tr>"+
      "<tr><th>Hora:</th><td>"+this.hora+"</td></tr>"+
      "<tr><th>Mensaje:</th><td>"+this.mensaje+"</td></tr>"+
      "<tr><th>Modelo:</th><td>"+this.modelo+"</td></tr>";
  
      this.body+="</td></tr>"+
      "</table>";
  
      this.subject = this.nombre+" SE HA CONTACTADO CON NOSOTROS PARA UN TRASLADO CON CHOFER.";
      this.nombre = ", "+this.nombre+" se ha contactado con nosotros por el motivo de traslado con chofer.";
      this.bcc = "ccandelaria@gruporivero.com";
      this.correoRentas = "inforenta@gruporivero.com";//CAMBIAR A inforenta@gruporivero.com
  
      if (this.nombre != "" && this.correoRentas != "" && this.telefono != "" && correoCliente != "" ) {
        this.rently.enviarContactoNuevo(this.correoRentas, this.nombre,  this.subject, this.body, this.footer , this.bcc).subscribe(resp =>{
  
          this.router.navigate(['mil-gracias-por-tu-tiempo',this.sensor]);
  
        }, error =>{
          alert("Ha ocurrido un error, intente más tarde")
          this.loadedSpiner = false;
        })
      } else {
        alert("Complete todos los campos.");
        this.loadedSpiner = false;
      }
     }

  }