import { Component } from '@angular/core';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { ToolbarTitleService } from './core/services/toolbar-title.service';
import { LoginComponent } from './layout/login/login.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  toolbarTitle = 'front-end';
  isLoggedIn = false;

  constructor(private toolbarTitleService: ToolbarTitleService) {
    toolbarTitleService.title$.subscribe((title) => {
      this.toolbarTitle = title;
    });
  }
}
