import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { Note } from '../models/note.model';

@Injectable()
export class NotesService {

  API = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  getNotes() {
    return this.http.get<Note[]>(`${this.API}/notes`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getNote(id: number) {
    return this.http.get<Note>(`${this.API}/notes/${id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }


  createNote(note: Note) {
    return this.http.post<Note>(`${this.API}/notes`, note)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeNote(note: Note) {
    return this.http.delete(`${this.API}/notes/${note.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateNote(note: Note) {
    return this.http.put<Note>(`${this.API}/notes/${note.id}`, note)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
