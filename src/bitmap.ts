import { btoa } from './converters'

export const createExample = () => {
  // Define the image dimensions
  const width = 200;
  const height = 100;

  // Create an array to hold the pixel data (grayscale)
  const imageData = new Uint8Array(width * height);

  // Fill the pixel data array with your image data (e.g., a gradient from black to white)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = y * width + x; // Calculate the offset for the current pixel
      // For simplicity, we create a gradient from black to white
      const grayscaleValue = Math.floor((x / width) * 255); // Varies from 0 (black) to 255 (white)
      // console.log(`${grayscaleValue}`);
      imageData[offset] = grayscaleValue;
    }
  }

  return imageData
}

// Create a BMP file for grayscale image
export const createGrayscaleBMP = (width: number, height: number, pixelData: Uint8Array) => {
  console.log(`pixelData.length: ${pixelData.length}`);
  const fileSize = 54 + (256 * 4 ) + pixelData.length; // 54 bytes for BMP header + palette data
  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);
  console.log(`view.length: ${view.byteLength}`);

  // BMP header (14 bytes)
  view.setUint8(0, 66); // "B"
  view.setUint8(1, 77); // "M"
  view.setUint32(2, fileSize, true); // File size
  view.setUint32(10, 54, true); // Data offset (header size)

  // DIB header (40 bytes)
  view.setUint32(14, 40, true); // DIB header size
  view.setUint32(18, width, true); // Image width
  view.setUint32(22, height, true); // Image height
  view.setUint16(26, 1, true); // Color planes
  view.setUint16(28, 8, true); // Bits per pixel (8-bit grayscale)
  view.setUint32(30, 0, true); // Compression method
  view.setUint32(34, pixelData.length, true); // Image data size (uncompressed)
  view.setUint32(38, 0, true); // Horizontal resolution (pixels per meter)
  view.setUint32(42, 0, true); // Vertical resolution (pixels per meter)
  view.setUint32(46, 256, true); // Colors in color palette (256 for grayscale)
  view.setUint32(50, 256, true); // Important colors

  // Create a grayscale color palette
  for (let i = 0; i < 256; i++) {
    const colorOffset = 54 + 4 * i;
    view.setUint8(colorOffset, i); // Red
    view.setUint8(colorOffset + 1, i); // Green
    view.setUint8(colorOffset + 2, i); // Blue
  }

  // Copy pixel data into the buffer
  for (let i = 0; i < pixelData.length; i++) {
    view.setUint8(54 + 256 * 4 + i, pixelData[i]);
  }

  // Convert the ArrayBuffer to a Uint8Array
  // const uint8Array = new Uint8Array(buffer);

  // Create a binary string from the Uint8Array
  let binaryString = '';
  for (let i = 0; i < view.getUint8.length; i++) {
    binaryString += String.fromCharCode(view.getUint8(i));
  }

  // Convert the binary string to a Base64-encoded string
  const base64String = btoa(binaryString);

  return base64String
}
