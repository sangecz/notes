import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromNotes from '../reducers/notes.reducer';

import { Note } from '../../models/note.model';

export const getNoteState = createSelector(
  fromFeature.getNotesState,
  (state: fromFeature.NotesState) => state.notes
);

export const {
  selectIds: getNoteIds,
  selectEntities: getNoteEntities,
  selectAll: getNotes,
  selectTotal: getTotalNotes,
} = fromNotes.adapter.getSelectors(getNoteState);

export const getSelectedNote = createSelector(
  getNoteEntities,
  fromRoot.getRouterState,
  (entities, router): Note => {
    return router.state && entities[router.state.params.noteId];
  }
);

export const getNotesLoaded = createSelector(
  getNoteState,
  fromNotes.getNotesLoaded
);
export const getNotesLoading = createSelector(
  getNoteState,
  fromNotes.getNotesLoading
);
