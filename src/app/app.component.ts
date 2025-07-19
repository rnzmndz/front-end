import { Component } from '@angular/core';
import { SideNavComponent } from './layout/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  imports: [SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  toolbarTitle = 'front-end';
}
