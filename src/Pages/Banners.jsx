import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import property from "./../Assets/r-architecture-JvQ0Q5IkeMM-unsplash.jpg";
import "./Styles/Banners.scss";
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
  Select,
  Upload,
} from "antd";
import { AppContext } from "../App";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";
import { Fetch } from "../utils/FetchData";
import { BANNER_IMAGE_BASE_URL, IMAGE_BASE_URL } from "../utils/Contants";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link } from "react-router-dom";
function Blog() {
  const { confirm } = Modal;
  const { hideBar, updatehidebar } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [Viewopen, setViewOpen] = useState(false);
  const [viewbanner, setViewbanner] = useState("");
  const [fileList, setFileList] = useState([]);
  const [bannerData, setbannerData] = useState([]);
  const [edit, setedit] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [modalData, setmodalData] = useState({
    id: 0,
    title: "",
    category: "",
    img_name: null,
  });
  // const bannerData = [
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
    const getBanners = async () => {
      const res = await Fetch.get_banners(" ");
      setbannerData(res);
    };
    getBanners();
    // setrefresh(() => false);
  }, []);
  const deleteBlog = async (item) => {
    const res = await Fetch.delete_banner({
      id: item,
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
    const res = await Fetch.update_banner({
      id: modalData?.id,
      title: modalData?.title,
      category: modalData?.category,
      img_name: fileList[0]?.originFileObj,
    });
    console.log(res);
    window.location.reload(); 


  };
  const createBlog = async () => {
    const res = await Fetch.post_banner({
      title: modalData?.title,
      category: modalData?.category,
      img_name: fileList[0]?.originFileObj,
    });
    window.location.reload();
    console.log(res);
  };
  const handleModal = () => {
    setOpen(false);

    modalData?.id !== 0 ? updateBlog() : createBlog();
    setrefresh(() => true);
  };
  const handleViewModal = (item) => {
    setViewOpen(true);
    setViewbanner(item);
    // modalData?.id !== 0 ? updateBlog() : createBlog();
    // setrefresh(() => true);
  };
  // console.log("fileList", fileList);

  console.log("modalData", modalData);
  const editModal = (item) => {
    console.log("item", item, {
      id: item?.id,
      title: item?.title,
      category: item?.category,
      image: IMAGE_BASE_URL + item?.image,
    });
    setOpen(true);
    setmodalData((prevState) => ({
      id: item?.id,
      title: item?.title,
      category: item?.category,
    }));
  };
  const createModal = () => {
    setOpen(true);
    setmodalData({
      id: 0,
      title: "",
      category: "",
      img_name: null,
    });
    setFileList([]);
  };
  const onChangeupload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setmodalData({
      title: modalData?.title,
      image: newFileList,
      id: modalData?.id,
      category: modalData?.category,
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
  return (
    <div className="banners">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header pagePath={"Banners"} width={!hideBar ? "72%" : "85%"} />
          <div className="main-section">
            <div className="table-card">
              <div className="card-head">
                <div className="filters">
                  <h3>Banners</h3>
                  <Button className="add-blog" onClick={() => createModal()}>
                    <span>
                      <HiMiniPlus style={{ color: "#999" }} />
                    </span>
                    Add Banner
                  </Button>
                </div>
              </div>

              <div className="card-body">
                <div className="blog-cards">
                  {bannerData.map((item) => {
                    return (
                      <div className="blog-card">
                        <div className="content-blog">
                          <div className="image-cont">
                            <img
                              src={BANNER_IMAGE_BASE_URL + item.img_name}
                              alt=""
                            />
                          </div>
                          <div className="content">
                            <h3>{item.title}</h3>
                          </div>

                          <div className="card-overlay"></div>

                          <div className="btn-cont">
                            <div className="overlay-btns">
                              <Button
                                onClick={() => {
                                  editModal(item);
                                  setFileList((prevState) => [
                                    {
                                      uid: item?.id,
                                      name: item?.title,
                                      url:
                                        BANNER_IMAGE_BASE_URL + item?.img_name,
                                    },
                                  ]);
                                }}
                              >
                                <AiFillEdit style={{ color: "white" }} />
                              </Button>

                              <Button
                                onClick={() =>
                                  handleViewModal(
                                    BANNER_IMAGE_BASE_URL + item?.img_name
                                  )
                                }
                              >
                                <HiViewfinderCircle
                                  style={{ color: "white" }}
                                />
                              </Button>

                              <Button
                                onClick={() => showDeleteConfirm(item?.id)}
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
            title="Alert : Changes Might Affect Properties View Page "
            centered
            open={open}
            onOk={() => handleModal()}
            onCancel={() => setOpen(false)}
            okText={"submit"}
            className="banner-modal"
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
                  {/* <Upload action="/upload.do" multiple={false}  name="avatar" fileList={fileList} listType="picture-card"> */}
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
                    value={modalData.title}
                    onChange={(e) =>
                      setmodalData({
                        title: e.target.value,
                        id: modalData?.id,
                        category: modalData?.category,
                        img_name: modalData?.img_name,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Category">
                  <Select
                    onChange={(e) =>
                      setmodalData({
                        title: modalData?.title,
                        id: modalData?.id,
                        category: e,
                        banner_image: modalData?.banner_image,
                      })
                    }
                    defaultValue={modalData.category}
                    options={[
                      {
                        value: "home_interior",
                        label: "Home Interior",
                      },
                      {
                        value: "legal_service",
                        label: "Legal Service",
                      },
                      {
                        value: "package_movers",
                        label: "Package Movers",
                      },
                      {
                        value: "home_loan",
                        label: "Home Loan",
                      },
                      {
                        value: "free_rental_agreement",
                        label: "Free Rental Agreement ",
                      },
                      {
                        value: "help",
                        label: "Help",
                      },
                      {
                        value: "property_valuation",
                        label: "Property Valuation",
                      },
                      {
                        value: "popular_builders",
                        label: "Popular Builders",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
            </Form>
          </Modal>
          <Modal
            title="Alert : Changes Might Affect Properties View Page "
            centered
            open={Viewopen}
            onOk={() => setViewOpen(false)}
            onCancel={() => setViewOpen(false)}
            okText={"submit"}
            // className="banner-modal"
            className="view_modal"
          >
            <div className="view-div">
              <img src={viewbanner} alt="" />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Blog;
