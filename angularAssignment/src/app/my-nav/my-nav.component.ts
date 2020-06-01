import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ConfirmDialog } from '../services/confirmation-dialog.service';
import { ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css'],
})
export class MyNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private router: Router,
    public confirmDialog: ConfirmDialog
  ) {}

  logOut = (): void => {
    if (!this.authService.isLoggedIn()) {
      return;
    }
    this.router.navigate(['']);
    this.confirmDialog
      .display('Confirm Action', `Are you sure you want to log out?`)
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.authService.logout();
        }
      });
  };
}
