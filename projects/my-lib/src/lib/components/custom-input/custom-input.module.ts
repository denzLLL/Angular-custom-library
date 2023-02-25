import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomInputComponent} from './custom-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CustomInputComponent],
  providers: [],
  exports: [CustomInputComponent]
})
export class MyLibCustomInputModule {
}
