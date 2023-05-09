import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApiTestsComponent } from './components/api-tests/api-tests.component';
import { LoginFormComponent } from './components/login/login-form.component';
import { RegisterFormComponent } from './components/register/register-form.component';
import { PostComponent } from './components/post/post.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';

const routes: Routes = [
  { path: 'api-tests', component: ApiTestsComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'create-profile', component: CreateProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'posts/:id', component: PostComponent },
  { path: ':username', component: ShowProfileComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
