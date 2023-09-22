import React from "react";
import { styles } from "../../../common/styles";
import { useState } from "react";
import { StyledDropDown } from "../../../styled-components/Styled";
import { Space } from "antd";
import { CaretDownFilled } from "@ant-design/icons";

const DropDownItem = ({ defaultValue, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleMouseEnter() {
    setIsOpen((prevState) => true);
    console.log("isopen", isOpen);
  }
  function handleMouseLeave() {
    setIsOpen((prevState) => false);
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <StyledDropDown
          overlayStyle={isOpen ? styles.dropDownMenu : styles.active}
          menu={{
            items
          }}
          placement="bottom"
        >
          <Space>
            {defaultValue}
            <CaretDownFilled />
          </Space>
        </StyledDropDown>
    </div>
  );
};

export default DropDownItem;
