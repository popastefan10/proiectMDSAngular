import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginFormComponent } from './components/login/login-form.component';
import { RegisterFormComponent } from './components/register/register-form.component';
import { ApiTestsComponent } from './components/api-tests/api-tests.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { PostComponent } from './components/post/post.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';

@NgModule({
  declarations: [AppComponent, ApiTestsComponent, LoginFormComponent, RegisterFormComponent, ErrorBoxComponent, NavbarComponent, ProfilePicComponent, PostComponent, CreateProfileComponent, EditProfileComponent, ShowProfileComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
