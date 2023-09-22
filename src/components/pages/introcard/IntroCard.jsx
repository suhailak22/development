import React from "react";
import "./intro-card.css";
import banner from "../../../assets/banner.png";
import { Button, Menu, Select, Space } from "antd";
import { CaretDownFilled, DownOutlined } from "@ant-design/icons";
import {
  StyledDropDown,
  StyledSelect,
} from "../../../styled-components/Styled";
import { styles } from "../../../common/styles";
import { useState } from "react";
import verifyImg from "../../../assets/verified.png";
import propertyImg from "../../../assets/store.png";
import supportImg from "../../../assets/support.png";
import moneyImg from "../../../assets/money.png";

const IntroCard = () => {
  const { Option } = Select;
  const [location, setLocation] = useState();
  const [typeOfProperty, setTypeOfProperty] = useState();
  const [budget, setBudget] = useState();
  const [category, setCategory] = useState("buy");

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
    <div className="intro_card-section">
      <section className="intro_card-head">
        <div className="banner-sec">
          <section className="banner-text">
            <span className="main-text">Discover Choose & Have Fun</span>
            <span className="sub-text">
              Looking for your dream house or property. Search here and select
              your best one from more than 1 million listing.
            </span>
          </section>
          <section className="banner_img">
            <img src={banner} />
          </section>
        </div>
        <div className="filter-card">
          <section className="head_sec">
            <ul className="cart-categories">
              <li 
                onClick={() => setCategory((prevState) => "buy")}
                style={category === 'buy' ? styles.isActiveTab : null}
              >
                Buy
              </li>
              <li 
                onClick={() => setCategory((prevState) => "pg")}
                style={category === 'pg' ? styles.isActiveTab : null}
              >
                PG
              </li>
              <li 
                onClick={() => setCategory((prevState) => "rent")}
                style={category === 'rent' ? styles.isActiveTab : null}
              >
                Rent
              </li>
              <li 
                onClick={() => setCategory((prevState) => "plot")}
                style={category === 'plot' ? styles.isActiveTab : null}
              >
                Plot
              </li>
              <li 
                onClick={() => setCategory((prevState) => "commercial")}
                style={category === 'commercial' ? styles.isActiveTab : null}
              >
                Commercial
              </li>
              <li 
                onClick={() => setCategory((prevState) => "propad")}
                style={category === 'propad' ? styles.isActiveTab : null}
              >
                List your property Ad
              </li>
            </ul>
          </section>
          <section className="foot_sec">
            <StyledDropDown
              overlayStyle={styles.dropDownMenu}
              overlay={menu}
              placement="bottom"
            >
              <Space>
                {!!location ? (
                  { location }
                ) : (
                  <span className="placeholder_style">Location</span>
                )}
                <DownOutlined style={styles.downIcon} />
              </Space>
            </StyledDropDown>
            <StyledDropDown
              overlayStyle={styles.dropDownMenu}
              overlay={menu}
              placement="bottom"
            >
              <Space>
                {!!location ? (
                  { typeOfProperty }
                ) : (
                  <span className="placeholder_style">Type Of Property</span>
                )}
                <DownOutlined style={styles.downIcon} />
              </Space>
            </StyledDropDown>
            <StyledDropDown
              overlayStyle={styles.dropDownMenu}
              overlay={menu}
              placement="bottom"
            >
              <Space>
                {!!location ? (
                  { budget }
                ) : (
                  <span className="placeholder_style">Budget</span>
                )}
                <DownOutlined style={styles.downIcon} />
              </Space>
            </StyledDropDown>
            <Button className="search_button">Search</Button>
          </section>
        </div>
      </section>
      <section className="intro_card-foot">
        <div className="foot-card">
          <img src={verifyImg} className="foot-card_img" />
          <section className="sub_section">
            <span className="title">140,000+</span>
            <span className="description">
              Properties listed in our website
            </span>
          </section>
        </div>
        <div className="foot-card">
          <img src={propertyImg} className="foot-card_img" />
          <section className="sub_section">
            <span className="title">1M+</span>
            <span className="description">People use our services</span>
          </section>
        </div>
        <div className="foot-card">
          <img src={supportImg} className="foot-card_img" />
          <section className="sub_section">
            <span className="title">24 / 7</span>
            <span className="description">24/7Hrs operational support</span>
          </section>
        </div>
        <div className="foot-card">
          <img src={moneyImg} className="foot-card_img" />
          <section className="sub_section">
            <span className="title">Albion Property Loan Arrangements</span>
            <span className="description">Albion Property loans available</span>
          </section>
        </div>
      </section>
    </div>
  );
};

export default IntroCard;
