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

  nombre:string="";
  correo:string="";
  correoRentas:string="";
  telefono:string="";
  dia:string="";
  hora:string="";
  modelo:string="";
  tiempo:string="";
  plataforma:string="";
  mensaje:string="";
  body:string="";
  footer:string="";
  bcc:string="";
  subject:string="";
  loadedSpiner:boolean;
  error:string;
  sensor:string="traslado-chofer";
  status:string="";

  bodyCliente:string="";
  imgUrl:string="";
  precio:string="";
  horas:string="";

  minDate: Date;
  hoy:string="";

  public unidades: Array<any> = [
    { marca: "Chevrolet", color: "Gris" , transmision: "Automático" , status: 1, modelo: "Chevrolet Aveo", promocion: "Desde $7,500 mxn por 5 horas" , img: "assets/images/autos-png/chevrolet-aveo.png", precio:"$7,500 mxn", modelCode: "Chevrolet-Aveo", imgUrl: "https://beta-rentas.gruporivero.com/assets/images/autos-png/chevrolet-aveo.png"},
    { marca: "Nissan", color: "Plata" , transmision: "Automático" , status: 1, modelo: "Nissan March", promocion: "Desde $8,000 mxn por 5 horas" , img: "assets/images/autos-png/nissan-march.png", precio:"$8,000 mxn",  modelCode: "Nissan-March", imgUrl: "https://beta-rentas.gruporivero.com/assets/images/autos-png/nissan-march.png"},
    { marca: "Nissan", color: "Plata" , transmision: "Automático" , status: 0, modelo: "Nissan V-Drive", promocion: "Desde $8,000 mxn por 5 horas" , img: "assets/images/autos-png/nissan-vdrive.png", precio:"$8,000 mxn",  modelCode: "Chevrolet-VDRIVE", imgUrl: "https://beta-rentas.gruporivero.com/assets/images/autos-png/nissan-vdrive.png"}
  ];

  constructor(private rently:RentasService, private router: Router) {


  }

  Capitalize(x:any) {
    var parts = x;
    var inicial = parts[0];
    var resto = parts.toLowerCase()
    var marcaFinal = inicial + resto.substring(1);
    return marcaFinal;
  }

  goRentaApps(auto:any){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/requisitos-renta-apps',auto]);
  }

  selectModelo(modelin:any,promo:any,imagen:any,horas:any,precio:any){
    this.modelo = modelin;
    this.imgUrl = imagen;
    this.precio = precio;
    this.horas = horas;
  }
  
  correoCliente(){
    this.loadedSpiner = true;
    let correoCliente = this.correo;

    this.bodyCliente+= "<div style='justify-content:center;background-color:white;border-radius:10px;padding:5px;'><center><img style='width:4em;margin-right:10px;' src='https://riverorenta.com/assets/images/primorivero.png' alt='Rivero'/><img style='width:7em;' src='https://riverorenta.com/assets/images/logo-rentas-2024.png' alt='Rivero'/></center>"+
    "<h3 style='text-align:center;margin:0px;color:black;'>¡Tu asesor de Confianza!</h3>"+
    "<h2 style='text-align:center;color:black;'>¡GENIAL! YA TIENES TU COTIZACIÓN LISTA</h2>"+
    "<h3 style='text-align:center;color:black;'>Te contactaremos lo más pronto posible para finalizar tu reservación</h3>"+
    "<center><h3 style='text-align:center;color:black;'>"+this.nombre+"</h3><img style='width:20em;' src='"+this.imgUrl+"' alt='Rivero'/></center>"+

    "<center><table  width='450px;' BORDER CELLPADDING=10 CELLSPACING=0>"+

      "<tr><th style='color:black;'>Unidad:</th><td style='color:black;'>"+this.modelo+"</td></tr>"+
      "<tr><th style='color:black;'>Precio:</th><td style='color:black;'>"+this.precio+"</td></tr>"+
      "<tr><th style='color:black;'>Horas:</th><td style='color:black;'>"+this.horas+"</td></tr>"+
      "<tr><th style='color:black;'>Día:</th><td style='color:black;'>"+this.dia+" a las "+this.hora+" hrs</td></tr>"+

    "</table></center>"+
    "<p style='text-align:center;margin-top:10px;color:#003763;font-weight:600;'>Revisa nuestro aviso de privacidad</p>"+
    "<center><a style='text-align:center;margin:0px;color:black;' href='https://riverorenta.com/aviso-privacidad'>https://riverorenta.com/aviso-privacidad</a></center>"+
    "</div>";

    this.subject = " ¡COTIZACIÓN LISTA! "+ this.nombre+" haz realizado una cotización con éxito, encontrarás en este correo la información completa para tu reserva.";
    this.bcc = "jvalles@gruporivero.com";//CAMBIAR A inforenta@gruporivero.com

    if (this.nombre != "" && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(correoCliente) && this.telefono != "") {
      this.rently.enviarContactoNuevo(correoCliente, this.nombre,  this.subject, this.bodyCliente, this.footer , this.bcc).subscribe(resp =>{
        this.isLoaded = true;
        this.reservarCorreo();

      }, error =>{
        alert("Ha ocurrido un error, intente más tarde");
        console.log(error);
        this.loadedSpiner = false;
        this.isLoaded = false;
      })
    }  else {
      this.loadedSpiner = false;
      this.isLoaded = false;
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.correo)){
          alert("Correo Inválido. Verifique que esté bien escrito.")
        } else {
          alert("Complete todos los campos1.")
        }
    }

  }

  reservarCorreo(){

    let correoCliente = this.correo;

    console.log(this.nombre, this.correo , this.telefono , correoCliente, this.hora);

    this.body+= "<h1>RIVERO RENTAS - SOLICITUD DE RESERVACION PARA PLATAFORMAS</h1>"+
    "<h4>INFORMACION DE CONTACTO</h4>"+

    "<table width='600px;' BORDER CELLPADDING=10 CELLSPACING=0>"+

    "<tr><th colspan=2>CLIENTE</th></tr>"+
    "<tr><th>Nombre:</th><td>"+this.nombre+"</td></tr>"+
    "<tr><th>Plataforma:</th><td>"+this.plataforma+"</td></tr>"+
    "<tr><th>Tiempo en Activo:</th><td>"+this.tiempo+"</td></tr>"+
    "<tr><th>Correo:</th><td>"+correoCliente+"</td></tr>"+
    "<tr><th>Telefono:</th><td>"+this.telefono+"</td></tr>"+

    "<tr><th>Modelo:</th><td>"+this.modelo+"</td></tr>";

    if (this.mensaje != ""){
      this.body+="<tr><th>Mensaje:</th><td>"+this.mensaje+"</td></tr>";
    }

    this.body+="</td></tr>"+
    "</table>";

    this.subject = this.nombre+" HA REALIZADO UNA SOLICITUD DE RENTA PARA PLATAFORMA.";
    this.nombre = ", "+this.nombre+" se ha contactado con nosotros para solicitar un vehículo para plataforma.";
    this.bcc = "jvalles@gruporivero.com";
    this.correoRentas = "ccandelaria@gruporivero.com,rentas@gruporivero.com";//CAMBIAR A inforenta@gruporivero.com

    console.log(this.body);

    if (this.nombre != "" && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.correo) && this.correoRentas != "" && this.telefono != "" && correoCliente != "") {
      this.rently.enviarContactoNuevo(this.correoRentas, this.nombre,  this.subject, this.body, this.footer , this.bcc).subscribe(resp =>{

        this.router.navigate(['mil-gracias-por-tu-tiempo',this.sensor]);

      }, error =>{
        alert("Ha ocurrido un error, intente más tarde")
        this.loadedSpiner = false;
        this.isLoaded = false;
      })
    }  else {
      this.loadedSpiner = false;
      this.isLoaded = false;
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.correo)){
          alert("Correo Inválido. Verifique que esté bien escrito.")
        } else {
          alert("Complete todos los campos2.")
        }
    }
  }

}
