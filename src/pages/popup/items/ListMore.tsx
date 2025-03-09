import React, { useState } from "react";
import { Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { DataType, updateData } from "./comm";
import { useDeepCompareEffect } from "ahooks";
import dayjs from "dayjs";
import Store from "../utils/Store";
import Paragraph from "antd/es/typography/Paragraph";

const foo2 = (v, len = 2) => {
  return Number(v).toFixed(len);
};
const calc = (ls: DataType[]) => {
  return ls.map((el, idx) => {
    return {
      ...el,
      index: idx + 1,
      rorNow: foo2(el.roe / (el.va / ((el.eps / el.roe) * 100)), 2),
      ror: foo2(el.roe / el.pb, 2),
    };
  });
};
export default ({ data: list, onClickRowItem, onUpdate }) => {
  const [data, setData] = useState(calc(list));
  useDeepCompareEffect(() => {
    setData(calc(list));
  }, [list]);
  //   console.log(JSON.stringify(list));
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "序号",
      dataIndex: "index",
      width: 35,
      fixed: "left",
    },
    {
      title: "股票名称",
      dataIndex: "name",
      width: 80,
      fixed: "left",
      onCell: (record) => {
        return {
          onClick: (idx) => {
            onClickRowItem(record, idx);
          },
        };
      },
      render: (_, record) => (
        <Paragraph className="!mb-0" copyable={{ text: _ }}>
          <span className="text-blue-700 cursor-pointer hover:underline">
            {_}
          </span>
        </Paragraph>
      ),
    },
    {
      title: "股票代码",
      dataIndex: "code",
      width: 60,
      fixed: "left",
      // render: (_, record) => <span>000211</span>,
    },
    {
      title: "股价",
      dataIndex: "va",
      width: 60,
    },
    {
      title: "PB",
      dataIndex: "pb",
      width: 50,
      sorter: (a, b) => a.pb - b.pb,
    },
    {
      title: "ROE(%)",
      dataIndex: "roe",
      width: 70,
      sorter: (a, b) => a.roe - b.roe,
    },
    {
      title: "EPS",
      dataIndex: "eps",
      width: 55,
      sorter: (a, b) => a.eps - b.eps,
    },
    {
      title: "股价(周线)",
      width: 90,
      render: (_, record) => (
        <span>
          {record.min}~{record.max}
        </span>
      ),
    },
    {
        title: "当前ROR",
        dataIndex: "rorNow",
        sorter: (a, b) => a.rorNow - b.rorNow,
        width: 75,
        render: (_, record) => {
          let c = "";
          if (_ >= 5) {
            c = "text-red-500";
          } else if (_ >= 3) {
            c = " text-orange-400";
          }
          return (
            <span className={c+' '+ ' font-bold'}>
              <i className="text-red-500 font-semibold text-orange-400  text-green-600"></i>
              {_}%
            </span>
          );
        },
      },
    {
      title: "预计ROR",
      dataIndex: "ror",
      width: 75,
      sorter: (a, b) => a.ror - b.ror,
      render: (_, record) => <span>{_ + "%"}</span>,
    },

   
    {
      title: "更新时间",
      dataIndex: "updateTime",
      sorter: (a, b) => a.updateTime - b.updateTime,
      width: 100,
      render: (_, record) => <span className="text-[12px]">{_}</span>,
    },

    {
      title: "操作",
      dataIndex: "ac",
      width: 70,
      render: (_, record) => (
        <Space size="small" className="text-[13px]">
          <span
            className=" text-blue-600 cursor-pointer"
            onClick={() => {
              updateData(record).then((res) => {
                const [pricesObj, pbObj] = res;
                const result: DataType = {
                  ...record,
                  ...pricesObj,
                  ...pbObj,
                  updateTime: dayjs().format("YY/MM/DD HH:mm:ss"),
                };
                Store.replaceData(result);
                onUpdate && onUpdate(result);
              });
            }}
          >
            更新
          </span>
          <Popconfirm
            title="删除"
            description="是否确定删除?"
            onConfirm={() => {
              Store.deleteData(record.name);
              onUpdate && onUpdate();
            }}
            okText="Yes"
            cancelText="No"
          >
            <span className="text-red-500 cursor-pointer" onClick={() => {}}>
              删除
            </span>
          </Popconfirm>
          ;
        </Space>
      ),
    },
  ];
  return (
    <Table<DataType>
      // size="small"
      size="small"
      scroll={{ y: 55 * 8, x: 1100 }}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 50,

        rootClassName: "!justify-center",
      }}
      //   onRow={(record) => {
      //     return {
      //       onClick: (event) => {

      //       }, // 点击行
      //       onDoubleClick: (event) => {},
      //       onContextMenu: (event) => {},
      //       onMouseEnter: (event) => {}, // 鼠标移入行
      //       onMouseLeave: (event) => {},
      //     };
      //   }}
    />
  );
};
