import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

import * as fromStore from '../store';

import { Note } from '../models/note.model';

@Injectable()
export class NoteExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.NotesState>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.noteId, 10);
        return this.hasNote(id);
      })
    );
  }

  hasNote(id: number): Observable<boolean> {
    return this.store
      .select(fromStore.getNoteEntities)
      .pipe(
        map((entities: { [key: number]: Note }) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getNotesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadNotes());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
