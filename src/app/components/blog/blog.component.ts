import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  public blogs: Array<any> = [
    { id: "1", titulo: "Los Beneficios de Rentas un Auto para Plataformas" , descripción: "Hoy en día, las plataformas de movilidad como Uber, Didi y otras han transformado nuestra manera de desplazarnos. Aunque muchas personas optan por conducir usando su propio vehículo, otros prefieren rentar un auto para aumentar sus ganancias y reducir riesgos. En este artículo, abordaremos los principales beneficios de rentar un auto para plataformas y cómo esta alternativa puede ser una excelente oportunidad para quienes buscan iniciarse en este negocio o mejorar su rentabilidad.<br/>Bajos Costos: Las empresas de renta generalmente ofrecen un seguro completo que cubre daños y accidentes, brindándote tranquilidad y eliminando la necesidad de contratar un seguro adicional para utilizar el vehículo en plataformas de transporte. Esto es ideal si no tienes un auto propio o no quieres usar el tuyo, ya que solo pagas una tarifa fija semanal o mensual.<br/>Sin Preocupaciones por el Mantenimiento: Al rentar un vehículo, el mantenimiento preventivo como cambios de aceite,bujías,etc; esto generalmente es cubierto por la empresa de renta. Esto te permite ahorrar tiempo y dinero, sin tener que lidiar con esos gastos adicionales.<br/>Seguro incluido: Es común que las empresas de alquiler o renta, incluyan el seguro en el costo de renta, lo que te brinda mayor libertad financiera y elimina la necesidad de contratar un seguro adicional. Si estás considerando rentar un auto para aumentar tus ganancias o si deseas ser tu propio jefe, ¡tenemos la opción perfecta para ti! Te invitamos a agendar una cita en nuestra sucursal y descubrir todos los beneficios que tenemos para ti. Disfruta de mantenimiento, seguro y placas incluidos, para que puedas enfocarte solo en generar ingresos. Visítanos en Av. Miguel Alemán 5400, Torres de Linda Vista, 67126 Guadalupe, N.L. ó llamanos al 81 1160 8666" , status: 1, img: "https://d3s2hob8w3xwk8.cloudfront.net/campaigns/blogs_rentas/1/banner.png"},
    { id: "2", titulo: "Plata" , descripcion: "Automático" , status: 1, img: "assets/images/autos-png/nissan-march.png", imgUrl: "https://beta-rentas.gruporivero.com/assets/images/autos-png/nissan-march.png"},
    { id: "3", titulo: "Plata" , descripcion: "Automático" , status: 1, img: "assets/images/autos-png/nissan-vdrive.png", imgUrl: "https://beta-rentas.gruporivero.com/assets/images/autos-png/nissan-vdrive.png"}
  ];
}
