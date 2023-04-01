import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ApiTestsComponent } from './components/api-tests/api-tests.component';

@NgModule({
  declarations: [AppComponent, ApiTestsComponent, LoginComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
