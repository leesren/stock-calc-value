/**
 * @Title Detail
 * @Description
 * @Author shaorencen
 * @Created 2025/03/09 09:57:00
 */
import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, message, Radio, Space } from "antd";
import { useDeepCompareEffect } from "ahooks";
import Desc from "./Desc";
import { getPb, getWeekPrice } from "../utils/tools";
import Store from "../utils/Store";
import dayjs from "dayjs";
import { updateData } from "./comm";
interface DetailProps {
  name?: string;
  item?: any;
}

const Detail: React.FC<DetailProps> = ({ item: activeItem, onUpdate }) => {
  const [item, setItem] = useState(activeItem);
  const [form] = Form.useForm();
  useDeepCompareEffect(() => {
    if (activeItem) {
      form.resetFields();
      form.setFieldsValue(activeItem);
      setItem(activeItem);
    }
  }, [activeItem]);
  useEffect(() => {
    message.config({
      getContainer: () => document.getElementById("detailId") || document.body,
    });
  }, []);
  return (
    <div className="flex " id="detailId">
      <div className="w-[280px]">
        <Form
          form={form}
          size="small"
          onFinish={(values) => {
            console.log(values);
            setItem(values);
          }}
          autoComplete="off"
          labelCol={{ style: { width: 100, color: "red" } }}
        >
          <Form.Item name="name" label="股票名称" rules={[{ required: true }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item name="code" label="股票代码" rules={[{ required: true }]}>
            <Input
              placeholder="请输入"
              onChange={(v) => {
                const code = v.target.value;

                const shanghaiRegex = /^(60[0135]|68[89])\d{3}$/;
                const shenzhenRegex = /^(00[02]|30[01])\d{3}$/;
                if (shanghaiRegex.test(code)) {
                  form.setFieldsValue({
                    market: "1",
                  });
                } else if (shenzhenRegex.test(code)) {
                  form.setFieldsValue({
                    market: "0",
                  });
                }
              }}
            />
          </Form.Item>
          <Form.Item name="va" label="当前股价" rules={[{ required: true }]}>
            <InputNumber placeholder="请输入" className="!w-full" />
          </Form.Item>
          <Form.Item name="pb" label="当前PB" rules={[{ required: true }]}>
            <InputNumber className="!w-full" placeholder="请输入" />
          </Form.Item>
          <Form.Item name="min" label="周线最低价" rules={[{ required: true }]}>
            <InputNumber className="!w-full" placeholder="请输入" />
          </Form.Item>
          <Form.Item name="max" label="周线最高价" rules={[{ required: true }]}>
            <InputNumber className="!w-full" placeholder="请输入" />
          </Form.Item>
          <Form.Item name="roe" label="ROE(%)" rules={[{ required: true }]}>
            <InputNumber className="!w-full" placeholder="请输入" />
          </Form.Item>
          <Form.Item name="eps" label="EPS(元)" rules={[{ required: true }]}>
            <InputNumber className="!w-full" placeholder="请输入" />
          </Form.Item>
          <Form.Item name="market" label="市场" rules={[{ required: true }]}>
            <Radio.Group
              block
              options={[
                { label: "上证", value: "1" },
                { label: "深证", value: "0" },
              ]}
              defaultValue="Apple"
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item
            name="rate"
            label="国债基准(%)"
            rules={[{ required: true }]}
          >
            <InputNumber defaultValue={3} className="!w-full" placeholder="请输入(默认3%)" />
          </Form.Item>
          <Form.Item>
            <div className="text-center">
              <Space>
                <Button htmlType="reset">重置</Button>
                <Button
                  htmlType="button"
                  danger
                  onClick={() => {
                    const values = form.getFieldsValue();
                    Store.replaceData(values);
                    updateData(values).then((res) => {
                      const [pricesObj, pbObj] = res;
                      const result = {
                        ...form.getFieldsValue(),
                        ...pricesObj,
                        ...pbObj,
                        updateTime: dayjs().format("YY/MM/DD HH:mm:ss"),
                      };
                      setItem(result);
                      form.setFieldsValue(result);
                      message.success({
                        content: `更新成功`,
                      });
                      Store.replaceData(result);
                      setTimeout(() => {
                        onUpdate && onUpdate(result);
                      }, 100);
                    });
                  }}
                >
                  更新
                </Button>

                <Button type="primary" htmlType="submit">
                  计算
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className="flex-1 ml-15px">
        <Desc item={item} />
      </div>
    </div>
  );
};
export default Detail;
