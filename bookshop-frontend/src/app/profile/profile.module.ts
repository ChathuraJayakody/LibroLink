import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
