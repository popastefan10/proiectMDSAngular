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
import { PostMediaComponent } from './components/post/post-media/post-media.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommentSectionComponent } from './components/comment/comment-section/comment-section.component';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { CommentCreateComponent } from './components/comment/comment-create/comment-create.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { ShowPostFeedComponent } from './components/post/show-post-feed/show-post-feed.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { FileUploadComponent } from './components/shared/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiTestsComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ErrorBoxComponent,
    NavbarComponent,
    ProfilePicComponent,
    PostMediaComponent,
    CommentSectionComponent,
    CreatePostComponent,
    CommentCreateComponent,
    CreateProfileComponent,
    EditProfileComponent,
    FeedComponent,
    ShowPostFeedComponent,
    PostPageComponent,
    FileUploadComponent
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, MaterialModule, MatButtonModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
