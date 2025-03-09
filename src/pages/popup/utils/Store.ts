import { DataType } from "../items/comm";

const KEY = "stock-preference";
export default {
  setDataStr(lsStr:string) {
    localStorage.setItem(KEY, lsStr);
  },
  setData(ls: DataType[]) {
    localStorage.setItem(KEY, JSON.stringify(ls));
  },
  getData(): DataType[] {
    const ls = localStorage.getItem(KEY);
    return ls ? JSON.parse(ls) : [];
  },
  getDataStr(): any {
    const ls = localStorage.getItem(KEY);
    return ls ;
  },
  removeData(key: string) {
    localStorage.removeItem(key);
  },
  deleteData(name: string) {
    const ls = this.getData();
    const idx = ls.findIndex((item) => item.name === name);
    if (idx != -1) {
      ls.splice(idx, 1);
      this.setData(ls);
    }
  },
  replaceData(value: DataType) {
    const ls = this.getData();
    const idx = ls.findIndex((item) => item.name === value.name);
    if (idx != -1) {
      ls.splice(idx, 1, value);
    } else {
      ls.push(value);
    }
    this.setData(ls);
  },
};
