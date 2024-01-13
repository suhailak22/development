import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "./../Assets/images.jpeg";
import { Fetch } from "../utils/FetchData";
import "./Styles/Notification.scss";
import { IMAGE_BASE_URL } from "../utils/Contants";
import { Navigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { formatLargeNumber } from "../utils/Helpers";
function Notifications() {
  const [notifications, setnotifications] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const FetchNotification = async () => {
      const res = await Fetch.get_admin_notification_list("");
      setnotifications(() => res);
    };
    FetchNotification();
  }, []);
  const getImage = (img) => {
    return IMAGE_BASE_URL + img;
  };
  const handleNotification = async (id, p_id) => {
    const res = await Fetch.update_admin_notification({
      notification_id: id,
    });
    navigate("/property_details/" + p_id);
  };
  const getTimer = (time) => {
    return (Date.now() - new Date(time).getTime()) / (1000 * 60 * 60);
  };
  
  return (
    <div className="notifications-cont">
      <Menu className="menu" >
        {notifications?.map((item, index) => {
          return (
            <Menu.Item
              className="menu-item"
              key={index}
              onClick={() =>
                handleNotification(item.notification_id, item?.p_id)
              }
            >
              <div className="menu-cont">
                {/* <div className="menu-cont" onClick={()=>handleNotification(item.notification_id,item?.property?.p_id)}> */}
                <div className="content-cont">
                  <div className="image-cont">
                    <img src={getImage(item.img)} alt="" />
                  </div>
                  <div className="meta-cont">
                    <h3>{item.title}</h3>
                    <p>
                      <b>{item?.user?.username} </b>Posted Property in{" "}
                      {item?.location}
                    </p>
                    <div className="notify-footer">
                      <p>
                        &#8377;{" "}
                        {formatLargeNumber(item?.property?.expected_price)}
                      </p>
                      <span>{getTimer(item?.created_at).toFixed(0)}h ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
}

export default Notifications;
