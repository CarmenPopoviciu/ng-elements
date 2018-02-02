import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerAsCustomElements } from '@angular/elements';

import { MatSlider, MatIcon } from '@angular/material';

import { ElementsModule } from './app/elements.module';
import { NNArtComponent } from './app/elements/nn-art/nn-art.component';

import { environment } from './environments/environment';
import { SideNavComponent } from './app/elements/side-nav/side-nav.component';
import { ENTRY_COMPONENTS } from './app/elements';

if (environment.production) {
  enableProdMode();
}

registerAsCustomElements(ENTRY_COMPONENTS, () =>
  platformBrowserDynamic().bootstrapModule(ElementsModule)
)
  .then(_ => {})
  .catch(err => console.log(err));
