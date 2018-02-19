import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromNotes from './notes.reducer';

export interface NotesState {
  notes: fromNotes.State;
}

export const reducers: ActionReducerMap<NotesState> = {
  notes: fromNotes.reducer,
};

export const getNotesState = createFeatureSelector<NotesState>(
  'notes'
);
