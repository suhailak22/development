import { Button, Input, Menu, Select, Space } from "antd";
import "./header.css";
import React from "react";
import { locations, prime, help, items } from "../../utils/Utils";
import { CaretDownFilled, DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { StyledDropDown } from "../../styled-components/Styled";
import albion from "../../assets/mainlogo.png";
import { styles } from "../../common/styles";

const { Option } = Select;

const Header = () => {

  function handleButtonClick(e){
    console.log("e",e)
  }


  const handleMenuClick = (e) => {
    console.log(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="option1">Option 1</Menu.Item>
      <Menu.Item key="option2">Option 2</Menu.Item>
      <Menu.Item key="option3">Option 3</Menu.Item>
    </Menu>
  );

  return (
    <div className="header_cls">
      <section className="left-side">
        <img src={albion} />
      </section>
      <div>
        <section className="sub-head1">
          <StyledDropDown
            overlayStyle={styles.dropDownMenu}
            overlay={menu}
            placement="bottom"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Space>
              Bengaluru
              <CaretDownFilled style={styles.downIcon}/>
            </Space>
          </StyledDropDown>
          <StyledDropDown
            overlayStyle={styles.dropDownMenu}
            overlay={menu}
            placement="bottom"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Space>
              AB prime
              <CaretDownFilled style={styles.downIcon}/>
            </Space >
          </StyledDropDown>
          <StyledDropDown
            overlayStyle={styles.dropDownMenu}
            overlay={menu}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            placement="bottom"
          >
            <Space>
              Help
              <CaretDownFilled style={styles.downIcon}/>
            </Space>
          </StyledDropDown>
          <Button className="post_pro_btn">
            Post Property&nbsp;<span className="free">FREE</span>
          </Button>
        </section>
        <section className="sub_head2">
          <StyledDropDown
            overlayStyle={styles.dropDownMenu}
            overlay={menu}
            placement="bottom"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Space>
              Buy
              <CaretDownFilled style={styles.downIcon}/>
            </Space>
          </StyledDropDown>
          <StyledDropDown
            overlayStyle={styles.dropDownMenu}
            overlay={menu}
            placement="bottom"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Space>
              Rent
              <CaretDownFilled style={styles.downIcon}/>
            </Space>
          </StyledDropDown>
          <StyledDropDown
            overlayStyle={styles.dropDownMenu}
            overlay={menu}
            placement="bottom"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Space>
              Sell
              <CaretDownFilled style={styles.downIcon}/>
            </Space>
          </StyledDropDown>
          <StyledDropDown
            overlayStyle={styles.dropDownMenu}
            overlay={menu}
            placement="bottom"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Space>
              Home Loans
              <CaretDownFilled style={styles.downIcon}/>
            </Space>
          </StyledDropDown>
          <StyledDropDown
            overlayStyle={styles.dropDownMenu}
            overlay={menu}
            placement="bottom"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Space>
              Property Services
              <CaretDownFilled style={styles.downIcon}/>
            </Space>
          </StyledDropDown>
          <StyledDropDown
            overlayStyle={styles.dropDownMenu}
            overlay={menu}
            placement="bottom"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Space>
              Resources
              <CaretDownFilled />
            </Space>
          </StyledDropDown>
        </section>
      </div>
      <section className="right_side">
        <Button className="register">REGISTER</Button>
        <Button className="log_in">
          LOGIN &nbsp; <CaretDownFilled />
        </Button>
      </section>
    </div>
  );
};

export default Header;
