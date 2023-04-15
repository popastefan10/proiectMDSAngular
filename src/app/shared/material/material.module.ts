import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULES = [MatButtonModule, MatFormFieldModule, MatInputModule];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [...MATERIAL_MODULES]
})
export class MaterialModule {}
