import { xprod, flatten } from 'ramda';
// example
export const multipledParts: any = (parts: any[][]) => parts.reduce(<any>xprod)
  .map(<any>flatten)