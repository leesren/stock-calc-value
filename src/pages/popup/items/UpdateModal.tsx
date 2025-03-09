/**
 * @Title UpdateModal
 * @Description
 * @Author shaorencen
 * @Created 2025/03/09 16:35:09
 */
import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import Store from "../utils/Store";
interface UpdateModalProps {
  name?: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();
  return (
    <div ref={ref}>
      <Button
        type="primary"
        variant="solid"
        size="small"
        color="purple"
        onClick={() => {
          setShowModal(true);
        }}
      >
        更新数据
      </Button>
      <Modal
        getContainer={(ref) => {
          return ref || document.body;
        }}
        title="最新数据"
        open={showModal}
        onOk={() => {
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <TextArea
          placeholder="请输入最新数据"
          rows={8}
          onChange={(e) => {
            const str = e.target.value;
            if (str.length > 0) {
              const data = JSON.parse(str);
              Store.setDataStr(str);
              onUpdate && onUpdate();
            }
          }}
        />
      </Modal>
    </div>
  );
};
export default UpdateModal;
