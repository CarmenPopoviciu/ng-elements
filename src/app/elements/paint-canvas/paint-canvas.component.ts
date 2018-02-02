import {
  Component,
  ElementRef,
  ViewChild,
  NgZone,
  Renderer2,
  OnInit,
  EventEmitter,
  Output,
  Input
} from '@angular/core';

export interface MousePosition {
  x: number;
  y: number;
}

@Component({
  selector: 'paint-canvas',
  templateUrl: './paint-canvas.component.html',
  styleUrls: ['./paint-canvas.component.scss']
})
export class PaintCanvasComponent implements OnInit {
  private _painting = false;
  private _prevMousePos: MousePosition;
  ctx: CanvasRenderingContext2D;

  @Input() width: number;
  @Input() height: number;
  @Input() lineWidth: number;
  @Input() clearable = false;
  @Output() endPaint: EventEmitter<any> = new EventEmitter();
  @Output() cleared: EventEmitter<any> = new EventEmitter();

  @ViewChild('mnistCanvas') canvasRef: ElementRef;

  constructor(private _ngZone: NgZone, private _renderer: Renderer2) {}

  ngOnInit() {
    this._renderer.setProperty(
      this.canvasRef.nativeElement,
      'height',
      this.height
    );
    this._renderer.setProperty(
      this.canvasRef.nativeElement,
      'width',
      this.width
    );
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'white';
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.fillRect(0, 0, this.width, this.height);

    /**
     * register the mousemove listener outside ngZone so change detection is
     * not performed at every mouse move and therefore hurt perf
     */

    this._ngZone.runOutsideAngular(() => {
      this._renderer.listen(
        this.canvasRef.nativeElement,
        'mousemove',
        this.paint.bind(this) // why oh why :(
      );
    });
  }

  beginPaint(ev: MouseEvent): void {
    this._prevMousePos = this._getMousePosition(
      this.canvasRef.nativeElement,
      ev
    );
    this._painting = true;
  }

  paint(ev: MouseEvent): void {
    if (this._painting) {
      const mousePos = this._getMousePosition(this.canvasRef.nativeElement, ev);
      this._draw(this.ctx, mousePos, this._prevMousePos);
      this._prevMousePos = mousePos;
    }
  }

  finishPaint(ev: MouseEvent): void {
    this._painting = false;
    this.endPaint.emit({ data: this._getImageData() });
  }

  clear(): void {
    this.ctx.clearRect(
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );
    this.ctx.fillStyle = 'white';
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.cleared.emit();
  }

  private _getImageData(): ImageData {
    return this.ctx.getImageData(
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );
  }

  private _getMousePosition(
    canvas: HTMLCanvasElement,
    evt: MouseEvent
  ): MousePosition {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  private _draw(
    ctx: CanvasRenderingContext2D,
    mousePos: MousePosition,
    prevMousePos: MousePosition
  ): void {
    ctx.beginPath();
    ctx.moveTo(prevMousePos.x, prevMousePos.y);
    ctx.lineWidth = this.lineWidth;
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.closePath();
    ctx.stroke();
  }
}
