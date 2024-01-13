import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import property from "./../Assets/r-architecture-JvQ0Q5IkeMM-unsplash.jpg";
import "./Styles/Blog.scss";
import "./Styles/ListCard.scss";
import { HiMiniPlus, HiViewfinderCircle } from "react-icons/hi2";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Tag,
  Upload,
} from "antd";
import { AppContext } from "../App";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";
import { Fetch } from "../utils/FetchData";
import { BLOG_IMAGE_BASE_URL } from "../utils/Contants";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link } from "react-router-dom";
import { capitalizeWords } from "../utils/Helpers";
function Blog() {
  const { confirm } = Modal;
  const { hideBar, updatehidebar } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [BlogData, setblogData] = useState([]);
  const [edit, setedit] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [modalData, setmodalData] = useState({
    blog_id: 0,
    blog_title: "",
    blog_content: "",
    blog_image: null,
    blog_url: "",
  });
  // const BlogData = [
  //   {
  //     key: 1,
  //     img: property,
  //     title: "Once Upon A Time",
  //     content:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  //   },
  //   {
  //     key: 2,
  //     img: property,
  //     title: "Once Upon A Time",
  //     content:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  //   },
  // ];

  useEffect(() => {
    const getBlogs = async () => {
      const res = await Fetch.get_blogs(" ");
      console.log("res123", res);
      setblogData(res);
    };
    getBlogs();
    setrefresh(() => false);
  }, [refresh]);
  const deleteBlog = async (item) => {
    const res = await Fetch.delete_blog({
      blog_id: item,
    });
    setrefresh(() => true);
    console.log("ress", res);
  };
  const showDeleteConfirm = (item) => {
    confirm({
      title: "Are you sure delete this blog?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteBlog(item);
      },
      onCancel() {
        console.log("cancel");
      },
      centered: true,
    });
  };
  const updateBlog = async () => {
    const res = await Fetch.update_blog({
      blog_id: modalData?.blog_id,
      blog_title: modalData?.blog_title,
      blog_content: modalData?.blog_content,
      blog_url: modalData?.blog_url,
      blog_image: fileList[0]?.originFileObj,
    });
    res.status === 200 && window.location.reload();
    //
    console.log(res);
  };
  const createBlog = async () => {
    const res = await Fetch.post_blog({
      blog_title: modalData?.blog_title,
      blog_content: modalData?.blog_content,
      blog_url: modalData?.blog_url,
      blog_image: fileList[0]?.originFileObj,
    });
    res.message === "Success" && window.location.reload();

    console.log(res);
  };
  const handleModal = () => {
    setOpen(false);

    modalData?.blog_id !== 0 ? updateBlog() : createBlog();
    setrefresh(() => true);
  };
  // console.log("fileList", fileList);

  console.log("modalData", modalData);
  const editModal = (item) => {
    console.log("item", item, {
      blog_id: item?.blog_id,
      blog_title: item?.blog_title,
      blog_content: item?.blog_content,
      blog_image: BLOG_IMAGE_BASE_URL + item?.blog_image,
      blog_url: item?.blog_image,
    });
    setOpen(true);
    setmodalData((prevState) => ({
      blog_id: item?.blog_id,
      blog_title: item?.blog_title,
      blog_content: item?.blog_content,
      blog_image: item?.blog_image,
      blog_url: item?.blog_url,
    }));
  };
  const createModal = () => {
    setOpen(true);
    setmodalData({
      blog_id: 0,
      blog_title: "",
      blog_content: "",
      blog_image: null,
      blog_url: "",
    });
    setFileList([]);
  };
  const onChangeupload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setmodalData({
      blog_title: modalData?.blog_title,
      blog_id: modalData?.blog_id,
      blog_content: modalData?.blog_content,
      blog_image: newFileList,
      blog_url: modalData?.blog_url,
    });
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  console.log("fileList", fileList[0]?.originFileObj);

  const gotoBlog = (item) => {
    window.open("https://www.google.com");
  };
  return (
    <div className="blogs">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header pagePath={"Blogs"} width={!hideBar ? "75%" : "85%"} />
          <div className="main-section">
            <div className="table-card">
              <div className="card-head">
                <h3>Blogs</h3>
                <Button onClick={() => navigate("/edit-category")}>
                  Categories
                </Button>
              </div>

              <div className="card-body">
                <div className="blog-cards">
                  <div className="blog-card">
                    <div
                      className="add-blog"
                      onClick={() => navigate("/add-blog")}
                    >
                      <HiMiniPlus style={{ color: "#999" }} />
                      <h1>Add Blog</h1>
                    </div>
                  </div>
                  {/* {BlogData.map((item) => {
                    return (
                      <Card
                        hoverable
                        style={{
                          width: 240,
                        }}
                        loading={0}
                        cover={
                          <img
                            alt="example"
                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                          />
                        }
                      >
                        <Meta
                          title="Europe Street beat"
                          description="https://www.instagram.com"
                        />
                      </Card>
                    );
                  })} */}
                  {BlogData.map((item) => {
                    return (
                      <div className="blog-card">
                        <div
                          className="content-blog"
                          style={{ position: "relative" }}
                        >
                          <Tag
                            style={{
                              position: "absolute",
                              height: "25px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              top: "5px",
                              left: "10px",
                            }}
                          >
                            {capitalizeWords(item.category)}
                          </Tag>
                          <div className="image-cont">
                            <img
                              src={BLOG_IMAGE_BASE_URL + item.blog_image}
                              alt=""
                            />
                          </div>
                          <div className="content">
                            <h3>{item?.blog_title}</h3>
                            <p>{item?.blog_desc?.substring(0, 150)}...</p>
                          </div>

                          <div className="card-overlay"></div>

                          <div className="btn-cont">
                            <div className="overlay-btns">
                              <Button
                                onClick={() => {
                                  navigate(`/edit/${item?.blog_id}`, {
                                    state: {
                                      blog: item,
                                    },
                                  });
                                  // editModal(item);
                                  // setFileList((prevState) => [
                                  //   {
                                  //     uid: item?.blog_id,
                                  //     name: item?.blog_title,
                                  //     url:
                                  //       BLOG_IMAGE_BASE_URL + item?.blog_image,
                                  //   },
                                  // ]);
                                }}
                              >
                                <AiFillEdit style={{ color: "white" }} />
                              </Button>

                              <Button>
                                <Link to={item.blog_url} target="_blank">
                                  <HiViewfinderCircle
                                    style={{ color: "white" }}
                                  />
                                </Link>
                              </Button>

                              <Button
                                onClick={() => showDeleteConfirm(item?.blog_id)}
                              >
                                <AiFillDelete style={{ color: "white" }} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Modal
            title="Alert : Changes Might Affect Properties View Page"
            centered
            open={open}
            onOk={() => handleModal()}
            onCancel={() => setOpen(false)}
            okText={"Submit"}
            className="blog-modal"
          >
            <Form
              layout="horizontal"
              // disabled={componentDisabled}
            >
              <div className="form-left">
                <Upload
                  action="/upload.do"
                  fileList={fileList}
                  listType="picture-card"
                  onChange={onChangeupload}
                  onPreview={onPreview}
                >
                  {fileList.length >= 1
                    ? null
                    : () => {
                        return (
                          <div>
                            <PlusOutlined />
                            <div
                              style={{
                                marginTop: 8,
                              }}
                            >
                              Upload
                            </div>
                          </div>
                        );
                      }}
                </Upload>
              </div>
              <div className="form-right">
                <Form.Item label="Title">
                  <Input
                    value={modalData.blog_title}
                    onChange={(e) =>
                      setmodalData({
                        blog_title: e.target.value,
                        blog_id: modalData?.blog_id,
                        blog_content: modalData?.blog_content,
                        blog_image: modalData?.blog_image,
                        blog_url: modalData?.blog_url,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Content">
                  <TextArea
                    onChange={(e) =>
                      setmodalData({
                        blog_title: modalData?.blog_title,
                        blog_id: modalData?.blog_id,
                        blog_content: e.target.value,
                        blog_image: modalData?.blog_image,
                        blog_url: modalData?.blog_url,
                      })
                    }
                    value={modalData.blog_content}
                  />
                </Form.Item>
                <Form.Item label="Url">
                  <Input
                    onChange={(e) =>
                      setmodalData({
                        blog_title: modalData?.blog_title,
                        blog_id: modalData?.blog_id,
                        blog_content: modalData?.blog_content,
                        blog_image: modalData?.blog_image,
                        blog_url: e.target.value,
                      })
                    }
                    value={modalData.blog_url}
                  />
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Blog;
