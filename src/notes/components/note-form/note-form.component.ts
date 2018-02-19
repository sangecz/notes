import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['note-form.component.scss'],
  template: `
    <div class="note-form">
      <form [formGroup]="form">

        <label>
          <input
            type="text"
            formControlName="title"
            class="input"
            [class.error]="titleControlInvalid">
          <div
            class="note-form__error"
            *ngIf="titleControlInvalid">
            <p>Note must have a title</p>
          </div>
        </label>

        <div class="btns">
          <button
            type="button"
            class="btn create"
            *ngIf="!exists"
            [disabled]="isCreateUpdateDisabled()"
            (click)="createNote(form)">
            {{'notes.create' | translate}}
          </button>

          <button
            type="button"
            class="btn"
            *ngIf="exists"
            [disabled]="isCreateUpdateDisabled()"
            (click)="updateNote(form)">
            {{'notes.update' | translate}}
          </button>

          <button
            type="button"
            class="btn warn"
            *ngIf="exists"
            (click)="removeNote(form)">
            {{'notes.remove' | translate}}
          </button>
        </div>

      </form>
    </div>
  `,
})
export class NoteFormComponent implements OnChanges {
  exists = false;

  @Input() note: Note;

  @Output() create = new EventEmitter<Note>();
  @Output() update = new EventEmitter<Note>();
  @Output() remove = new EventEmitter<Note>();

  form = this.fb.group({
    title: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get titleControlInvalid() {
    return this.titleControl.hasError('required') && this.titleControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.note && this.note.id) {
      this.exists = true;
      this.form.patchValue(this.note);
    }
  }

  createNote(form: FormGroup) {
    const {value, valid} = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updateNote(form: FormGroup) {
    const {value, valid, touched} = form;
    if (touched && valid) {
      this.update.emit({...this.note, ...value});
    }
  }

  removeNote(form: FormGroup) {
    const {value} = form;
    this.remove.emit({...this.note, ...value});
  }

  isCreateUpdateDisabled() {
    return this.titleControl.value === '';
  }
}
