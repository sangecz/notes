import * as fromNotes from './notes.action';
import * as fromMock from '../notes.mock';
import { Note } from '../../models/note.model';

describe('Notes Actions', () => {
  describe('LoadNotes Actions', () => {
    describe('LoadNotes', () => {
      it('should create an action', () => {
        const action = new fromNotes.LoadNotes();

        expect({ ...action }).toEqual({
          type: fromNotes.LOAD_NOTES,
        });
      });
    });

    describe('LoadNotesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromNotes.LoadNotesFail(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.LOAD_NOTES_FAIL,
          payload,
        });
      });
    });

    describe('LoadNotesSuccess', () => {
      it('should create an action', () => {
        const payload = fromMock.notes;
        const action = new fromNotes.LoadNotesSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.LOAD_NOTES_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('CreateNote Actions', () => {
    describe('CreateNote', () => {
      it('should create an action', () => {
        const payload: Partial<Note> = {
          title: 'Note #2',
        };
        const action = new fromNotes.CreateNote(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.CREATE_NOTE,
          payload,
        });
      });
    });

    describe('CreateNoteFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Create Error' };
        const action = new fromNotes.CreateNoteFail(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.CREATE_NOTE_FAIL,
          payload,
        });
      });
    });

    describe('CreateNoteSuccess', () => {
      it('should create an action', () => {
        const payload: Note = fromMock.notes[0];
        const action = new fromNotes.CreateNoteSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.CREATE_NOTE_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('UpdateNote Actions', () => {
    describe('UpdateNote', () => {
      it('should create an action', () => {
        const payload = fromMock.notes[0];
        const action = new fromNotes.UpdateNote(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.UPDATE_NOTE,
          payload,
        });
      });
    });

    describe('UpdateNoteFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Update Error' };
        const action = new fromNotes.UpdateNoteFail(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.UPDATE_NOTE_FAIL,
          payload,
        });
      });
    });

    describe('UpdateNoteSuccess', () => {
      it('should create an action', () => {
        const payload = fromMock.notes[0];
        const action = new fromNotes.UpdateNoteSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.UPDATE_NOTE_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('RemoveNote Actions', () => {
    describe('RemoveNote', () => {
      it('should create an action', () => {
        const payload = fromMock.notes[0];
        const action = new fromNotes.RemoveNote(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.REMOVE_NOTE,
          payload,
        });
      });
    });

    describe('RemoveNoteFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Remove Error' };
        const action = new fromNotes.RemoveNoteFail(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.REMOVE_NOTE_FAIL,
          payload,
        });
      });
    });

    describe('RemoveNoteSuccess', () => {
      it('should create an action', () => {
        const payload = fromMock.notes[0];
        const action = new fromNotes.RemoveNoteSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromNotes.REMOVE_NOTE_SUCCESS,
          payload,
        });
      });
    });
  });
});
