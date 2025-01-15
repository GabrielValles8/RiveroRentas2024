import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ResultadoFiltroComponent } from "./components/resultado-filtro/resultado-filtro.component";
import { EnviaTuReservaComponent } from "./components/envia-tu-reserva/envia-tu-reserva.component";
import { NuestrasUnidadesComponent } from "./components/nuestras-unidades/nuestras-unidades.component";
import { EmpresarialComponent } from "./components/empresarial/empresarial.component";
import { CondicionesComponent } from "./components/condiciones/condiciones.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { AvisoPrivacidadComponent } from "./components/aviso-privacidad/aviso-privacidad.component";
import { PromocionesParaRentarAutosComponent } from "./components/promociones-para-rentar-autos/promociones-para-rentar-autos.component";
import { MilGraciasPorTuTiempoComponent } from "./components/mil-gracias-por-tu-tiempo/mil-gracias-por-tu-tiempo.component";
import { RentaAppsComponent } from "./components/renta-apps/renta-apps.component";
import { RequisitosRentaAppsComponent } from "./components/requisitos-renta-apps/requisitos-renta-apps.component";
import { TrasladosChoferComponent } from './components/traslados-chofer/traslados-chofer.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { BlogComponent } from './components/blog/blog.component';

import { IconTextViewComponent } from './components/layouts/icon-text-view/icon-text-view.component';

export const ROUTES: Routes = [ 
    { path: 'home', component: HomeComponent},
    { path: 'resultado-filtro/:from/:to/:carros/:suvs/:pasajeros/:carga/:licencia', component: ResultadoFiltroComponent},
    { path: 'envia-tu-reserva/:from/:to/:modelid/:licencia', component: EnviaTuReservaComponent},
    { path: 'promociones-para-rentar-autos', component: PromocionesParaRentarAutosComponent},
    { path: 'nuestras-unidades', component: NuestrasUnidadesComponent},
    { path: 'empresarial', component: EmpresarialComponent},
    { path: 'requisitos', component: CondicionesComponent},
    { path: 'aviso-privacidad', component: AvisoPrivacidadComponent},
    { path: 'contacto', component: ContactoComponent},
    { path: 'renta-apps', component: RentaAppsComponent},
    { path: 'requisitos-renta-apps/:modelCode', component: RequisitosRentaAppsComponent},
    { path: 'traslados-chofer', component: TrasladosChoferComponent},
    { path: 'evento', component: EventosComponent},
    { path: 'blog', component: BlogComponent},
    { path: 'mil-gracias-por-tu-tiempo/:sensor', component: MilGraciasPorTuTiempoComponent},
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
]
