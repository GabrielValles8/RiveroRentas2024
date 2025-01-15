import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeRentaComponent } from './components/home-renta/home-renta.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from "@angular/common";
import { ResultadoFiltroComponent } from './components/resultado-filtro/resultado-filtro.component';
import { ROUTES } from '../app/app.routes';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { ResultadoRentaComponent } from './components/resultado-renta/resultado-renta.component';
import { EnviaTuReservaComponent } from './components/envia-tu-reserva/envia-tu-reserva.component';
import { SolicitudComponent } from './components/forms/solicitud/solicitud.component';
import { IconTextViewComponent } from './components/layouts/icon-text-view/icon-text-view.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { PromocionesParaRentarAutosComponent } from './components/promociones-para-rentar-autos/promociones-para-rentar-autos.component';
import { NuestrasUnidadesComponent } from './components/nuestras-unidades/nuestras-unidades.component';
import { CondicionesComponent } from './components/condiciones/condiciones.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ContactoClienteComponent } from './components/forms/contacto-cliente/contacto-cliente.component';
import { MilGraciasPorTuTiempoComponent } from './components/mil-gracias-por-tu-tiempo/mil-gracias-por-tu-tiempo.component';
import { EmpresarialComponent } from './components/empresarial/empresarial.component';
import { RentaClienteComponent } from './components/forms/renta-cliente/renta-cliente.component';
import { RentaPlataformaComponent } from './components/forms/renta-plataforma/renta-plataforma.component';
import { LocationStrategy, Location, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { AvisoPrivacidadComponent } from './components/aviso-privacidad/aviso-privacidad.component';
import { MatCardModule } from '@angular/material/card';
import { RentaAppsComponent } from './components/renta-apps/renta-apps.component';
import { RequisitosRentaAppsComponent } from './components/requisitos-renta-apps/requisitos-renta-apps.component';
import { TrasladosChoferComponent } from './components/traslados-chofer/traslados-chofer.component';
import { FormTrasladosChoferComponent } from './components/forms/traslado-chofer/traslado-chofer-form.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { BlogComponent } from './components/blog/blog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HomeRentaComponent,
    ResultadoFiltroComponent,
    ResultadoRentaComponent,
    EnviaTuReservaComponent,
    SolicitudComponent,
    ContactoClienteComponent,
    IconTextViewComponent,
    PromocionesComponent,
    PromocionesParaRentarAutosComponent,
    NuestrasUnidadesComponent,
    CondicionesComponent,
    ContactoComponent,
    MilGraciasPorTuTiempoComponent,
    EmpresarialComponent,
    RentaClienteComponent,
    RentaPlataformaComponent,
    AvisoPrivacidadComponent,
    RentaAppsComponent,
    RequisitosRentaAppsComponent,
    TrasladosChoferComponent,
    FormTrasladosChoferComponent,
    EventosComponent,
    BlogComponent
    
  ],
  imports: [
    BrowserModule,
    [BrowserAnimationsModule],
    [NoopAnimationsModule],
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatNativeDateModule,
    MatIconModule,
    MatCardModule,
    GoogleTagManagerModule.forRoot({
      id: "GTM-T3M872G",
    }),
    RouterModule.forRoot(ROUTES, { useHash: false }),
    HttpClientModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
