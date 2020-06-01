import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './customers/customers.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ConfirmDialogComponent, } from './confirm-dialog/confirm-dialog.component';
import {InfoDialogComponent} from './confirm-dialog/info-dialog.component'
import {MatDialogModule} from "@angular/material/dialog";
import { SongPlayerComponent } from './song-player/song-player.component';
import { SongsListComponent } from './songs-list/songs-list.component'
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomePageComponent } from './home-page/home-page.component';
import {MatTableModule} from '@angular/material/table';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 
import { MomentModule } from 'angular2-moment';
import { ChangePasswordComponent } from './change-password/change-password.component'; 
import {JwtInterceptor} from './_helpers/jwt-interceptor';
import { CreateUserComponent } from './create-user/create-user.component'

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    LoginComponent,
    CustomersComponent,
    UsersComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    SongPlayerComponent,
    SongsListComponent,
    HomePageComponent,
    ChangePasswordComponent,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    MatTableModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, 
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    ConfirmDialogComponent,
    InfoDialogComponent
  ]
})
export class AppModule { }
