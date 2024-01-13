import React, { useRef, useEffect } from "react";
import "./styles/SignUp.scss";
import albionLightLogo from "./../../Assets/albion logo.png";
import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Checkbox, Input, Select, notification } from "antd";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { JellyTriangle } from "@uiball/loaders";
// import { APP_BASE_URL } from "../../../utils/Constants";

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

const StyledInput = styled(Input)`
  border-radius: 2px;
  &::placeholder {
    color: #969595 !important;
  }
  @media (max-width: 1024px) {
    height: 30px !important;
    &::placeholder {
      font-size: 12px;
    }
  }
`;

const StyledSelect = styled(Select)`
  width: 18%;
  .ant-select-selection__placeholder {
    color: #969595 !important;
  }
`;

let supportDesc = [
  "Albion Property loans available",
  "Post one Single Property for FREE",
  "Mobile application for both android and ios",
  "24/7Hrs operational support",
  "Set property alerts for your requirement",
];

let possibleUsers = [
  {
    id: 1,
    key: "buyer",
    value: "Buyer",
  },
  {
    id: 2,
    key: "agent",
    value: "Agent",
  },
  {
    id: 3,
    key: "builder",
    value: "Builder",
  },
];

const SignUp = () => {
  const [userType, setUserType] = useState("buyer");
  const [userName, setUserName] = useState();
  const [emailId, setEmailId] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [alternateMobileNumber, setAlternateMobileNumber] = useState();
  const [password, setPassword] = useState();
  const confirmPassword = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const navigate = useNavigate();

  function getClassNameForUserTypeBtn() {
    switch (userType) {
      case "buyer/owner/tenant":
        return "ActiveBtn";
      case "agent":
        return "ActiveBtn";
      case "builder":
        return "ActiveBtn";
      default:
        return "inActiveBtn";
    }
  }

  function registerUser() {
    axios
      .post(
        `https/login/register`,
        {
          user_type: userType,
          username: userName,
          email: emailId,
          mobile_number: mobileNumber,
          password: password,
          cpwd: confirmPassword.current.input.value,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Registered Successfully",
            description: (
              <span>
                Click here to <a onClick={() => navigate("/login")}>Login</a>
              </span>
            ),
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
        });
      });
  }

  return loading ? (
    <div
      style={{
        position: "absolute",
        top: "45%",
        left: "50%",
      }}
    >
      {/* <img
        src={albionLogo}
        width={100}
        height={100}
      /> */}
      <JellyTriangle size={60} speed={1.75} color="#8C193F" />
    </div>
  ) : (
    <motion.div
      className="sign_up-page"
      initial={{ opacity: 0.5, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0.5, x: -300 }}
      transition={{ duration: 0.35 }}
    >
      <div className="sign_up-section">
        <div className="left-side">
          <div className="left-side-content">
            <div>
              <LazyLoadImage
                src={albionLightLogo}
                className="albion_app_light_image"
              />
            </div>
            <div className="details">
              <h2>Create Account</h2>
              <p>
                Creating an account is a simple and essential step to unlock a
                world of possibilities. By signing up, you'll gain access to a
                wide range of features and services tailored to your needs.
                Whether it's personalized recommendations, exclusive offers, or
                seamless transactions, our platform is designed to enhance your
                experience. Join us today and embark on a journey of convenience
                and customization.
              </p>
              <div>
                {supportDesc.map((support) => (
                  <p className="checklist" key={support}>
                    <CheckCircleFilled />
                    <span>{support}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="signUpDiv">
            <h2 className="signUpText">Sign Up</h2>
            <div className="signUpInputs">
              <div className="inputDiv" style={{ gap: "15px" }}>
                <StyledLabel>You are</StyledLabel>
                <div className="you_are_buttons">
                  {possibleUsers.map((user) => (
                    <Button
                      key={user.id}
                      className={
                        user.key === userType
                          ? `ActiveBtn responsiveBtn`
                          : `inActiveBtn responsiveBtn`
                      }
                      onClick={() => setUserType(user.key)}
                    >
                      {user.value}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="inputDiv">
                <StyledLabel>Enter your name</StyledLabel>
                <StyledInput
                  placeholder="Enter your Name"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="inputDiv">
                <StyledLabel>Enter your Email Id </StyledLabel>
                <StyledInput
                  placeholder="Enter your Email Id"
                  value={emailId?.toLowerCase()}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
              <div className="inputDiv">
                <StyledLabel>Mobile Number</StyledLabel>
                <div className="mobileNumberSelection">
                  <StyledSelect defaultValue={91} className="responsiveSelect">
                    <Select.Option value={91}>+91</Select.Option>
                  </StyledSelect>
                  <StyledInput
                    placeholder="Primary Mobile Number"
                    className="mobileNumberInput"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>
              <div className="inputDiv">
                <StyledLabel>Password</StyledLabel>
                <div className="mobileNumberSelection">
                  <Input.Password
                    placeholder="Enter Password"
                    className="mobileNumberInput"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="inputDiv">
                <StyledLabel>Confirm Password</StyledLabel>
                <div className="mobileNumberSelection">
                  <Input.Password
                    placeholder="Enter Confirm Password"
                    className="mobileNumberInput"
                    ref={confirmPassword}
                  />
                </div>
              </div>
              {/* <div className="inputDiv">
                <StyledLabel>Alternate Mobile Number</StyledLabel>
                <div className="mobileNumberSelection">
                  <StyledSelect 
                    defaultValue={91} 
                    className="responsiveSelect"
                  >
                    <Select.Option value={91}>+91</Select.Option>
                  </StyledSelect>
                  <StyledInput
                    placeholder="Alternate Mobile Number (Optional)"
                    className='mobileNumberInput'
                    onChange={(e) => setAlternateMobileNumber(e.target.value)}
                  />
                </div>
              </div> */}
              <div>
                <Checkbox
                  value={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="checkbox-text"
                >
                  I agree to Albion T&C, Privacy Policy, & Cookie Policy
                </Checkbox>
              </div>
              <div className="signUpBtnContainer">
                <Button
                  className="signUpBtn"
                  onClick={registerUser}
                  disabled={
                    !userName || !mobileNumber || !isChecked || !password
                  }
                >
                  Sign Up
                </Button>
                <span className="login-shrtcut">
                  Already a User ?{" "}
                  <a onClick={() => navigate("/login")}>Login</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
