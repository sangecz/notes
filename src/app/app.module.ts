import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './containers/app.component';
import { environment } from '../environments/environment';
import { CustomSerializer, effects, reducers } from './store';
import { NavbarComponent } from './components/navbar/navbar.component';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LangSelectComponent } from './components/lang-select/lang-select.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// routes
export const ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'notes'},
  {
    path: 'notes',
    loadChildren: '../notes/notes.module#NotesModule',
  },
  {path: '**', redirectTo: 'notes'},
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [{provide: RouterStateSerializer, useClass: CustomSerializer}],
  declarations: [AppComponent, NavbarComponent, LangSelectComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
