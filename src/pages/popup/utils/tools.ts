const getData = async (url: string, opt = {}) => {
  return fetch(url, {
    headers: {
      ...(opt.headers || {}),
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: opt.body,
    method: opt.method || "GET",
    mode: "cors",
    credentials: "include",
  })
};

export const getWeekPrice = (code:string) => {
    // 1.xx 上海
    // 0.xx 深圳
  return getData(
    `https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=${code}&klt=102&fqt=1&lmt=66&end=20500000&iscca=1&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6%2Cf7%2Cf8&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64&ut=f057cbcbce2a86e2866ab8877db1d059&forcect=1`,
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language":
          "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,fr;q=0.6,nb;q=0.5,pl;q=0.4,ko;q=0.3,nl;q=0.2,la;q=0.1",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
    }
  ).then(res=> res.json());
};
export const getPb = (code:string) => {
    // 1.xx 上海
    // 0.xx 深圳
  return getData(
    `https://push2.eastmoney.com/api/qt/stock/get?fltt=2&invt=2&secid=${code}&fields=f78,f58,f59,f86,f43,f169,f170,f44,f45,f46,f47,f116,f117,f162,f167,f60,f137,f469,f434,f470,f459,f471,f292&ut=b2884a393a59ad64002292a3e90d46a5&_=${Date.now()}`,
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language":
          "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,fr;q=0.6,nb;q=0.5,pl;q=0.4,ko;q=0.3,nl;q=0.2,la;q=0.1",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
    }
  ).then(res=> res.json());
};
