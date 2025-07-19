import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink, RouterOutlet, MatSidenavModule, MatIcon, MatToolbar],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  @Input() toolbarTitle: string = 'Employee Management';
  isSmallScreen;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          const drawer = document.querySelector('mat-sidenav');
          if (drawer) {
            (drawer as any).mode = 'over';
            (drawer as any).opened = false;
          }
        }
      });
  }
}