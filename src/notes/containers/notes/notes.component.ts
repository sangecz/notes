import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store/index';

@Component({
  selector: 'app-notes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['notes.component.scss'],
  template: `
    <h1>{{'notes.title' | translate}}</h1>
    <button class="add-btn" routerLink="./new">{{'notes.add' | translate}}</button>
    <div class="notes">
      <app-note-item
        *ngFor="let note of (notes$ | async)"
        [note]="note">
      </app-note-item>
    </div>
  `,
})
export class NotesComponent {
  notes$ = this.store.select(fromStore.getNotes);

  constructor(private store: Store<fromStore.NotesState>) {
  }
}
