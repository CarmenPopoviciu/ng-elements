import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';

import {
  MatSliderModule,
  MatSlider,
  MatIconModule,
  MatIcon
} from '@angular/material';

import { NNArtComponent } from './elements/nn-art/nn-art.component';
import { NNMnistComponent } from './elements/nn-mnist/nn-mnist.component';
import { SideNavComponent } from './elements/side-nav/side-nav.component';
import { PaintCanvasComponent } from './elements/paint-canvas/paint-canvas.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule
  ],
  declarations: [
    NNArtComponent,
    NNMnistComponent,
    SideNavComponent,
    PaintCanvasComponent
  ],
  entryComponents: [
    NNArtComponent,
    NNMnistComponent,
    SideNavComponent,
    MatSlider,
    MatIcon
  ]
})
export class ElementsModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const nnArtEl = createCustomElement(NNArtComponent, {
      injector: this.injector
    });
    const nnMnistEl = createCustomElement(NNMnistComponent, {
      injector: this.injector
    });
    const sideNavEl = createCustomElement(SideNavComponent, {
      injector: this.injector
    });
    const matSliderEl = createCustomElement(MatSlider, {
      injector: this.injector
    });
    const matIconEl = createCustomElement(MatIcon, { injector: this.injector });

    customElements.define('nn-art', nnArtEl);
    customElements.define('nn-mnist', nnMnistEl);
    customElements.define('side-nav', sideNavEl);
    customElements.define('mat-slider', matSliderEl);
    customElements.define('mat-icon', matIconEl);
  }
}
