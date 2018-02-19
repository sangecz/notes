import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as noteActions from '../actions/notes.action';
import { NotesService } from '../../services/notes.service';

@Injectable()
export class NotesEffects {
  constructor(
    private actions$: Actions,
    private noteService: NotesService
  ) {}

  @Effect()
  loadNotes$ = this.actions$.ofType(noteActions.LOAD_NOTES).pipe(
    switchMap(() => {
      return this.noteService
        .getNotes()
        .pipe(
          map(notes => new noteActions.LoadNotesSuccess(notes)),
          catchError(error => of(new noteActions.LoadNotesFail(error)))
        );
    })
  );

  @Effect()
  createNote$ = this.actions$.ofType(noteActions.CREATE_NOTE).pipe(
    map((action: noteActions.CreateNote) => action.payload),
    switchMap(note => {
      return this.noteService
        .createNote(note)
        .pipe(
          map(n => new noteActions.CreateNoteSuccess(n)),
          catchError(error => of(new noteActions.CreateNoteFail(error)))
        );
    })
  );

  @Effect()
  createNoteSuccess$ = this.actions$
    .ofType(noteActions.CREATE_NOTE_SUCCESS)
    .pipe(
      map((action: noteActions.CreateNoteSuccess) => action.payload),
      map(note => {
        return new fromRoot.Go({
          path: ['/notes', note.id],
        });
      })
    );

  @Effect()
  updateNote$ = this.actions$.ofType(noteActions.UPDATE_NOTE).pipe(
    map((action: noteActions.UpdateNote) => action.payload),
    switchMap(note => {
      return this.noteService
        .updateNote(note)
        .pipe(
          map(n => new noteActions.UpdateNoteSuccess(n)),
          catchError(error => of(new noteActions.UpdateNoteFail(error)))
        );
    })
  );

  @Effect()
  removeNote$ = this.actions$.ofType(noteActions.REMOVE_NOTE).pipe(
    map((action: noteActions.RemoveNote) => action.payload),
    switchMap(note => {
      return this.noteService
        .removeNote(note)
        .pipe(
          map(() => new noteActions.RemoveNoteSuccess(note)),
          catchError(error => of(new noteActions.RemoveNoteFail(error)))
        );
    })
  );

  @Effect()
  handleNoteSuccess$ = this.actions$
    .ofType(
      noteActions.UPDATE_NOTE_SUCCESS,
      noteActions.REMOVE_NOTE_SUCCESS
    )
    .pipe(
      map(note => {
        return new fromRoot.Go({
          path: ['/notes'],
        });
      })
    );
}
