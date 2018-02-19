import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';

import * as fromActions from '../actions/notes.action';
import * as fromMock from '../notes.mock';
import { Observable } from 'rxjs/Observable';
import { NotesEffects } from './notes.effect';

const stubService = (method: string, response?: any, err?: boolean): any => {
  const service = jasmine.createSpyObj('service', [method]);
  service[method].and.returnValue(err ? Observable.throw(response) : of(response));
  return service;
};

const stubEffects = (actions, service) => new NotesEffects(actions, service);

describe('NotesEffects', () => {

  describe('loadNotes$', () => {
    it('should return a collection from LoadNotesSuccess', () => {
      const action = new fromActions.LoadNotes();
      const completion = new fromActions.LoadNotesSuccess(fromMock.notes);

      const actions = new Actions(hot('-a', {a: action}));
      const service = stubService('getNotes', fromMock.notes);
      const effects = stubEffects(actions, service);

      const expected = cold('-b', {b: completion});
      expect(effects.loadNotes$).toBeObservable(expected);
    });
  });

  describe('createNote$', () => {
    it('should work', () => {
      const action = new fromActions.CreateNote(fromMock.notes[0]);
      const completion = new fromActions.CreateNoteSuccess(fromMock.notes[0]);

      const actions = new Actions(hot('-a', {a: action}));
      const service = stubService('createNote', fromMock.notes[0]);
      const effects = stubEffects(actions, service);

      const expected = cold('-c', {c: completion});
      expect(effects.createNote$).toBeObservable(expected);
    });
  });

  describe('updateNote$', () => {
    it('should work', () => {
      const action = new fromActions.UpdateNote(fromMock.notes[0]);
      const completion = new fromActions.UpdateNoteSuccess(fromMock.notes[0]);

      const actions = new Actions(hot('-a', {a: action}));
      const service = stubService('updateNote', fromMock.notes[0]);
      const effects = stubEffects(actions, service);

      const expected = cold('-c', {c: completion});
      expect(effects.updateNote$).toBeObservable(expected);
    });
  });

  describe('removeNote$', () => {
    it('should work', () => {
      const action = new fromActions.RemoveNote(fromMock.notes[0]);
      const completion = new fromActions.RemoveNoteSuccess(fromMock.notes[0]);

      const actions = new Actions(hot('-a', {a: action}));
      const service = stubService('removeNote', fromMock.notes[0]);
      const effects = stubEffects(actions, service);

      const expected = cold('-c', {c: completion});
      expect(effects.removeNote$).toBeObservable(expected);
    });
  });
});
