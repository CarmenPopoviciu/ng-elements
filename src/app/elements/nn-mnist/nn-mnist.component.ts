/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import {
  Array1D,
  Array2D,
  CheckpointLoader,
  ENV,
  NDArray,
  Scalar
} from 'deeplearn';

import { NNetUtil as nnet } from './nnet';
import { getBoundingRectangle, imageDataToMNIST } from './utils';
import { PaintCanvasComponent } from './../paint-canvas/paint-canvas.component';

@Component({
  selector: 'nn-mnist',
  templateUrl: './nn-mnist.component.html'
})
export class NNMnistComponent implements OnInit {
  private _model: { [key: string]: Array1D | Array2D };
  predictedDigit: number;

  @Input() height: number;
  @Input() width: number;
  @Input() lineWidth: number;
  @Output() predicted = new EventEmitter();
  @ViewChild(PaintCanvasComponent) paintCanvas: PaintCanvasComponent;

  ngOnInit() {
    const reader = new CheckpointLoader(
      './app/elements/nn-mnist/model_snapshot'
    );
    reader.getAllVariables().then(vars => {
      this._model = nnet.createModelFromSnapshot(vars);
    });
  }

  predict(event) {
    const data = imageDataToMNIST(
      event.data,
      this.paintCanvas.canvasRef.nativeElement,
      this.paintCanvas.ctx
    );

    const math = ENV.math;
    math.scope(async () => {
      this.predictedDigit = Math.round(
        await nnet.predict(Array1D.new(data), this._model).val()
      );
      this.predicted.emit({ predicted: this.predictedDigit });
    });
  }

  onCanvasClear() {
    this.predictedDigit = null;
  }
}
