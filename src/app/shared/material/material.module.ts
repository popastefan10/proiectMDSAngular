import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';

const MATERIAL_MODULES = [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatStepperModule, MatButtonModule, MatCardModule];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill', floatLabel: 'auto' } }],
  exports: [...MATERIAL_MODULES]
})
export class MaterialModule {}
