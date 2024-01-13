import React, { useEffect } from "react";
import "./styles/Login.scss";
import {
  CheckCircleFilled,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input, Select, notification } from "antd";
import styled from "styled-components";
import { useState } from "react";
import albionLightLogo from "./../../Assets/albion logo.png";
// import facebook from "../../../assets/facebook_light.png";
// import google from "../../../assets/google_light.png";
// import Verification from "./otp/Verification";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
// import { useSignIn } from "react-auth-kit";
import { JellyTriangle } from "@uiball/loaders";
import { APP_BASE_URL } from "../../utils/Contants";
import Cookies from "js-cookie";
import Loader from "../../Components/Loader";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  @media (max-width: 1024px) {
    font-size: 12px !important;
  }
`;

const StyledInput = styled(Input)`
  border-radius: 2px;
  &::placeholder {
    font-weight: 600;
    font-size: 13px;
  }
  &:hover {
    border: 1px solid #cccccc !important;
    cursor: pointer;
  }
`;

const { Password } = Input;

const StyledInputPassWord = styled(Password)`
  border-radius: 2px;
  font-family: Poppins;
`;

const StyledSelect = styled(Select)`
  width: 18%;
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
    key: "buyer",
    value: "Buyer",
  },
  {
    key: "agent",
    value: "Agent",
  },
  {
    key: "builder",
    value: "Builder",
  },
];

const Login = () => {
  const [userType, setUserType] = useState("buyer");
  const [success, setSuccess] = useState(false);
  const [givenInput, setGivenInput] = useState("");
  const [givenPassword, setgivenPassword] = useState("");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const mobileRegex = /^[0-9]{10}$/;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  //   const login = useGoogleLogin({
  //     onSuccess: (codeResponse) => setUser(codeResponse),
  //     onError: (error) => console.log("Login Failed:", error),
  //   });
  const ErrorNotification = (placement, content) => {
    api.error({
      message: `InValid Input`,
      description: content,
      placement,
    });
  };
  const SuccessNotification = (placement, content) => {
    api.success({
      message: `Success`,
      description: content,
      placement,
    });
  };

  // log out function to log the user out of google and set the profile array to null

  const navigate = useNavigate();

  const onSubmit = async () => {
    function createVerificationPayload() {
      return {
        username: givenInput,
        password: givenPassword,
      };
    }
    try {
      await axios
        .post(`${APP_BASE_URL}Login/admin_login`, createVerificationPayload(), {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(async (res) => {
          if (res.status === 200) {
            Cookies.set("userLoggedIn", `${res.data.isLoggedin}`);
            console.log("after");
            SuccessNotification("top", "Login Successfully");
            navigate("/");
            // await getFirebaseToken()
            // .then((firebaseToken) => {
            //   if (firebaseToken) {
            //     data = firebaseToken
            //   }
            // })
            // .catch((err) => console.error('An error occured while retrieving firebase token. ', err))
            // await Fetch.updateAdminToken({data:data})
          }
        });
    } catch (err) {
      notification.error({
        message: "Please Provide Valid Credentials",
        description: "Please Enter Valid Credentials",
      });
    }
  };

  return loading ? (
    <Loader/>
  ) : (
    <motion.div
      className="log_in-page"
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-section">
        <div className="left-side">
          <div className="left-side-content">
            <div>
              <LazyLoadImage
                src={albionLightLogo}
                className="albion_app_light_image"
              />
            </div>
            <div className="details">
              <h2>Login</h2>
              <p>
                Logging in to a world of convenience and personalized
                experiences. Enter your credentials to access your account and
                enjoy seamless navigation, exclusive content, and secure
                transactions on our platform.
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
          <div
            className="loginDiv"
            style={
              success
                ? {
                    height: "auto",
                  }
                : null
            }
          >
            {success ? (
              //   <Verification
              //     userInput={givenInput}
              //   />
              "hiii"
            ) : (
              <>
                <h2
                  style={{
                    color: "#8C193F",
                    lineHeight: "10px",
                    width: "80%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  Login
                </h2>
                <Form onFinish={() => onSubmit()} className="firstOption">
                  <div className="inputDiv">
                    <StyledLabel>Enter Your Username</StyledLabel>
                    <StyledInput
                      placeholder="Enter Username"
                      controls={false}
                      value={givenInput}
                      onChange={(e) => setGivenInput(e.target.value)}
                      autoFocus={true}
                    />
                    <StyledLabel>Enter Password</StyledLabel>
                    {/* <
                      controls={false}
                      type="password"
                    /> */}
                    <StyledInput.Password
                      placeholder="Enter Password"
                      onChange={(e) => setgivenPassword(e.target.value)}
                      value={givenPassword}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                    <div className="submitBtnContainer">
                      <Button
                        className="submit_button"
                        
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
