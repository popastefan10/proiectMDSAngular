import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule, ReactiveFormsModule],
  exports: [CommonModule, HttpClientModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class SharedModule {}
