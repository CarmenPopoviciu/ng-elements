export function getBoundingRectangle(
  imgData: Uint8ClampedArray,
  canvas: HTMLCanvasElement
): { xmin: number; xmax: number; ymin: number; ymax: number } {
  let xmin = canvas.width - 1;
  let xmax = 0;
  let ymin = canvas.height - 1;
  let ymax = 0;
  const w = canvas.width;
  const h = canvas.height;

  // Find bounding rect of drawing
  for (let i = 0; i < imgData.length; i += 4) {
    const x = Math.floor(i / 4) % w;
    const y = Math.floor(i / (4 * w));

    if (imgData[i] < 255 || imgData[i + 1] < 255 || imgData[i + 2] < 255) {
      xmin = Math.min(xmin, x);
      xmax = Math.max(xmax, x);
      ymin = Math.min(ymin, y);
      ymax = Math.max(ymax, y);
    }
  }
  return { xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax };
}

export function imageDataToMNIST(
  imgData: ImageData,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): Array<any> {
  // compute bounding rectangle
  const boundingRectangle = getBoundingRectangle(imgData.data, canvas);

  // take drawn shape and display in new canvas
  const cropWidth = boundingRectangle.xmax - boundingRectangle.xmin;
  const cropHeight = boundingRectangle.ymax - boundingRectangle.ymin;
  const drawnImageData = ctx.getImageData(
    boundingRectangle.xmin,
    boundingRectangle.ymin,
    cropWidth,
    cropHeight
  );
  const canvas2 = document.createElement('canvas');
  canvas2.width = drawnImageData.width;
  canvas2.height = drawnImageData.height;
  const ctx2 = canvas2.getContext('2d');
  // Invert black and white to match training data
  for (let i = 0; i < drawnImageData.data.length; i += 4) {
    drawnImageData.data[i] = 255 - drawnImageData.data[i];
    drawnImageData.data[i + 1] = 255 - drawnImageData.data[i + 1];
    drawnImageData.data[i + 2] = 255 - drawnImageData.data[i + 2];
  }
  ctx2.putImageData(drawnImageData, 0, 0);

  // center image and draw in a 20x20 canvas
  const canvas3 = document.createElement('canvas');
  canvas3.height = 20;
  canvas3.width = 20;
  const ctx3 = canvas3.getContext('2d');
  // document.body.appendChild(canvas3);

  let xOffset = 0;
  let yOffset = 0;
  let xScale = 1;
  let yScale = 1;
  const padding = 1;

  if (canvas2.width > canvas2.height) {
    yOffset =
      canvas3.width / canvas2.width * (canvas2.width - canvas2.height) / 2;
    yScale = canvas2.height / canvas2.width;
    xOffset = 1;
  } else if (canvas2.height > canvas2.width) {
    xOffset =
      canvas3.height / canvas2.height * (canvas2.height - canvas2.width) / 2;
    xScale = canvas2.width / canvas2.height;
    yOffset = 1;
  }

  ctx3.fillStyle = 'black';
  ctx3.fillRect(0, 0, canvas3.width, canvas3.height);
  ctx3.drawImage(
    canvas2,
    xOffset,
    yOffset,
    canvas3.width * xScale - 2,
    canvas3.height * yScale
  );

  // mnist canvas
  // const canvas4 = document.getElementById('mnist') as HTMLCanvasElement;
  const canvas4 = document.createElement('canvas');
  canvas4.height = canvas4.width = 28;
  const ctx4 = canvas4.getContext('2d');
  ctx4.fillStyle = 'black';
  ctx4.fillRect(0, 0, 28, 28);
  // document.body.appendChild(canvas4);
  ctx4.drawImage(canvas3, 4, 4, canvas3.width, canvas3.height);

  const data = Array.from(ctx4.getImageData(0, 0, 28, 28).data);
  const mnistData = [];
  for (let i = 0; i < data.length; i += 4) {
    // take just the `r` channel
    mnistData.push(parseFloat((data[i] / 255).toPrecision(3)));
  }
  return mnistData;
}
