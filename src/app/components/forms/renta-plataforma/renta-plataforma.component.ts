import { Component, OnInit } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";
import { ActivatedRoute, Router } from "@angular/router"; 

@Component({
    selector: 'app-renta-plataforma',
    templateUrl: './renta-plataforma.component.html'
  })

  export class RentaPlataformaComponent implements OnInit {

    nombre:string="";
    email:string="";
    telefono:string="";
    mensaje:string="";
    body:string="";
    footer:string="";
    bcc:string="";
    subject:string="";
    loadedSpiner:boolean;
    error:string;
    modelId:any;

    formi:FormData;
    extension:string="";

    status:string="";

    constructor(private rently:RentasService, private activeroute:ActivatedRoute, private router: Router) { 

        this.activeroute.params.subscribe(params => {     
            this.modelId = params["modelid"];
        });

    }

    ngOnInit(): void {
    }

    sendContact(){
        console.log(this.modelId)
    }

    seleccionarArchivo(event:any){
        this.formi = new FormData();

        console.log(this.nombre, "este nombre typee");

        var files = event.target.files;
        var file = files[0];

        this.extension = file.name.substring(file.name.length -4);
        console.log(file.name, " -> ", this.extension)

        var archivoBlob = new Blob([file], { type: "text/xml"}); //creamos un archivo tipo blob
        this.formi.append("file2", archivoBlob); //listo agregamos el archivo

    }

/*     seleccionarArchivo(event:any){
        var files = event.target.files;
        var file = files[0];
        console.log(file, "Este es el archivo")
        this.archivo.nombreArchivo = file.name;

        if (files && file){
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    _handleReaderLoaded(readerEvent:any){
        var binaryString = readerEvent.target.result;
        this.archivo.base64textString = btoa(binaryString);
    }

    */

    upload(){

/*         this.formi.append("nombre", this.nombre);
        this.formi.append("telefono", this.telefono);
        this.formi.append("email", this.email); */

        var nombreArchivo = this.nombre.replace(/ /g, "")+this.telefono.replace(/ /g, "")+this.extension;

        this.formi.append("nombreArchivo", nombreArchivo);

        console.log(nombreArchivo);

        this.rently.subirVideo(this.formi).subscribe(
            (res) => console.log(res),
            (err) => {this.status = err.status

            if (this.status != "200"){
                alert('El archivo es demasiado grande para subir.')
            } else {
                alert('Hemos recibido tus datos.');
                location.reload();
            }}
        )


    }

  }