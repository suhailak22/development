import React, { useContext, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import property from "./../Assets/r-architecture-JvQ0Q5IkeMM-unsplash.jpg";
import "./Styles/Blog.scss";
import "./Styles/ListCard.scss";
import { HiMiniPlus,HiViewfinderCircle } from "react-icons/hi2";
import { AiFillDelete,AiFillEdit } from "react-icons/ai";
import { Button, Modal } from "antd";
import { AppContext } from "../App";
import { ExclamationCircleFilled } from "@ant-design/icons";
function Blog() {
  const { confirm } = Modal;
  const {hideBar,updatehidebar}= useContext(AppContext);
  const BlogData = [
    {
      key: 1,
      img: property,
      title: "Once Upon A Time",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
    {
      key: 2,
      img: property,
      title: "Once Upon A Time",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
  ];
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this blog?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
      centered:true
    });
  };
  return (
    <div className="blogs">
   

      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header
            pagePath={"Users"}
            
            width={!hideBar ? "80%" : "85%"}
          />
          <div className="main-section">
            <div className="table-card">
              <div className="card-head">
                <h3>Blogs</h3>
                <div className="filters"></div>
              </div>
              <div className="card-body">
                <div className="blog-cards">
                  <div className="blog-card">
                    <div className="add-blog">
                      <span>
                        <HiMiniPlus style={{ color: "#999" }} />
                      </span>
                      <h1>Add Blog</h1>
                    </div>
                  </div>
                  {BlogData.map((item) => {
                    return (
                      <div className="blog-card">
                        <div className="content-blog">
                          <div className="image-cont">
                            <img src={item.img} alt="" />
                          </div>
                          <div className="content">
                            <h3>{item.title}</h3>
                            <p>{item.content.substring(0, 100)}...</p>
                          </div>

                          <div className="card-overlay"></div>

                          <div className="btn-cont">
                            <div className="overlay-btns">
                              <Button onClick={showDeleteConfirm} ><AiFillEdit style={{color:"white"}}/></Button>

                              <Button onClick={showDeleteConfirm} ><HiViewfinderCircle  style={{color:"white"}}/></Button>

                              <Button onClick={showDeleteConfirm} ><AiFillDelete  style={{color:"white"}}/></Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="blog-card"></div>
                  <div className="blog-card"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
