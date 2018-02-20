import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [''],
  template: `
    <div [formGroup]="form">
      <select formArrayName="langs" (change)="onSelect($event)">
        <option value="">{{'selectLang' | translate}}</option>
        <option *ngFor="let lang of langs" [ngValue]="lang">
          {{lang}}
        </option>
      </select>
    </div>
  `
})
export class LangSelectComponent {

  langs: string[] = environment.supportedLanguages;

  form = this.fb.group({
    langs: this.fb.array(this.createItems(this.langs))
  });

  constructor(private fb: FormBuilder,
              private translate: TranslateService) {
  }

  createItems(items): FormGroup[] {
    return items.map(item => this.fb.group({name: item}));
  }

  onSelect(event) {
    const lang = event.target.value;
    if (this.langs.includes(lang)) {
      this.translate.use(lang);
    }
  }

}
