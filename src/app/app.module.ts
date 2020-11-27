import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatInboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
