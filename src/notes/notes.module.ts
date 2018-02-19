import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// components
import { NoteItemComponent } from './components/note-item/note-item.component';

// containers
import { NotesComponent } from './containers/notes/notes.component';
import { NoteDetailComponent } from './containers/note-detail/note-detail.component';

// guards
import { NotesGuard } from './guards/notes.guard';
import { NoteExistsGuards } from './guards/note-exists.guard';

// services
import { NotesService } from './services/notes.service';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { TranslateModule } from '@ngx-translate/core';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [NotesGuard],
    component: NotesComponent,
  },
  {
    path: 'new',
    canActivate: [NotesGuard],
    component: NoteDetailComponent,
  },
  {
    path: ':noteId',
    canActivate: [NoteExistsGuards, NotesGuard],
    component: NoteDetailComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('notes', reducers),
    EffectsModule.forFeature(effects),
    TranslateModule.forChild(),
  ],
  providers: [NoteExistsGuards, NotesGuard, NotesService],
  declarations: [NotesComponent, NoteDetailComponent, NoteItemComponent, NoteFormComponent],
  exports: [NotesComponent, NoteDetailComponent, NoteItemComponent, NoteFormComponent],
})
export class NotesModule {
}
