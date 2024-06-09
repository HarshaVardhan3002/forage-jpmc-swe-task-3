import { ServerRespond } from './DataStreamer';

export interface Row {
  stock: string,
  price_abc: number,
  price_def: number,
  ratio: number,
  lower_bound: number,
  upper_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const ratio = priceABC/priceDEF;
    const lowerBound = 1 - 0.05;
    const upperBound = 1 + 0.05;
    return {
      stock: serverResponds[0].stock,
      price_abc: priceABC,
      price_def: priceDEF,
      ratio: ratio,
      lower_bound: lowerBound,
      upper_bound: upperBound,
      trigger_alert: undefined,
      timestamp: serverResponds[0].timestamp> serverResponds[1].timestamp ? serverResponds[0].timestamp :serverResponds[1].timestamp,
      };
    }
  }