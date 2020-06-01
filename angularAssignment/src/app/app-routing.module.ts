import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './_helpers/auth.guard';
import { MyNavComponent } from './my-nav/my-nav.component';
import { SongPlayerComponent } from './song-player/song-player.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import {HomePageComponent} from "./home-page/home-page.component"
import {ChangePasswordComponent} from "./change-password/change-password.component"
import { CreateUserComponent } from './create-user/create-user.component';
const routes: Routes = [
  {
    path: '',
    component: MyNavComponent,
    children: [
      {
        path:"",
        redirectTo:"home-page",
        pathMatch:"full"
      },
      {
        path:"home-page",
        component: HomePageComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'video-player/:id',
        component: SongPlayerComponent,
      },
      {
        path: 'songs-list',
        component: SongsListComponent,
      },
      {
        path:"change-password",
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'show-customers/:id',
        component: CustomersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
