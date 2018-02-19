import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Note } from '../../models/note.model';

import * as fromStore from '../../store/index';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['note-detail.component.scss'],
  template: `
    <h1>{{'notes.detail' | translate}}</h1>

    <app-note-form
      [note]="note$ | async"
      (create)="onCreate($event)"
      (update)="onUpdate($event)"
      (remove)="onRemove($event)">
    </app-note-form>
  `,
})
export class NoteDetailComponent {
  note$ = this.store.select(fromStore.getSelectedNote);

  constructor(private store: Store<fromStore.NotesState>,
              private translate: TranslateService) {
  }

  onCreate(note: Note) {
    this.store.dispatch(new fromStore.CreateNote(note));
  }

  onUpdate(note: Note) {
    this.store.dispatch(new fromStore.UpdateNote(note));
  }

  onRemove(note: Note) {
    this.translate.get('notes.remove.confirm')
      .subscribe(str => {
        const remove = window.confirm(str);
        if (remove) {
          this.store.dispatch(new fromStore.RemoveNote(note));
        }
      });

  }

}
