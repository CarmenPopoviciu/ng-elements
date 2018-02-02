import {
  Component,
  OnInit,
  ViewChild,
  Input,
  HostListener
} from '@angular/core';
import { ActivationFunction, Cppn, ACTIVATION_FN_NAMES } from './cppn';

// Standard deviations for gaussian weight initialization.
const WEIGHTS_STDEV = 0.6;
const MAT_WIDTH = 30;

@Component({
  selector: 'nn-art',
  templateUrl: './nn-art.component.html',
  styleUrls: ['./nn-art.component.scss']
})
export class NNArtComponent implements OnInit {
  private _cppn: Cppn;
  private _activationFunctionNames: ActivationFunction[] = ACTIVATION_FN_NAMES;
  private _activationFn: ActivationFunction;
  private _numLayers: string;
  private _z1Scale: string;
  private _z2Scale: string;

  @Input() canvasSize: string;
  @Input()
  set activationFn(fn: ActivationFunction) {
    this._activationFn = fn;
    if (this._cppn && this._activationFunctionNames.includes(fn)) {
      this._cppn.setActivationFunction(fn);
    }
  }
  get activationFn(): ActivationFunction {
    return this._activationFn;
  }

  @Input()
  set numLayers(value: string) {
    this._numLayers = value;
    if (this._cppn) {
      this._cppn.setNumLayers(parseInt(value, 10));
    }
  }
  get numLayers(): string {
    return this._numLayers;
  }

  @Input()
  set z1Scale(value: string) {
    this._z1Scale = value;
    if (this._cppn) {
      this._cppn.setZ1Scale(this._convertZScale(parseInt(value, 10)));
    }
  }
  get z1Scale(): string {
    return this._z1Scale;
  }

  @Input()
  set z2Scale(value: string) {
    this._z2Scale = value;
    if (this._cppn) {
      this._cppn.setZ2Scale(this._convertZScale(parseInt(value, 10)));
    }
  }
  get z2Scale(): string {
    return this._z2Scale;
  }

  @ViewChild('canvas') canvas;

  @HostListener('document:keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.canvas.nativeElement.webkitRequestFullScreen();
    }
  }

  ngOnInit() {
    this._cppn = new Cppn(
      this.canvas.nativeElement,
      parseInt(this.canvasSize, 10)
    );
    this._cppn.setActivationFunction(this.activationFn);
    this._cppn.setNumLayers(parseInt(this.numLayers, 10) || undefined);
    this._cppn.setZ1Scale(parseInt(this.z1Scale, 10) || undefined);
    this._cppn.setZ2Scale(parseInt(this.z2Scale, 10) || undefined);
    this._cppn.generateWeights(MAT_WIDTH, WEIGHTS_STDEV);
    this._cppn.start();
  }

  private _convertZScale(z: number): number {
    return 103 - z;
  }
}
