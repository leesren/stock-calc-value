import dayjs from "dayjs";
import { getPb, getWeekPrice } from "../utils/tools";
import Store from "../utils/Store";
import { message } from "antd";

export interface DataType {
  index: string;
  name: string;
  code: string;
  va: number;
  rate: number;
  roe: number;
  pb: number;
  eps: number;
  ror: number;
  min: number;
  max: number;
  rorNow: number;
  market: "1" | "0";
  updateTime: any;
}

export const updateData = (values: any) => {
  return Promise.all([
    getWeekPrice(values.market + "." + values.code).then((res) => {
      if (res && res.data && res.data.klines && res.data.code == values.code) {
        const ls = res.data.klines.map((e) => {
          const [t0, close, price] = e.split(/,/g);
          return { date: t0, close, price };
        });
        const latest = ls[ls.length - 1];
        const sortLs = ls.sort((a, b) => a.price - b.price);
        const min = sortLs[0].price;
        const max = sortLs[sortLs.length - 1].price;
        return {
          min,
          max,
          name: res.data.name,
          va: latest.price,
        };
      }
      return {};
    }),
    getPb(values.market + "." + values.code).then((res) => {
      if (res && res.data && res.data.f167) {
        return {
            pb: res.data.f167,
        };
      }
      return {};
    }),
  ]);
};
