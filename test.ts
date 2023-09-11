/*
bun test.ts | base64 --decode > image8.bmp
*/

import { bmpCreate, bmpBase64, bmpFill, bmpSetPixel } from "./src/bitmap"

const prnt = console.log;


const test24 = () => {
  const bmpData = bmpCreate(24, 64, 64);
  bmpFill(bmpData, 0x005000)

  for (let x = 0; x < 64; x++) {
    bmpSetPixel(bmpData, x, x, 0xff0000)
  }

  bmpSetPixel(bmpData, 0, 0, 0xff0000)
  bmpSetPixel(bmpData, 1, 0, 0x00ff00)
  bmpSetPixel(bmpData, 2, 0, 0x0000ff)

  prnt(bmpBase64(bmpData));
}

const test16 = () => {
  const bmpData = bmpCreate(16, 64, 64);
  bmpFill(bmpData, 0xff)

  for (let x = 0; x < 64; x++) {
    bmpSetPixel(bmpData, x, x, 0x00)
  }

  bmpSetPixel(bmpData, 0, 0, 0x00)
  bmpSetPixel(bmpData, 1, 0, 0x00)
  bmpSetPixel(bmpData, 2, 0, 0x00)

  prnt(bmpBase64(bmpData));
}


const test8 = () => {
  const bmpData = bmpCreate(8, 64, 64);
  bmpFill(bmpData, 0xff)

  for (let x = 0; x < 64; x++) {
    bmpSetPixel(bmpData, x, x, 0x01)
  }

  bmpSetPixel(bmpData, 0, 0, 0x10)
  bmpSetPixel(bmpData, 1, 0, 0xc0)
  bmpSetPixel(bmpData, 2, 0, 0xf0)

  prnt(bmpBase64(bmpData));
}


const main = () => {
  test8();
  // test16();
  // test24();
}

main();