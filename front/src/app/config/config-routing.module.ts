import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainConfigComponent } from './main-config/main-config.component';
import { ContactoConfigComponent } from './contacto-config/contacto-config.component';
import { HimnoConfigComponent } from './himno-config/himno-config.component';
import { TestConfigComponent } from './test-config/test-config.component';
import { FaqsConfigComponent } from './faqs-config/faqs-config.component';
import { HorariosConfigComponent } from './horarios-config/horarios-config.component';
import { ConfigMainComponent } from '../la-hermandad/config-main/config-main.component';
import { ConfigTfnosComponent } from '../telefonos/config-tfnos/config-tfnos.component';

const routes: Routes = [
  {
    path: '',
    component: MainConfigComponent,
    children: [
      { path: 'hermandad', component: ConfigMainComponent },
      { path: 'telefonos', component: ConfigTfnosComponent },
      { path: 'citas', component: HorariosConfigComponent},
      { path: 'himno', component: HimnoConfigComponent }, //Isa
      { path: 'test-apto', component: TestConfigComponent},
      { path: 'faq', component: FaqsConfigComponent },
      { path: '**', redirectTo: 'hermandad' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfigRoutingModule { }
