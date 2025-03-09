/**
 * @Title BatchUpdate
 * @Description
 * @Author shaorencen
 * @Created 2025/03/09 16:58:05
 */
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { DataType, updateData } from "./comm";
import Store from "../utils/Store";
import dayjs from "dayjs";
interface BatchUpdateProps {
  list: DataType[];
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const BatchUpdate: React.FC<BatchUpdateProps> = ({ list,onUpdate }) => {
  const [isLading, setIsLading] = useState(false);

  const batch = async () => {
    setIsLading(true);
    for (const element of list) {
      if (element.code) {
        try {
          await updateData(element).then((res) => {
            const [pricesObj, pbObj] = res;
            const result: DataType = {
              ...element,
              ...pricesObj,
              ...pbObj,
              updateTime: dayjs().format("YY/MM/DD HH:mm:ss"),
            };
            Store.replaceData(result);
          });
          await sleep(Math.random() * 1000 + 2000);
        } catch (error) {
          console.error(error);
        }
      }
    }
    setIsLading(false);
    onUpdate && onUpdate()
  };
  return (
    <Button
      color="pink"
      variant="solid"
      type="primary"
      size="small"
      disabled={isLading}
      loading={isLading}
      onClick={() => {
        batch();
      }}
    >
      批量
    </Button>
  );
};
export default BatchUpdate;
