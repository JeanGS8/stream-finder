import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplatePage } from './template.page';
import { IonicModule } from '@ionic/angular';
import { TemplatePageRoutingModule } from './template-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplatePageRoutingModule
  ],
  declarations: [TemplatePage]
})
export class TemplatePageModule {}
