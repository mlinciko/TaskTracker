import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ]
})
export class SharedModule {}
