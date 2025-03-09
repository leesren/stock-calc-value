import React, { useMemo, useState } from "react";
import logo from "@assets/img/logo.svg";
import { Button, Modal, Space, Tabs } from "antd";
import ListMore from "./items/ListMore";
import Detail from "./items/Detail";
import Store from "./utils/Store";
import Search from "antd/es/input/Search";
import Paragraph from "antd/es/typography/Paragraph";
import UpdateModal from "./items/UpdateModal";
import BatchUpdate from "./items/BatchUpdate";

export default function Popup() {
  const [list, setList] = useState(Store.getData());
  const [activeKey, setActiveKey] = useState("1");
  const [activeItem, setActiveItem] = useState(list[0]);
  const [filterValue, setFilterValue] = useState("");
  const lastLs = useMemo(() => {
    if (!filterValue) {
      return list;
    }
    return list.filter((item) => {
      return (
        (item.name + "").includes(filterValue) ||
        (item.code + "").includes(filterValue)
      );
    });
  }, [filterValue, list]);

  return (
    <div className="mx-auto  px-[15px] relative">
      <Tabs
        defaultActiveKey="1"
        size={"small"}
        activeKey={activeKey}
        tabBarStyle={{
          // margin:'10px 0 0 0',
          marginTop: 5,
        }}
        type="card"
        onChange={(v) => {
          setActiveKey(v);
        }}
        items={[
          {
            label: "自选",
            key: "1",
            children: (
              <div className="w-[780px]">
                <ListMore
                  data={lastLs}
                  onUpdate={() => {
                    setList(Store.getData());
                  }}
                  onClickRowItem={(item, evt) => {
                    setActiveItem(item);
                    setActiveKey("2");
                  }}
                />
              </div>
            ),
          },
          {
            label: "明细",
            key: "2",
            children: (
              <Detail
                item={activeItem}
                onUpdate={() => {
                  setList(Store.getData());
                }}
              />
            ),
          },
        ]}
      />
      <div className="absolute top-[8px] right-[10px]">
        <Space className="flex">
          <Search
            placeholder="请输入关键字"
            allowClear
            size="small"
            onSearch={(e) => {
              setFilterValue(e);
            }}
          />
          <UpdateModal
            onUpdate={() => {
              setList(Store.getData());
            }}
          />
          <BatchUpdate
            list={lastLs}
            onUpdate={() => {
              setList(Store.getData());
            }}
          />
          <Paragraph
            className="!mb-0"
            copyable={{
              text: async () => {
                return Store.getDataStr();
              },
            }}
          >
            <Button type="primary" size="small" ghost onClick={() => {}}>
              复制
            </Button>
          </Paragraph>

          <Button
            type="primary"
            size="small"
            onClick={() => {
              setActiveItem({});
              setActiveKey("2");
            }}
          >
            新增
          </Button>
        </Space>
      </div>
    </div>
  );
}
