import { Component } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";
import { ActivatedRoute, Router } from "@angular/router"; 

@Component({
  selector: 'app-detalle-promocion',
  templateUrl: './detalle-promocion.component.html',
  styleUrls: ['./detalle-promocion.component.css']
})

export class DetallePromocionComponent {

  code:string="";

  promocion:any[] = [];
  modelos:any[] = [];
  banner:string="";
  modeloInteres:string;
  auto:string;
  nombre:string="";
  correo:string="";
  correoCliente:string="";
  cliente:string="";
  telefono:string="";
  body:string="";
  footer:string="";
  comentarios:string="";
  bcc:string="";
  subject:string="";
  loadedSpiner:boolean;
  promo:string="";

  queryParams: any;

  constructor(private rently:RentasService, private activeroute:ActivatedRoute, private router: Router) {

    this.activeroute.params.subscribe(params => {     
      this.code = params["code"];
      this.queryParams = this.activeroute.snapshot.queryParams;
      console.log(this.queryParams);
    });

    this.rently.getPromocion().subscribe((response:any) =>{
      console.log(this.code);

      for (let i = 0; i < response.length; i++) {
        if(response[i].Id == this.code){
          this.banner = 'https://d3s2hob8w3xwk8.cloudfront.net/promos/rentas/'+response[i].Id+'/img-promo.jpg';
          this.promo = 'ID Promoción: '+ response[i].Id + ' - ' + response[i].Name + ' - ' + response[i].Description;
          /* this.banner = response[i].ImagePath; */

          if(response[i].Models.length > 0){
            for (let j = 0; j < response[i].Models.length; j++) {
              if(j==0){
                this.auto = response[i].Models[j].Name;
              }
              this.modelos.push({ modelo: response[i].Models[j].Name}) 
            }
          }

          this.promocion.push({ id: response[i].Id, nombre: response[i].Name,  descripcion: response[i].Description,  img: response[i].ImagePath });
        }
      }
      
    });
    }

    sendContactNuevo(){

      this.body = "<h1>RIVERO RENTAS CONTACTO</h1>"+
      "<h4>INFORMACION DE CONTACTO</h4>"+

      "<table width='600px;' BORDER CELLPADDING=10 CELLSPACING=0>"+

      "<tr><th colspan=2 bgcolor='#BDBDBD'>CLIENTE</th></tr>"+
      "<tr><th>Nombre:</th><td>"+this.nombre+"</td></tr>"+
      "<tr><th>Correo:</th><td>"+this.correoCliente+"</td></tr>"+
      "<tr><th>Telefono:</th><td>"+this.telefono+"</td></tr>"+

      "<tr><th colspan=2 bgcolor='#BDBDBD'>INFORMACIÓN</th></tr>"+
      "<tr><th>Auto de interés:</th><td>"+this.auto+"</td></tr>"+
      "<tr><th>Promoción solicitada:</th><td>"+this.promo+"</td></tr>"+
      "</table>";

      this.subject = this.nombre+" SE HA CONTACTADO CON NOSOTROS POR UNA PROMOCIÓN.";
      this.cliente = ", "+this.nombre+" se ha contactado con nosotros por una promoción.";
      this.bcc = "inforenta@gruporivero.com";
      this.correo = "inforenta@gruporivero.com";
      //console.log(this.body);

      if (this.cliente != "" && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.correoCliente)== true && this.correoCliente != "" && this.telefono != "" ) {
        this.loadedSpiner =true;
        this.rently.enviarContactoNuevo(this.correo, this.cliente, this.subject, this.body, this.footer,this.bcc).subscribe((response:any) => {
          this.loadedSpiner =false;
          if (response != 'error') {
            this.rently.leadPromo(this.nombre, this.correoCliente, this.telefono, this.auto, this.queryParams.utm_source, this.queryParams.utm_medium, this.queryParams.utm_campaign, this.queryParams.cnname, this.queryParams.utm_content, this.queryParams.utm_term).subscribe((response:any) => {});
            window.location.href = '';

          } else {
            alert("Hubo un problema con el envío de tus datos, intenta más tarde.")
          }
        });
      } else {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.correoCliente) == false){
          alert("Correo inválido, asegurate de ingresarlo correctamente");
        } else {
          alert("Campos vacíos. Completa todos los campos del formulario para continuar.")
        }
        
      }
      
    }

  }

