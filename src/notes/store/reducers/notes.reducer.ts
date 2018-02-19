import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as fromNotes from '../actions/notes.action';
import { Note } from '../../models/note.model';

export interface State extends EntityState<Note> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Note> = createEntityAdapter<Note>({
  selectId: (note: Note) => note.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
});

export function reducer(state = initialState, action: fromNotes.NotesAction): State {
  switch (action.type) {

    case fromNotes.LOAD_NOTES: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromNotes.LOAD_NOTES_SUCCESS: {
      const notes = action.payload;

      return {
        ...state,
        ...adapter.addAll(notes, state),
        loading: false,
        loaded: true,
      };
    }

    case fromNotes.LOAD_NOTES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromNotes.CREATE_NOTE_SUCCESS: {
      const note = action.payload;

      return {
        ...state,
        ...adapter.addOne(note, state),
      };
    }

    case fromNotes.UPDATE_NOTE_SUCCESS: {
      const note = action.payload;

      return {
        ...state,
        ...adapter.updateOne({id: note.id, changes: note}, state),
      };
    }

    case fromNotes.REMOVE_NOTE_SUCCESS: {
      const note = action.payload;

      return {
        ...state,
        ...adapter.removeOne(note.id, state),
      };
    }
  }

  return state;
}

export const getNotesLoading = (state: State) => state.loading;
export const getNotesLoaded = (state: State) => state.loaded;
