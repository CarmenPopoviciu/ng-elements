import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ENTRY_COMPONENTS, DECLARATIONS } from './elements';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule],
  declarations: DECLARATIONS,
  entryComponents: ENTRY_COMPONENTS
})
export class ElementsModule {
  ngDoBootstrap() {}
}
