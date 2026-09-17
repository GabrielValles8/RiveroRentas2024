import { Component } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";
import { ActivatedRoute, Router } from "@angular/router"; 

@Component({
  selector: 'app-adwords',
  templateUrl: './adwords.component.html',
  styleUrls: ['./adwords.component.css']
})
export class AdwordsComponent {

  slug:string="";
  titulo:string="";
  imagen:string="";

  nombre: string="";
  telefono: string="";
  correo: string="";
  comentario: string="";
  preferido: string="";
  privacidad: string="";

  queryParams: any;

  //Parámetros web url

  utm_source:string ="";
  utm_medium:string ="";
  utm_campaign:string ="";
  cnname:string ="";
  utm_content:string ="";
  utm_term:string ="";

  constructor(private rently:RentasService, private activeroute:ActivatedRoute, private router: Router) {

    this.activeroute.params.subscribe(params => {     
      this.slug = params["slug"];

      this.utm_source = params["utm_source"];
      this.utm_medium = params["utm_medium"];
      this.utm_campaign = params["utm_campaign"];
      this.cnname = params["ccname"];
      this.utm_content = params["utm_content"];
      this.utm_term = params["utm_term"];
      console.log(this.slug);
      this.queryParams = this.activeroute.snapshot.queryParams;

    });

    this.rently.adword(this.slug).subscribe((response:any) =>{
      console.log(response);

      this.imagen = response.data.fondo;
    });

  }

  enviarAdword(){

      let nombre = this.nombre;
      let correo = this.correo;
      let telefono = this.telefono;
      let comentario = this.comentario;
      let preferido = this.preferido;
      let privacidad = this.privacidad;

      if(nombre == "" || correo == "" || telefono == "" || preferido == "" ){
        if(privacidad == "false" || privacidad == ""){
          alert('Acepta el aviso de privacidad para continuar');
          return 0;
        } else {
          alert('Llena todos los campos para continuar');
          return 0;
        }
      }

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';

      const fields: Record<any, any> = {
        oid: '00Df4000004ls8N',
        'first_name': nombre,
        'last_name' :'-',
        'email': correo,
        '00Nf400000UBha3': telefono,
        '00Nf400000UBhZ5': comentario,
        '00Nf400000UBhZw': 'Renta de Auto',
        '00NUh0000030xUb': 'Menudeo',
        '00N2S000007ThUK': 'www.riverorenta.com',
        '00NUl000000a7fh': this.cnname,
        '00NUh00000563Zp': this.slug,
        '00Nf400000UBhZx': 'Ver Opciones',
        '00Nf400000UBhZt': 'Seminuevos',
        '00Nf400000UBhYt': '1043193',
        '00Nf400000UBhZl': preferido,
        'utm_source': this.utm_source,
        'utm_medium': this.utm_medium,
        'utm_campaign': this.utm_campaign,
        'cnname': this.cnname,
        'utm_content': this.utm_content,
        'utm_term':this.utm_term,
        recordType: '012f4000000zmkaAAA',
        ownerId: '005f4000003NyKBAA0',
        /* 'debug' : '1',
        'debugEmail' : 'jvalles@gruporivero.com', */
        retURL: 'https://riverorenta.com/mil-gracias-por-tu-tiempo/reserva-exitosa'

      };
      
      for (const key in fields) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);

      form.submit();
  }
}
