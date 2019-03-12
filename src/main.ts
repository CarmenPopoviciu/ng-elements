import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MatSlider, MatIcon } from '@angular/material';

import { ElementsModule } from './app/elements.module';
import { NNArtComponent } from './app/elements/nn-art/nn-art.component';

import { environment } from './environments/environment';
import { SideNavComponent } from './app/elements/side-nav/side-nav.component';
import { ENTRY_COMPONENTS } from './app/elements';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(ElementsModule)
  .then(_ => {
    // const nnArt = document.querySelector('nn-art');
    // const slider = document.querySelector('mat-slider');
    // const input = document.querySelector('input');
    // const mnist = document.querySelector('nn-mnist');

    // slider.addEventListener('change', (ev: CustomEvent) => {
    //   nnArt.setAttribute('num-layers', ev.detail.value);
    // });
    // input.addEventListener('input', (ev: Event) => {
    //   nnArt.setAttribute('activation-fn', ev.target['value']);
    // });

    // mnist.addEventListener('predicted', (ev: CustomEvent) => {
    //   const value = ev.detail.predicted;
    //   nnArt.setAttribute('num-layers', value);
    //   slider.setAttribute('value', value);
    // });
  })
  .catch(err => console.log(err));
