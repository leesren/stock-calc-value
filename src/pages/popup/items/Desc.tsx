/**
 * @Title Desc
 * @Description
 * @Author shaorencen
 * @Created 2025/03/09 10:14:34
 */
import React, { useState, useEffect } from "react";
import { Button, Divider, Space } from "antd";
import { DataType } from "./comm";
interface DescProps {
  item?: DataType;
}

const foo2 = (v, len = 2) => {
  return Number(v).toFixed(len);
};
const Desc: React.FC<DescProps> = ({ item }) => {
  console.log(item);
  const B = foo2((item?.eps / item?.roe) * 100);
  const pbMin = foo2(item?.min / B);
  const pbTTM = foo2(item?.va / B);
  const pbMax = foo2(item?.max / B);
  const rorMin = foo2(item?.roe / pbMin);
  const rorTTM = foo2(item?.roe / pbTTM);
  const rorMax = foo2(item?.roe / pbMax);
  const preRate = foo2(item?.roe / item?.pb, 2);
  const latestPB = item?.roe / (item?.rate * 2);
  return (
    <div className="  max-h-[460px] overflow-y-auto">
      <div className="shadow-md px-[15px]">
        <div>
          <h3 className="flex">
            <Space>
              <span className=" font-bold">1. 核心公式</span>
              <b>
                <span className=" text-blue-600">股价 = PB * B</span>
              </b>
              <span>其中：</span>
            </Space>
          </h3>

          <ul className="list-disc ml-[20px]">
            <li>
              <p>
                <strong>PB</strong> = ROE / (国债利率 + 风险溢价){" "}
              </p>
            </li>
            <li>
              <p className="text-blue-600">
                <strong>B</strong> = EPS / ROE（每股净资产）
              </p>
            </li>
          </ul>
          <Divider className="!my-[5px]" />
        </div>

        <div>
          <h3>
            <strong>
              2. 代入 <span className="">【{item?.name}】</span>数据
            </strong>
          </h3>
          <div className="pl-[15px]">
            <div>
              <strong>A. 计算每股净资产（B）</strong>

              <p>
                <span>B = EPS / ROE </span>= {item?.eps} / {item?.roe}% = {B} 元
              </p>

              <Divider className="!my-[5px]" />
            </div>
            <div>
              <strong>B. 计算当前PB</strong>
              <p>
                <span>PB(min) = 股价(min) / B </span> = {item?.min} / {B} = {}倍
              </p>
              <p className="text-blue-600">
                <span>PB(当前) = 股价(当前) / B </span> = {item?.va} / {B} =
                {pbTTM} 倍
              </p>

              <p>
                <span>PB(max) = 股价(max) / B </span> = {item?.max} / {B} ={" "}
                {pbMax}倍
              </p>

              <Divider className="!my-[5px]" />
            </div>
            <div>
              <strong>C. 计算隐含的投资回报率（ROR）</strong>
              <p>
                <span>ROR(min) = ROE / PB </span> ={item?.roe} / {pbMin} ={" "}
                {rorMin}%
              </p>
              <p className="text-blue-600">
                <span>ROR(当前) = ROE / PB </span> ={item?.roe} / {pbTTM} ={" "}
                {rorTTM}%
              </p>
              <p>
                <span>ROR(max) = ROE / PB </span> ={item?.roe} / {pbMax} ={" "}
                {rorMax}%
              </p>
              <Divider className="!my-[5px]" />
            </div>
            <div>
              <strong>D. 计算当前风险溢价</strong>(跟国债{item?.rate}%相比)
              <p>
                <span>风险溢价 = ROR - 国债利率 </span>= {rorTTM}% -{" "}
                {item?.rate}% = {foo2(rorTTM - item?.rate)}%
              </p>
            </div>
            <Divider className="!my-[5px]" />
          </div>
        </div>
        <div className="pb-[20px]">
          <div>
            <h4>
              <strong>5. 结论与建议</strong>
            </h4>
            <Divider className="!my-[5px]" />
          </div>
          <div className="pl-[15px]">
            <div>
              假设 <span className=" text-blue-400">【{item?.name}】</span>
              的每股净资产为100元，ROE 稳定在 {item?.roe}%
              左右，意味着每年能为股东创造
              {item?.roe} 元的净利润。此时若以 {item?.pb} 倍 PB 买入，相当于：
              <ul className="list-disc ml-[20px]">
                <li>
                  <p>本金投入：{item?.pb * 100}元</p>
                </li>
                <li>
                  <p>
                    年收益：{item?.roe}元（ROE×净资产）= {item?.roe}%×100元）
                  </p>
                </li>
                <li>
                  <p>
                    预期收益率：{item?.roe} 元 / {item?.pb * 100}元 ≈ {preRate}
                    %（ROE/PB）
                  </p>
                </li>

                <li>
                  <p>
                    这就类似于用{item?.pb * 100}元购买了一份面值100元、年利率
                    {item?.roe}%的债券，虽然本金溢价
                    {foo2(100 * item?.pb - 100, 0)}%，预期收益率（{preRate}
                    %）仍&nbsp;
                    {Number(preRate) > Number(item?.rate) ? (
                      <span className="text-red-600 font-bold">高于</span>
                    ) : (
                      <span className="text-green-600 font-bold">低于</span>
                    )}
                    &nbsp; 当前的无风险收益率（{item?.rate}%）
                  </p>
                </li>
                <li>
                  <p className="activec">
                    如果预期收益率：2倍{item?.rate}%={item?.rate * 2}%,需要PB，
                    {item?.roe}/{item?.rate * 2}% ≈ {foo2(latestPB * 100, 0)} ≈
                    {foo2(latestPB, 2)}PB，
                    <br />
                    即： 股价 = PB * B = {foo2(latestPB, 2)} * {B} ={" "}
                    {foo2(latestPB * B, 2)}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Desc;
