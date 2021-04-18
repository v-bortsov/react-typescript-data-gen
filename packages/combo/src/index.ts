import { xprod, flatten } from 'ramda';

export const multipledParts: any = (parts: any[][]) => parts.reduce(<any>xprod)
  .map(<any>flatten)