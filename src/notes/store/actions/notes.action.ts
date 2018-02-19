import { Action } from '@ngrx/store';

import { Note } from '../../models/note.model';

// load notes
export const LOAD_NOTES = '[Products] Load Notes';
export const LOAD_NOTES_FAIL = '[Products] Load Notes Fail';
export const LOAD_NOTES_SUCCESS = '[Products] Load Notes Success';

export class LoadNotes implements Action {
  readonly type = LOAD_NOTES;
}

export class LoadNotesFail implements Action {
  readonly type = LOAD_NOTES_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadNotesSuccess implements Action {
  readonly type = LOAD_NOTES_SUCCESS;

  constructor(public payload: Note[]) {
  }
}

// create note
export const CREATE_NOTE = '[Products] Create Note';
export const CREATE_NOTE_FAIL = '[Products] Create Note Fail';
export const CREATE_NOTE_SUCCESS = '[Products] Create Note Success';

export class CreateNote implements Action {
  readonly type = CREATE_NOTE;

  constructor(public payload: Note) {
  }
}

export class CreateNoteFail implements Action {
  readonly type = CREATE_NOTE_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateNoteSuccess implements Action {
  readonly type = CREATE_NOTE_SUCCESS;

  constructor(public payload: Note) {
  }
}

// update note
export const UPDATE_NOTE = '[Products] Update Note';
export const UPDATE_NOTE_FAIL = '[Products] Update Note Fail';
export const UPDATE_NOTE_SUCCESS = '[Products] Update Note Success';

export class UpdateNote implements Action {
  readonly type = UPDATE_NOTE;

  constructor(public payload: Note) {
  }
}

export class UpdateNoteFail implements Action {
  readonly type = UPDATE_NOTE_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateNoteSuccess implements Action {
  readonly type = UPDATE_NOTE_SUCCESS;

  constructor(public payload: Note) {
  }
}

// remove note
export const REMOVE_NOTE = '[Products] Remove Note';
export const REMOVE_NOTE_FAIL = '[Products] Remove Note Fail';
export const REMOVE_NOTE_SUCCESS = '[Products] Remove Note Success';

export class RemoveNote implements Action {
  readonly type = REMOVE_NOTE;

  constructor(public payload: Note) {
  }
}

export class RemoveNoteFail implements Action {
  readonly type = REMOVE_NOTE_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveNoteSuccess implements Action {
  readonly type = REMOVE_NOTE_SUCCESS;

  constructor(public payload: Note) {
  }
}

// action types
export type NotesAction =
  | LoadNotes
  | LoadNotesFail
  | LoadNotesSuccess
  | CreateNote
  | CreateNoteFail
  | CreateNoteSuccess
  | UpdateNote
  | UpdateNoteFail
  | UpdateNoteSuccess
  | RemoveNote
  | RemoveNoteFail
  | RemoveNoteSuccess;
