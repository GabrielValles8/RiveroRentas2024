import { Component } from '@angular/core';
import { RentasService } from 'src/app/services/rentas.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {

  nombre:string="";
  correo:string="";
  correoRentas:string="";
  telefono:string="";
  dia:string="";
  hora:string="";
  modelo:string="";
  promo:string="";
  municipio:string="";
  mensaje:string="";
  body:string="";
  footer:string="";
  bcc:string="";
  subject:string="";
  loadedSpiner:boolean;
  error:string;
  sensor:string="evento";
  status:string="";

  bodyCliente:string="";
  imgUrl:string="";
  precio:string="";
  horas:string="";

  public unidades: Array<any> = [
    { marca: "Nissan", color: "Rojo" , transmision: "Automático" , modelo: "Altima", promocion: "Desde $4,000 mxn por 5 horas" , img: "assets/images/autos-png/altima-rojo.png", precio:"$4,000 mxn", horas: "5", imgUrl: "https://beta-rentas.gruporivero.com/assets/images/autos-png/altima-rojo.png"},
    { marca: "Cadillac", color: "Plata" , transmision: "Automático" , modelo: "Escalade", promocion: "Desde $8,000 mxn por 5 horas" , img: "assets/images/autos-png/escalade-plata.png", precio:"$8,000 mxn", horas: "5", imgUrl: "https://beta-rentas.gruporivero.com/assets/images/autos-png/escalade-plata.png"}
  ];
  isLoaded:boolean = false;

  constructor(private rently:RentasService, private router: Router) {

  }

  Capitalize(x:any) {
    var parts = x;
    var inicial = parts[0];
    var resto = parts.toLowerCase()
    var marcaFinal = inicial + resto.substring(1);
    return marcaFinal;
  }

  goRentaApps(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/requisitos-renta-apps','14']);
  }

  selectModelo(modelin:any,promo:any,imagen:any,horas:any,precio:any){
    this.modelo = modelin;
    this.promo = promo;
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
    this.bcc = "inforenta@gruporivero.com";
    if (this.nombre != "" && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correoCliente) == true && this.telefono != "" && this.dia != "" && this.hora != "" && this.municipio != "") {
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
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correoCliente) == false){
        alert("Correo Inválido. Verifique que esté bien escrito.")
      } else {
        alert("Complete todos los campos.")
      }
    }

  }

  reservarCorreo(){

    let correoCliente = this.correo;
    let nombreCliente = this.nombre;

    console.log(this.nombre, this.correo , this.telefono , correoCliente, this.hora);

    this.body+= "<h1>RIVERO RENTAS - SOLICITUD DE RESERVACION</h1>"+
    "<h4>INFORMACION DE CONTACTO</h4>"+

    "<table width='600px;' BORDER CELLPADDING=10 CELLSPACING=0>"+

    "<tr><th colspan=2>CLIENTE</th></tr>"+
    "<tr><th>Nombre:</th><td>"+nombreCliente+"</td></tr>"+
    "<tr><th>Correo:</th><td>"+correoCliente+"</td></tr>"+
    "<tr><th>Telefono:</th><td>"+this.telefono+"</td></tr>"+
    "<tr><th>Día:</th><td>"+this.dia+"</td></tr>"+
    "<tr><th>Hora:</th><td>"+this.hora+"</td></tr>"+
    "<tr><th>Modelo:</th><td>"+this.modelo+"</td></tr>"+
    "<tr><th>Municipio:</th><td>"+this.municipio+"</td></tr>";

    if (this.mensaje != ""){
      this.body+="<tr><th>Mensaje:</th><td>"+this.mensaje+"</td></tr>";
    }

    this.body+="</td></tr>"+
    "</table>";

    this.subject = nombreCliente+" SE HA CONTACTADO CON NOSOTROS PARA UN EVENTO.";
    this.nombre = ", "+nombreCliente+" se ha contactado con nosotros por el motivo de evento.";
    this.bcc = "inforenta@gruporivero.com";
    this.correoRentas = "inforenta@gruporivero.com";//CAMBIAR A inforenta@gruporivero.com

    console.log(correoCliente);

    if (nombreCliente != "" && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correoCliente) == true && this.correoRentas != "" && this.telefono != "" && correoCliente != "" && this.dia != "" && this.hora != "" && this.municipio != "") {
      this.rently.enviarContactoNuevo(this.correoRentas, this.nombre,  this.subject, this.body, this.footer , this.bcc).subscribe(resp =>{

        this.router.navigate(['mil-gracias-por-tu-tiempo',this.sensor]);

      }, error =>{
        alert("Ha ocurrido un error, intente más tarde")
        this.loadedSpiner = false;
        this.isLoaded = false;
      })
    }  else {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correoCliente) == false){
          alert("Correo Inválido. Verifique que esté bien escrito.")
        } else {
          alert("Complete todos los campos.")
        }
    }
  }

}
