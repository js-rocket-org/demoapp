/*
Bitmap file library.  Allows you to create a bitmap image file in memory without a canvas
*/
import { btoa } from './converters'

const BMP_HEADER_SIZE = 54;
const DIB_HEADER_SIZE = 40;

interface BMPObject {
  width: number;
  height: number;
  bpp: number;
  bytesPerCol: number;
  bytesPerRow: number;
  view: DataView;
}

const generate8BitPalette = (view: DataView) => {
  // Grayscale palette (256 entries)
  const paletteOffset = BMP_HEADER_SIZE + DIB_HEADER_SIZE; // Palette starts after the BMP header and DIB header
  for (let i = 0; i < 256; i++) {
    const offset = paletteOffset + i * 4
    view.setUint8(offset, i); // Red
    view.setUint8(offset + 1, i); // Green
    view.setUint8(offset + 2, i); // Blue
    view.setUint8(offset + 3, 0); // Reserved
  }
}

// Create a BMP file with either 8, 16 or 24 bits per pixel
export const bmpCreate = (bpp: 8 | 16 | 24, width: number, height: number): BMPObject => {
  const rowSize = Math.floor((bpp * width + 31) / 32) * 4;
  const pixelArraySize = rowSize * height;
  const paletteSize = bpp === 8 ? 256 : 0;
  const fileSize = bpp === 8 ? BMP_HEADER_SIZE + (256 * 4) + pixelArraySize + 1 :
    BMP_HEADER_SIZE + pixelArraySize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // BMP header (14 bytes)
  view.setUint8(0, 66);                      // "B"
  view.setUint8(1, 77);                      // "M"
  view.setUint32(2, fileSize, true);         // File size
  view.setUint16(6, 0, true);                // Reserved
  view.setUint16(8, 0, true);                // Reserved
  view.setUint32(10, BMP_HEADER_SIZE, true); // Data offset (header size)

  // DIB header (40 bytes)
  view.setUint32(14, DIB_HEADER_SIZE, true); // DIB header size
  view.setUint32(18, width, true);           // Image width
  view.setUint32(22, height, true);          // Image height
  view.setUint16(26, 1, true);               // Color planes
  view.setUint16(28, bpp, true);             // Bits per pixel (8-bit grayscale)
  view.setUint32(30, 0, true);               // Compression method
  view.setUint32(34, pixelArraySize, true);  // Image data size (uncompressed)
  view.setUint32(38, 2835, true);            // Horizontal resolution (pixels per meter)
  view.setUint32(42, 2835, true);            // Vertical resolution (pixels per meter)
  view.setUint32(46, paletteSize, true);     // Colors in color palette (256 for grayscale)
  view.setUint32(50, 0, true);               // Important colors

  if (bpp === 8) generate8BitPalette(view)

  const bytesPerPixel = (bpp / 8) | 0
  return {
    width: width,
    height: height,
    bpp: bpp,
    bytesPerCol: bytesPerPixel,
    bytesPerRow: (bytesPerPixel * width) + (width % 4),
    view: view,
  }
}

export const bmpSetPixel = (bmp: BMPObject, x: number, y: number, color: number) => {
  if (x > bmp.width - 1) return;
  if (y > bmp.height - 1) return;
  const view = bmp.view;

  if (bmp.bpp === 8) {
    const p = BMP_HEADER_SIZE + (256 * 4) + (y * bmp.bytesPerRow + x)
    view.setUint8(p, color & 0xff);
    return;
  }

  const red = (color >> 16) & 0xff
  const green = (color >> 8) & 0xff
  const blue = color & 0xff
  const i = BMP_HEADER_SIZE + (y * bmp.bytesPerRow) + (x * bmp.bytesPerCol)

  if (bmp.bpp === 16) {
    const colorVal = (red << 11) | (green << 5) | blue;
    view.setUint16(i, colorVal);
    return;
  }

  view.setUint8(i, blue);
  view.setUint8(i + 1, green);
  view.setUint8(i + 2, red);
}

export const bmpFill = (bmp: BMPObject, color: number) => {
  const view = bmp.view
  for (let y = 0; y < bmp.height; y++) {
    for (let x = 0; x < bmp.width; x++) {
      if (bmp.bpp === 8) {
        const p = BMP_HEADER_SIZE + (256 * 4) + (y * bmp.bytesPerRow + x)
        view.setUint8(p, color & 0xff);
      } else {
        const i = BMP_HEADER_SIZE + (y * bmp.bytesPerRow) + (x * bmp.bytesPerCol)
        const red = (color >> 16) & 0xff
        const green = (color >> 8) & 0xff
        const blue = color & 0xff

        if (bmp.bpp === 16) {
          const colorVal = (red << 11) | (green << 5) | blue;
          view.setUint16(i, colorVal);
        } else {
          view.setUint8(i, blue); // B
          view.setUint8(i + 1, green); // G
          view.setUint8(i + 2, red); // R
        }
      }
    }
  }
}

export const bmpBase64 = (bmp: BMPObject) => {
  // const uint8Array = new Uint8Array(bmp.view.buffer);
  // const binaryString = String.fromCharCode.apply(null, uint8Array as unknown as number[]);

  // So we must do it the old way
  let binaryString = '';
  const view = bmp.view;
  for (let i = 0; i < view.byteLength; i++) {
    const byte = view.getUint8(i);
    binaryString += String.fromCharCode(byte);
  }

  return btoa(binaryString);
}