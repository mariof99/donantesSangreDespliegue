import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasRoutingModule } from './paginas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PaginaHermandadComponent } from '../la-hermandad/pagina-hermandad/pagina-hermandad.component';
import { HimnoComponent } from './himno/himno.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { AvisoLegalComponent } from './aviso-legal/aviso-legal.component';
import { TerminosUsoComponent } from './terminos-uso/terminos-uso.component';
import { PoliticasCookiesComponent } from './politicas-cookies/politicas-cookies.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemoriasComponent } from './memorias/memorias.component';
import { TelefonosModule } from '../telefonos/telefonos.module';

@NgModule({
  declarations: [
    InicioComponent,
    MainPageComponent,
    PaginaHermandadComponent,
    HimnoComponent,
    PreguntasFrecuentesComponent,
    AvisoLegalComponent,
    TerminosUsoComponent,
    PoliticasCookiesComponent,
    ChatComponent,
    MemoriasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PaginasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TelefonosModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class PaginasModule { }
