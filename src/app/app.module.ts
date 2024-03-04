import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormOfScheduleComponent} from "./components/form-of-schedule/form-of-schedule.component";
import {TableOfScheduleComponent} from "./components/table-of-schedule/table-of-schedule.component";
import {HttpClientModule} from "@angular/common/http";
import { TimeFormatPipe } from './shared/pipes/time-format.pipe';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    FormOfScheduleComponent,
    TableOfScheduleComponent,
    TimeFormatPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
