import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['note-item.component.scss'],
  template: `
    <a [routerLink]="['/notes', note.id]">
      <div class="note">{{note.title}}</div>
    </a>
  `,
})
export class NoteItemComponent {
  @Input() note: Note;
}
