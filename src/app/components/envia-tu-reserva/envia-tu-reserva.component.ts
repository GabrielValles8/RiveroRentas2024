import { Component, OnInit, Input } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";
import { ActivatedRoute, Router } from "@angular/router"; 
import moment from 'moment';

interface Horario {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-envia-tu-reserva',
  templateUrl: './envia-tu-reserva.component.html',
  styleUrls: ['./envia-tu-reserva.component.css']
})
export class EnviaTuReservaComponent implements OnInit {

  from:any;
  to:any;
  modelId:any;
  licencia:any;
  isLoaded:boolean = true;
  loadedSpiner:boolean;
  error:string;

  detalle:any;
  car:any;
  modelo:any;
  categoria:any;
  categoriaId:any;
  salida:any;
  regreso:any;
  pagoUrl:any;
  sessionID:any;

  sensor:any = 'reserva-exitosa';

  nameSuc:any = "Linda Vista";
  sucLV: boolean = true;
  sucVenustiano: boolean =false;

  sltLicenseNl:boolean=true;
  sltLicenseFo:boolean=false;

  //Variables formulario
  nombre:string = "";
  correo:string = "";
  bcc:string = "";
  subject:string = "";
  telefono:string = "";
  hora:any = "";
  body:string = "";
  footer:string = "";
  tipoPago:string = "";
  condiciones:boolean = false;

  //Variables seguro
  seguros:any[] = [];
  servicioAeropuerto: number = 0;
  conductorAdicional: number = 0;
  servicioDomicilio: number = 0;
  arrTotalAdicionales:any[] = [];
  segurosTotal:number = 0;

  //variables adicionales
  adicionales:any[] = [];
  adicionalesTotal:number = 0;

  statusReserva:boolean = false;
  statusPago:boolean = false;

  modalInfo:boolean = false;

  horarios: Horario[] = [
    {value: '10:00', viewValue: '10:00'},
    {value: '10:30', viewValue: '10:30'},
    {value: '11:00', viewValue: '11:00'},
    {value: '11:30', viewValue: '11:30'},
    {value: '12:00', viewValue: '12:00'},
    {value: '12:30', viewValue: '12:30'},
    {value: '13:00', viewValue: '13:00'},
    {value: '13:30', viewValue: '13:30'},
    {value: '14:00', viewValue: '14:00'},
    {value: '14:30', viewValue: '14:30'},
    {value: '15:00', viewValue: '15:00'},
    {value: '15:30', viewValue: '15:30'},
    {value: '16:00', viewValue: '16:00'},
    {value: '16:30', viewValue: '16:30'},
    {value: '17:00', viewValue: '17:00'},
    {value: '17:30', viewValue: '17:30'},
    {value: '18:00', viewValue: '18:00'}
  ];

  constructor(private rently:RentasService, private activeroute:ActivatedRoute, private router: Router) {

    this.activeroute.params.subscribe(params => {     
      //Para cambiar filtro
      this.from = params["from"];
      this.to = params["to"];
      this.modelId = params["modelid"];
      this.licencia = params["licencia"];

      if (this.licencia === 'local'){
        this.sltLicenseNl = true;
      } else {
        this.sltLicenseNl = false;
        this.sltLicenseFo = true;
      }
    });

    this.rently.getReservacion(this.from, this.to, this.modelId).subscribe((response:any) =>{

      if (response.message) {
        this.isLoaded = true;
        this.error = response.message;
      } else {
        this.detalle = response;
        this.car= response.Car;
        this.modelo= response.Car.Model;
        this.categoria= response.Car.Model.Category;
        this.categoriaId= response.Car.Model.Category.Id;
        this.salida=response.DeliveryPlace;
        this.regreso= response.ReturnPlace;
        this.isLoaded = false;
      }
    });

    this.rently.getAdicionales(this.from, this.to, this.modelId).subscribe((response:any) =>{

      const adicionales = response;
      for (let i = 0; i < adicionales.length; i++) {
        const adicional = adicionales[i];

        //Filtramos si es un adicional o es parte del seguro
        if (adicionales[i].type == "Adicional") {
          this.adicionales.push({ detail: adicional, checked: false })
        } else {
          this.seguros.push({ detail: adicional, checked: false })
        }
      }

    });

   }

   onSelectSucursal(i:any){
    switch (i) {
      case "LindaVista":
        this.sucLV = true;
        this.sucVenustiano = false;
        this.nameSuc = "Linda Vista";
        break;
      case "Venustiano":
        this.sucVenustiano = true;
        this.sucLV = false;
        this.nameSuc = "Venustiano";
        break;
    }
   }

   onAddingAdicionales(i:any){
    if (this.adicionales[i].checked == true) {

      switch (this.adicionales[i].detail.id) {
        case 1:
          this.servicioAeropuerto = 0;
          break;
        case 4:
          this.conductorAdicional = 0;
          break;
        case 7:
          this.servicioDomicilio= 0;
          break;    
      }

      const newList = this.arrTotalAdicionales.splice(
        this.arrTotalAdicionales.indexOf(i),
        1
      );

      this.adicionalesTotal -= this.adicionales[i].detail.dailyPrice;
      this.adicionales[i].checked = false;
    } else {
      
      switch (this.adicionales[i].detail.id) {
        case 1:
          this.servicioAeropuerto = this.adicionales[i].detail.dailyPrice;
          break;
        case 4:
          this.conductorAdicional = this.adicionales[i].detail.dailyPrice;
          break;
        case 7:
          this.servicioDomicilio= this.adicionales[i].detail.dailyPrice;
          break;    
      }

      this.adicionalesTotal += this.adicionales[i].detail.dailyPrice;
      this.adicionales[i].checked = true;
    }
   }

   onAddingSeguros(i:any){

      if (this.seguros[i].checked == true) {

        const newList = this.arrTotalAdicionales.splice(
          this.arrTotalAdicionales.indexOf(i), 1
        );

        this.segurosTotal -= this.seguros[i].detail.dailyPrice * this.detalle.TotalDays;
        this.seguros[i].checked = false;
      }else{
        let items = this.arrTotalAdicionales.push({
          AdditionalId: this.seguros[i].detail.id,
          Quantity: 1
        })

        this.segurosTotal += this.seguros[i].detail.dailyPrice * this.detalle.TotalDays;
        this.seguros[i].checked = true;
      }
   }

   cambiarPago(valor:string){
     document.getElementById(valor)?.click();
   }

   setCondiciones(){
    this.condiciones = !this.condiciones;
   }

   reservar(total:any){
    
    if (this.nombre != "" && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.correo) == true && this.telefono != "" /* && this.tipoPago != "" && this.condiciones != false */) {
      this.loadedSpiner = true;
      this.rently.reservar(this.arrTotalAdicionales, this.from, this.to, this.modelId, this.nombre, this.correo,this.telefono).subscribe((response:any) =>{
        if (!response.message) {
          this.reservarCorreo();
/*           this.rently.checkout(this.correo, this.nombre, this.modelo.Name, total).subscribe((response:any) =>{
            this.reservarCorreo();
            //let data = JSON.stringify(response);
            //console.log(response);

            window.location.href = response; 

          },error => {
            console.log(error);
          }) */

        } else {
          alert("Ocurrió un problema, inténtelo más tarde.")
          this.loadedSpiner = false;
        }
      });
    } else {
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.correo)== false){
        alert("Correo Inválido. Verifique que esté bien escrito.")
      } else {
        alert("Complete todos los campos.")
      }

    }
   }

   reservarCorreo(){

    var sensorSeguro:number = 0;
    var sensorAdicional:number = 0;
    let correoCliente = this.correo;
    let nombreCliente = this.nombre;

    this.loadedSpiner = true;

    console.log(this.nombre, this.correo , this.telefono , correoCliente, this.hora);

    this.body+= "<h1>RIVERO RENTAS - SOLICITUD DE RESERVACION</h1>"+
    "<h4>INFORMACION DE CONTACTO</h4>"+

    "<table width='600px;' BORDER CELLPADDING=10 CELLSPACING=0>"+

    "<tr><th colspan=2>CLIENTE</th></tr>"+
    "<tr><th>Nombre:</th><td>"+nombreCliente+"</td></tr>"+
    "<tr><th>Correo:</th><td>"+correoCliente+"</td></tr>"+
    "<tr><th>Telefono:</th><td>"+this.telefono+"</td></tr>"+
    "<tr><th>Recolección:</th><td>"+this.from+"</td></tr>"+
    "<tr><th>Devolución:</th><td>"+this.to+"</td></tr>"+
    "<tr><th>Modelo:</th><td>"+this.modelo.Name+"</td></tr>"+
    "<tr><th>Seguro:</th><td>";

    for (let i = 0; i < this.seguros.length; i++) {
      if (this.seguros[i].checked === true){
        this.body+=this.seguros[i].detail.name +". ";
        sensorSeguro = sensorSeguro + 1;
      } 
    }

    if (sensorSeguro == 0){
      this.body+="Sin elección de seguro.";
    }

    this.body+="</td></tr>"+
    "<tr><th>Adicionales:</th><td>";

    for (let i = 0; i < this.adicionales.length; i++) {
      if (this.adicionales[i].checked === true){
        this.body+=this.adicionales[i].detail.name +". ";
        sensorAdicional = sensorAdicional + 1;
      }
    }

    if (sensorAdicional == 0){
      this.body+="Sin elección adicional.";
    }

    this.body+="</td></tr>"+
    "</table>";

    this.subject = nombreCliente+" SE HA CONTACTADO CON NOSOTROS PARA UNA RESERVACION.";
    this.nombre = ", "+nombreCliente+" se ha contactado con nosotros por el motivo de reservacion.";
    this.bcc = "jvalles@gruporivero.com";
    this.correo = "inforenta@gruporivero.com";

    if (nombreCliente != "" && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correoCliente)== true && this.telefono != "" && correoCliente != "" ) {
      this.rently.enviarContactoNuevo(this.correo, this.nombre,  this.subject, this.body, this.footer , this.bcc).subscribe(resp =>{

        this.statusPago = true;
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

    numberWithCommas(x:any) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    quitarNulos(x:any) {
      var parts = x.replace(' ','-');
      parts = parts.toString().split("-");
      parts=parts[2]+'/'+parts[1]+'/'+parts[0]+' '+parts[3];
      return parts;
    }
    
    fechaOffHour(x:any){
      var fechax = x;
      var fechaxOk = fechax.toString().split("-");

      if (fechaxOk[1]== '01'){fechaxOk[1]= 'Enero'} else if (fechaxOk[1]== '02'){fechaxOk[1]= 'Febrero'} else if (fechaxOk[1]== '03'){fechaxOk[1]= 'Marzo'} else if (fechaxOk[1]== '04'){fechaxOk[1]= 'Abril'} else if (fechaxOk[1]== '05'){fechaxOk[1]= 'Mayo'} else if (fechaxOk[1]== '06'){fechaxOk[1]= 'Junio'} else if (fechaxOk[1]== '07'){fechaxOk[1]= 'Julio'} else if (fechaxOk[1]== '08'){fechaxOk[1]= 'Agosto'} else if (fechaxOk[1]== '09'){fechaxOk[1]= 'Septiembre'} else if (fechaxOk[1]== '10'){fechaxOk[1]= 'Octubre'} else if (fechaxOk[1]== '11'){fechaxOk[1]= 'Noviembre'} else if (fechaxOk[1]== '12'){fechaxOk[1]= 'Diciembre'}
      var fechaCompleta = fechaxOk[2].substr(0,2)+ ' de ' + fechaxOk[1] + ' ' + fechaxOk[0];
      return fechaCompleta;
    }

    seguroName(x:any){
      var seguroNombre = x;
      var seguroSplit = seguroNombre.toString().split("(");

      return seguroSplit[0];
    }

    seguroDescription(x:any){
      var seguroDescripcion = x;
      var seguroDSplit = seguroDescripcion.toString().split("(");
      var segundoSplit = seguroDSplit[1].toString().split(")");

      return segundoSplit[0];
    }

    reservarDatos(){

      window.scroll({
        top: 125,
        left: 0,
        behavior: 'smooth',
      });
      this.statusReserva = true;

      const cotizador = document.getElementById('cuadro-home');

      if (cotizador != null) {
        cotizador.classList.add('filtro-homeActive');
      }

    }

    onAddingLicenseNl(){
      this.sltLicenseNl = true;
      this.sltLicenseFo = false;
    }

    onAddingLicenseFo(){
      this.sltLicenseNl = false;
      this.sltLicenseFo = true;
    }

    pago(){

/*       const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'sk_netpay_CHdwZEIEczYHocybyEjYygJCDtPFwfdnOObsiLBIwVweC'
        },
        body: JSON.stringify({
          successUrl: 'https://riverorenta.mx/api/netpay/successCheckOut/index.php',
          cancelUrl: 'https://riverorenta.mx/api/netpay/cancelCheckOut/index.php',
          customerEmail: 'accept@netpay.com.mx',
          customerName: 'Jon Doe',
          paymentMethodTypes: ['card'],
          merchantRefCode: 'test-11124',
          lineItems: [
            {name: this.modelo.Name, amount: this.detalle.Price, quantity: 1, currency: 'MXN'},
            {name: "Seguro Agregado", amount: this.segurosTotal, quantity: 1, currency: 'MXN'},
            {name: "Adicionales Agregados", amount: this.adicionalesTotal, quantity: 1, currency: 'MXN'},
            {name: "Valor Garantia", amount: this.detalle.Franchise, quantity: 1, currency: 'MXN'},
          ],
          billing: {
            firstName: 'Jon',
            lastName: 'Doe',
            email: 'eramos@gruporivero.com',
            phone: '6141870165',
            address: {
              city: 'Monterrey',
              country: 'MX',
              postalCode: '67186',
              state: 'Nuevo Leon',
              street1: 'Filosofos 100',
              street2: 'Tecnologico'
            }
          },
          linkType: 'NETPAY_LINK'
        })
      };
      
      fetch('https://gateway-154.netpaydev.com/gateway-ecommerce/v3.2/checkout/session/', options)
        .then(response => response.json())
        .then(response => this.sessionID = response.id)
        .then(response => this.pagoUrl = response.shortUrl)
        .catch(err => console.error(err)); */
    }

    dateRangeChange(hora: HTMLInputElement) {
      this.hora = hora;
    }

    irPago(url: any, sessionID: any){
      this.loadedSpiner = true;
      console.log(url);
      window.open(url, '_blank');
      this.consultaPago(sessionID);
    }

      consultaPago(sessionID:any){
        console.log(sessionID)
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'sha512-Ms3Y9l7JNE0zlN3iiNDIEz+dx7eDcJouP75EKF1FltUi6ZUGQi8U1mGH6ixW0VQlc5Iv/2l6mRWBe5X4W8NDNg==?tKey'
          }
        };
        
        fetch('https://gateway-154.netpaydev.com/gateway-ecommerce/v3/checkout/session/'+sessionID, options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));
      }

    ngOnInit(): void {
    }

}
