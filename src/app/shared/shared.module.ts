import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule, ReactiveFormsModule, BrowserAnimationsModule],
  exports: [CommonModule, HttpClientModule, FormsModule, RouterModule, ReactiveFormsModule, BrowserAnimationsModule]
})
export class SharedModule {}
