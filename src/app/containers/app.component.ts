import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: ['']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    translate.addLangs(environment.supportedLanguages);
    translate.setDefaultLang('en');
    translate.use('cs');
  }
}
