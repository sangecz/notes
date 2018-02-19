import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import { TestBed } from '@angular/core/testing';
import { Note } from '../../models/note.model';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';
import * as fromSelectors from './notes.selectors';
import * as fromMock from '../notes.mock';

describe('Notes Selectors', () => {
  let store: Store<fromReducers.NotesState>;

  const notes: Note[] = fromMock.notes;

  const entities = {
    1: notes[0],
    2: notes[1],
    3: notes[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers),
        }),
      ],
    });

    store = TestBed.get(Store);
  });

  describe('getNoteState', () => {
    it('should return state of note store slice', () => {
      let result;

      store
        .select(fromSelectors.getNoteState)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false,
      });

      store.dispatch(new fromActions.LoadNotesSuccess(notes));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false,
      });
    });
  });

  describe('getSelectedNote', () => {
    it('should return selected note as an entity', () => {
      let result;
      let params;

      store.dispatch(new fromActions.LoadNotesSuccess(notes));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/notes',
            queryParams: {},
            params: {noteId: '2'},
          },
          event: {},
        },
      });

      store
        .select(fromRoot.getRouterState)
        .subscribe(routerState => (params = routerState.state.params));

      expect(params).toEqual({noteId: '2'});

      store
        .select(fromSelectors.getSelectedNote)
        .subscribe(selectedNote => (result = selectedNote));

      expect(result).toEqual(entities[2]);
    });
  });

  describe('getNotesLoaded', () => {
    it('should return the notes loaded state', () => {
      let result;

      store
        .select(fromSelectors.getNotesLoaded)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadNotesSuccess([]));

      expect(result).toEqual(true);
    });
  });

  describe('getNotesLoading', () => {
    it('should return the notes loading state', () => {
      let result;

      store
        .select(fromSelectors.getNotesLoading)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadNotes());

      expect(result).toEqual(true);
    });
  });
});
