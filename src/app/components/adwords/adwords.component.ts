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
  utm_campaignname:string ="";
  cnname:string ="";
  utm_content:string ="";
  utm_term:string ="";

  constructor(private rently:RentasService, private activeroute:ActivatedRoute, private router: Router) {

    this.activeroute.params.subscribe(params => {     
      this.slug = params["slug"];      
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
        '00NUl000000a7fh': this.queryParams.utm_campaignname, //Este es MKT 
        '00NUh00000563Zp': this.slug,
        '00Nf400000UBhZx': 'Ver Opciones',
        '00Nf400000UBhZt': 'Seminuevos',
        '00Nf400000UBhYt': '1043193',
        '00Nf400000UBhZl': preferido,
        '00NUl000001CRbl': this.queryParams.utm_source,
        '00NUl000001CRdN': this.queryParams.utm_medium,
        '00NUl00000HfC8L': this.queryParams.utm_campaignname,
        '00NUh000003gtsn': this.queryParams.campaignname,
        '00NUl000001CRez': this.queryParams.utm_content,
        '00NUl000001CQfj':this.queryParams.utm_term,
        'X01_Nombre_MKT__c': this.queryParams.utm_campaignname,
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
