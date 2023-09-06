const Buffer = require('buffer/').Buffer

export const atob = (input:string) => Buffer.from(input, 'base64').toString('ascii')

export const btoa = (input:string) => Buffer.from(input).toString('base64')
