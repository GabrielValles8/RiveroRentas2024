import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class RentasService {

  url:string = "https://www.riverorenta.mx/api/rently/rently_api.php";
  urlToken:string = "https://multimarca.gruporivero.com/oauth/token";
  urlApi:string = "https://multimarca.gruporivero.com/api/v1/rently";
  urlFicha:string = "https://multimarca.gruporivero.com/api/v1";
  urlBeta:string = "http://127.0.0.1:8000/api/v1";

  constructor( private http: HttpClient) {

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

   createAuthorizationHeader() {
    return {"Accept": 'application/json',"Authorization":'Bearer '+sessionStorage.getItem('token')}; 
  }

   postQuery( data:any ){
    const url = "https://www.riverorenta.mx/api/rently/rently_api.php";
    return this.http.post(url, data);
   }

   getInitialSearch(from:any, to:any){
     const headers = this.createAuthorizationHeader(); 
     const body={from: from, to: to, fromPlace: 6}
    return this.http.get<any>(this.urlApi+'/initialSearch',{headers:headers,params:body});
   }

   getReservacion(from:any, to:any, modelid: any){
     const data = {q: 'enviaReservacion', from: from, to: to, modelid: parseInt(modelid)};
     const dato = {data:data};
     //return this.postQuery(data);
     console.log(dato);
     return this.http.post(this.url, dato);
   }

   getAdicionales(from:any, to:any, modelid:any){
    const headers = this.createAuthorizationHeader(); 
    const body={from: from, to: to, modelId: parseInt(modelid),category:16}
    console.log(body, "bodyyy");
    return this.http.get<any>(this.urlApi+'/additional',{headers:headers,params:body});
   } 

   getCategorias(){
    const headers = this.createAuthorizationHeader(); 
     //const body={from: from+' 10:00', to: to+' 10:00', fromPlace: 6}
     //console.log(body);
     //return this.http.get<any>(this.urlApi+'/initialSearch',{headers:headers,params:body});
    return this.http.get<any>(this.urlApi+'/categories',{headers:headers});
   }

   getPromociones(){
    const data = {
      q: "getPromociones"
    }
     const headers = this.createAuthorizationHeader(); 
     const param = {
      data: data
     }
    // return this.http.get<any>(this.urlApi+'/promociones',{headers:headers, });
    return this.http.post<any>(this.url, param);
   }

   reservar(additionals:any, from:any, to:any, modelid:any, nombre:string, email:string, telefono:string){
     const data = {
       "q": 'reservar', Additionals: additionals, From: from, To:to, Modelid:parseInt(modelid), 
       Customer:{
         Name: nombre, EmailAddress: email, CellPhone: telefono, DocumentId: '4568623147'
       }
     }
     const dato = {data:data};
     return this.http.post(this.url, dato);
     
   }

   checkout(email:string, nombre:string, modeloName:string, total:any){
    let date = new Date();
    const data = {
      successUrl: "",
      cancelUrl: "https://www.riverorenta.mx/api/netpay/cancelCheckout",
      customerEmail:email,
      customerName:nombre,
      paymentMethodTypes: ["card"],
      merchantRefCode: "Renta-" + date.getTime(),
      lineItems: [
        {
          name: "Reserva " + modeloName,
          amount: parseFloat(total),
          quantity: 1,
          currency: "MXN",
        },
      ],
      linkType: "NETPAY_CHECKOUT",
    }

     return this.http.post("https://www.riverorenta.mx/api/netpay/sendCheckout/", JSON.stringify(data));
   }

   enviarContacto(nombre:string, correo:string, telefono:string, comentarios:string){
    const data = {
      nombre: nombre, correo: correo, telefono:telefono, comentarios: comentarios 
    }
    const dato = {data:data};

    console.log(data,"este es data")
    return this.http.post("https://www.riverorenta.mx/api/rently/send_mail_contact.php", dato);
   }

   enviarContactoRenta(nombre:string, empresa:string, correo:string, telefono:string, comentarios:string){
    const data = {
      nombre: nombre, empresa:empresa, correo: correo, telefono:telefono, comentarios: comentarios 
    }
    const dato = {data:data};
    return this.http.post("https://www.riverorenta.mx/api/rently/send_mail_contact_empresarial.php", dato);
   }

   enviarContactoNuevo(correo:string, cliente:string, subject:string, body:string, footer:string, bcc:string){
    const headers = this.createAuthorizationHeader(); 
    const data = {
      to: correo, clientName:cliente, subject: subject, body:body, footer: footer , bcc: bcc
    }
    const dato = {data:data};
    return this.http.post<any>("https://multimarca.gruporivero.com/api/v1/send/email", data, {headers:headers});
   }

   subirVideo(archivo:FormData){
    const data = archivo;
    return this.http.post<FormData>('https://www.riverorenta.mx/seminuevos/images/vista-360/upload_video_rentas.php', data);
   }

    getPromocion(){
    const data = {
      q: "getPromociones"
    }
     const headers = this.createAuthorizationHeader(); 
     const param = {
      data: data
     }
    // return this.http.get<any>(this.urlApi+'/promociones',{headers:headers, });
    return this.http.post<any>(this.url, param);
   }

    getModelos(categoria:any){
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(this.urlFicha+'/unidades/rently/'+categoria,{headers:headers});
   }

    getFichaTecnica(id:any, categoria:any){
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(this.urlFicha+'/unidades/rently/ficha/2026-01-01%2011:00/2026-01-02%2011:00/2026-01-08%2011:00/'+id+'/'+categoria,{headers:headers});
   }

   getGaleria(id:any){
    
    return this.http.get<any>('https://api.gruporivero.com/v1/files/s3-media/unidadesRently/'+id);
   }

   leadPromo(nombre:string, correo:string, telefono:string, auto:string, utm_source:string, utm_medium:string, utm_campaign:string, cnname:string, utm_content:string, utm_term:string){

    const data = {
      nombre_completo:nombre,
      unidad:auto,
      telefono:telefono,
      correo: correo,
      promocion_id:utm_campaign,
      utm_source:utm_source, 
      utm_medium:utm_medium,
      utm_campaign:utm_campaign,
      cnname:cnname,
      utm_content:utm_content,
      utm_term:utm_term
    }
    return this.http.post<any>(this.urlFicha+"/leads-rentas", data);
   
   }
}
