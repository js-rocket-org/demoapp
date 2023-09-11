const Buffer = require('buffer/').Buffer



function customBtoa(input:string) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    let padding = 0;
    let paddingChar = '=';
  
    for (let i = 0; i < input.length; i += 3) {
      const a = input.charCodeAt(i);
      const b = input.charCodeAt(i + 1);
      const c = input.charCodeAt(i + 2);
  
      const index1 = a >> 2;
      const index2 = ((a & 3) << 4) | (b >> 4);
      const index3 = ((b & 15) << 2) | (c >> 6);
      const index4 = c & 63;
  
      result +=
        chars.charAt(index1) +
        chars.charAt(index2) +
        chars.charAt(index3) +
        chars.charAt(index4);
  
      if (i + 3 > input.length) {
        padding = 3 - (input.length % 3);
      }
    }
  
    return result.slice(0, result.length - padding) + paddingChar.repeat(padding);
  }
  

export const atob = (input:string) => Buffer.from(input, 'base64').toString('ascii')

export const btoa = (input:string) => customBtoa(input) // Buffer.from(input).toString('base64')
