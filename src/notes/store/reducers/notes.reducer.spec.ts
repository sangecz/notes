import * as fromNotes from './notes.reducer';
import * as fromActions from '../actions/notes.action';
import * as fromSelectors from '../selectors/notes.selectors';
import * as fromMock from '../notes.mock';
import { Note } from '../../models/note.model';

describe('NotesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const {initialState} = fromNotes;
      const action = {} as any;
      const state = fromNotes.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_NOTES action', () => {
    it('should set loading to true', () => {
      const {initialState} = fromNotes;
      const action = new fromActions.LoadNotes();
      const state = fromNotes.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('LOAD_NOTES_SUCCESS action', () => {
    it('should load notes', () => {
      const notes: Note[] = fromMock.notes;
      const entities = {
        1: notes[0],
        2: notes[1],
        3: notes[2],
      };
      const {initialState} = fromNotes;
      const action = new fromActions.LoadNotesSuccess(notes);
      const state = fromNotes.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('LOAD_NOTES_FAIL action', () => {
    it('should return the initial state', () => {
      const {initialState} = fromNotes;
      const action = new fromActions.LoadNotesFail({});
      const state = fromNotes.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {
      const {initialState} = fromNotes;
      const previousState = {...initialState, loading: true};
      const action = new fromActions.LoadNotesFail({});
      const state = fromNotes.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('CREATE_NOTE_SUCCESS action', () => {
    it('should add the new note to the notes array', () => {
      const notes: Note[] = fromMock.notes;

      const newNote: Note = {
        id: 3,
        title: 'Note #3',
      };
      const entities = {
        1: notes[0],
        2: notes[1],
      };
      const {initialState} = fromNotes;
      const previousState = {...initialState, entities};
      const action = new fromActions.CreateNoteSuccess(newNote);
      const state = fromNotes.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(3);
      expect(state.entities).toEqual({...entities, 3: newNote});
    });
  });

  describe('UPDATE_NOTE_SUCCESS action', () => {
    it('should update the note', () => {
      const notes: Note[] = fromMock.notes;
      const updatedNote = {
        id: 2,
        title: 'Note #22',
      };
      const entities = {
        1: notes[0],
        2: notes[1],
      };
      const {initialState} = fromNotes;
      const previousState = {...initialState, entities};
      const action = new fromActions.UpdateNoteSuccess(updatedNote);
      const state = fromNotes.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(2);
      expect(state.entities).toEqual({...entities, 2: updatedNote});
    });
  });

  describe('REMOVE_NOTE_SUCCESS action', () => {
    it('should remove the note', () => {
      const notes: Note[] = fromMock.notes;
      const entities = {
        1: notes[0],
        2: notes[1],
      };
      const {initialState} = fromNotes;
      const previousState = {...initialState, entities};
      const action = new fromActions.RemoveNoteSuccess(notes[0]);
      const state = fromNotes.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(1);
      expect(state.entities).toEqual({2: notes[1]});
    });
  });
});

describe('NotesReducer Selectors', () => {

  describe('getNotesLoading', () => {
    it('should return .loading', () => {
      const {initialState} = fromNotes;
      const previousState = {...initialState, loading: true};
      const slice = fromNotes.getNotesLoading(previousState);

      expect(slice).toEqual(true);
    });
  });

  describe('getNotesLoaded', () => {
    it('should return .loaded', () => {
      const {initialState} = fromNotes;
      const previousState = {...initialState, loaded: true};
      const slice = fromNotes.getNotesLoaded(previousState);

      expect(slice).toEqual(true);
    });
  });
});
