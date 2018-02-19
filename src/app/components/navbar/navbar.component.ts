import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['navbar.component.scss'],
  template: `
    <a [routerLink]="['/notes']">{{'notes.title' | translate}}</a>
  `
})
export class NavbarComponent {

}
