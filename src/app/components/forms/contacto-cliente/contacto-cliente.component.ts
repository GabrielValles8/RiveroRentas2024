import { Component, OnInit } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-contacto-cliente',
  templateUrl: './contacto-cliente.component.html'
})
export class ContactoClienteComponent implements OnInit {

  url:string = "https://www.riverorenta.mx/api/rently/rently_api.php";
  urlToken:string = "https://multimarca.gruporivero.com/oauth/token";
  urlApi:string = "https://multimarca.gruporivero.com/api/v1/rently";

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


  constructor(private rently:RentasService, private http: HttpClient) {

    if(!sessionStorage.getItem('token')){
      console.log("entra")
      var formData: any = new FormData();
      formData.append("grant_type",'password');
      formData.append("client_id",'95d42dee-0c62-4f0e-a116-5540682870bd');
      formData.append("client_secret",'Tbbs4uff8OW2PodlQLcQlUwboTQcJQ7lcIFdHSob');
      formData.append("username",'ecasas2@gruporivero.com');
      formData.append("password",'Rivero2022!');
      const headers = {"Accept": 'application/json'}; 
      
      this.http.post<any>(this.urlToken, formData,{headers:headers}).subscribe({
        next: data => {
          const token= data.access_token;
          sessionStorage.setItem("token",token);
        },
        error:error => console.log(error)
        }
      );
    }
   }

  ngOnInit(): void {
  }

  createAuthorizationHeader() {
    return {"Accept": 'application/json',"Authorization":'Bearer '+sessionStorage.getItem('token')}; 
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
    "<tr><th>Comentarios:</th><td>"+this.comentarios+"</td></tr>"+
    "</table>";

    this.subject = this.nombre+" SE HA CONTACTADO CON NOSOTROS.";
    this.cliente = ", "+this.nombre+" se ha contactado con nosotros.";
    this.bcc = "inforenta@gruporivero.com";
    this.correo = "inforenta@gruporivero.com";

    if (this.cliente != "" && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.correoCliente)== true && this.correoCliente != "" && this.telefono != "" ) {
      this.loadedSpiner =true;
      this.rently.enviarContactoNuevo(this.correo, this.cliente, this.subject, this.body, this.footer,this.bcc).subscribe((response:any) => {
        this.loadedSpiner =false;
        if (response != 'error') {
          window.location.href = '';

        } else {
          alert("Hubo un problema con el envío de tus datos, intenta más tarde.")
        }
      });
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.correoCliente) == false){
        alert("Correo inválido, asegurate de ingresarlo correctamente");
      } else {
        alert("Campos vacíos. Completa todos los campos del formulario para continuar.")
      }
      
    }

    
  }

}
