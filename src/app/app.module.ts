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
import { PostComponent } from './components/post/showSinglePost/post.component';
import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { CreatePostComponent } from './components/post/createPost/create-post/create-post.component';

@NgModule({
  declarations: [AppComponent, ApiTestsComponent, LoginFormComponent, RegisterFormComponent, ErrorBoxComponent, NavbarComponent, ProfilePicComponent, PostComponent, CommentSectionComponent, CreatePostComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, MaterialModule, MatButtonModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
