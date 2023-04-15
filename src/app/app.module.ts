import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ApiTestsComponent } from './components/api-tests/api-tests.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';

@NgModule({
  declarations: [AppComponent, ApiTestsComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
