import { MatSlider, MatIcon } from '@angular/material';

import { NNArtComponent } from './elements/nn-art/nn-art.component';
import { SideNavComponent } from './elements/side-nav/side-nav.component';
import { PaintCanvasComponent } from './elements/paint-canvas/paint-canvas.component';
import { NNMnistComponent } from './elements/nn-mnist/nn-mnist.component';
import { MyTodo } from './elements/todo/my-todo.component';
export const DECLARATIONS = [
  NNArtComponent,
  NNMnistComponent,
  SideNavComponent,
  PaintCanvasComponent
];

export const ENTRY_COMPONENTS = [
  NNArtComponent,
  NNMnistComponent,
  SideNavComponent,
  MatSlider,
  MatIcon,
  MyTodo
];
