import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginFormComponent } from './components/login/login-form.component';
import { RegisterFormComponent } from './components/register/register-form.component';
import { ApiTestsComponent } from './components/api-tests/api-tests.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';

@NgModule({
  declarations: [AppComponent, ApiTestsComponent, LoginFormComponent, RegisterFormComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
