import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurarComponent } from './procurar.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProcurarComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class ProcurarModule { }
