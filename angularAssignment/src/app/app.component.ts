import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ConfirmDialog } from './services/confirmation-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router,
    public confirmDialog: ConfirmDialog
  ) {
    idle.setIdle(300);
    idle.setTimeout(5);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.reset();
    });
    idle.onTimeout.subscribe(() => {
      this.confirmDialog
        .display('Feeling Bored?', 'Wanna listen some songs?')
        .subscribe((data) => {
          if (data) router.navigate(['songs-list']);
        });
      this.reset();
    });
    this.reset();
  }
  reset() {
    this.idle.watch();
  }
  title = 'angularAssignment';
}
