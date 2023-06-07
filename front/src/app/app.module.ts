
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PaginasModule } from './paginas/paginas.module';
import { AptoSangreComponent } from './apto-sangre/apto-sangre.component';
import { AptoSangreModule } from './apto-sangre/apto-sangre.module';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { GestionContenidoModule } from './gestion-contenido/gestion-contenido.module';
import { NoticiasRoutingModule } from './gestion-contenido/noticias-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PedirCitaModule } from './citas/citas.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PaginasDonacionModule } from './paginas-donacion/paginas-donacion.module';
import { GaleriaComponent } from './galeria/galeria.component';
import { GaleriaModule } from './galeria/galeria.module';
import { ConfigRoutingModule } from './config/config-routing.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { LaHermandadModule } from './la-hermandad/la-hermandad.module';
registerLocaleData(localeEs);

@NgModule({
    declarations: [
        AppComponent,
        AptoSangreComponent,
        GaleriaComponent,
        GaleriaComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-es' },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        PaginasModule,
        SharedModule,
        GestionContenidoModule,
        NoticiasRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AuthModule,
        AuthRoutingModule,
        AptoSangreModule,
        NgxPaginationModule,
        PaginasDonacionModule,
        GaleriaModule,
        ConfigRoutingModule,
        LaHermandadModule
    ]
})
export class AppModule {}
