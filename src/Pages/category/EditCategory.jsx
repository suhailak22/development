import {
  Button,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Upload,
  notification,
} from "antd";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import "./../Styles/ListCard.scss";
import "./_category.scss";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddCategory from "./AddCategory";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import confirm from "antd/es/modal/confirm";
import { APP_BASE_URL } from "../../utils/Contants";

const ViewCategory = ({ showViewModal, setShowViewModal, record }) => {
  return (
    <Modal
      open={showViewModal}
      onCancel={() => setShowViewModal()}
      footer={null}
    >
      <div className="view-category-main">
        <div className="view-category">
          <label>Category Name</label>
          <span>{record.cat_title}</span>
        </div>
        <div className="view-category">
          <label>Sub Categories</label>
          <div className="sub-category-list">
            {record.sub_categories.map((item) => (
              <Tag>{item}</Tag>
            ))}
          </div>
        </div>
        <div className="view-category">
          <label>Category Banner Image</label>
          <img src={record.cat_image} />
        </div>
      </div>
    </Modal>
  );
};

const EditData = ({ showEditModal, setShowEditModal, record }) => {
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [categoryTitle, setCategoryTitle] = useState(record.cat_title);
  const [fileList, setFileList] = useState([]);
  const [subCategory, setSubCategory] = useState(
    record.sub_categories.map((item, index) => {
      return {
        sub_category_id: index,
        sub_category: item,
        editable: false,
      };
    })
  );
  const [apiCallLoading, setApiCallLoading] = useState(false);
  const [editModal, setEditModal] = useState(showEditModal);

  const onChangeupload = ({ fileList: newFileList }) => {
    setFileList((prevState) =>
      newFileList.map((file) => ({
        ...file,
        status: "done",
      }))
    );
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // Ant Design Upload component props
  const uploadProps = {
    beforeUpload: (file) => {
      // Limit the number of files to 1 if needed
      setFileList([file]);
      return false; // Prevent default upload behavior
    },
    fileList,
    onChange: (info) => {
      // Handle file change events if needed
      console.log(info.fileList);
    },
  };

  function addSubCategory() {
    setSubCategory((prevState) => [
      ...prevState,
      {
        sub_category_id: subCategory.length,
        sub_category: "",
        editable: false,
      },
    ]);
  }

  function handleSubCategory(value, index) {
    console.log(index);
    let newData = subCategory;
    console.log("newData", newData, newData[index]);
    newData[index]["sub_category"] = value;
    setSubCategory((prevState) => [...newData]);
  }

  function removeCategory(removeIndex) {
    let newData = [...subCategory];
    let filteredData = newData.filter((item, index) => index != removeIndex);
    setSubCategory((prevState) => [...filteredData]);
  }

  async function handleSubmit() {
    setApiCallLoading((prevState) => true);
    try {
      const formData = new FormData();
      console.log(subCategory.map((item) => item.sub_category));
      formData.append("cat_id", record.cat_id);
      formData.append("cat_title", categoryTitle);
      formData.append(
        "cat_image",
        fileList[0]?.originFileObj == null
          ? record.cat_image
          : fileList[0].originFileObj
      );
      formData.append(
        "sub_categories",
        subCategory.map((item) => item.sub_category)
      );
      const response = await axios
        .post(APP_BASE_URL+"BlogCategories/update", formData)
        .then((res) => {
          if (res.status === 200) {
            notification.success({
              message: "Category Added Successfully",
            });
          }
        });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Something Went Wrong",
      });
    }
    setApiCallLoading((prevState) => false);
  }

  return (
    <Modal
      open={editModal}
      onCancel={() => setShowEditModal(false)}
      footer={null}
    >
      <div className="category-inner-section">
        <div className="category-inputs">
          <div className="label-inpt">
            <label>Category Name</label>
            <Input
              placeholder="Enter Category Name"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle((prevState) => e.target.value)}
            />
          </div>
          <div className="label-inpt">
            <label>Category Image</label>
            <Upload
              // action="/upload.do"
              fileList={fileList}
              listType="picture-card"
              onChange={onChangeupload}
              onPreview={onPreview}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
          <div className="label-inpt">
            <label>Sub Categories</label>
            {subCategory?.map((item, index) => (
              <div className="add-category-input">
                {console.log(item)}
                <Input
                  placeholder="Sub Category"
                  value={item.sub_category}
                  onChange={(e) => handleSubCategory(e.target.value, index)}
                />
                <CloseOutlined onClick={() => removeCategory(index)} />
              </div>
            ))}
            <Button onClick={() => addSubCategory()} className="actionbtn">
              Add New Sub Category
            </Button>
          </div>
          <Button
            onClick={handleSubmit}
            className="actionbtn"
            loading={apiCallLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const EditCategory = () => {
  const [categoriesList, setCategoriesList] = useState(false);
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [catRecord, setCatrecord] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get(
        APP_BASE_URL+"BlogCategories/show"
      );
      setCategoriesList((prevState) => response.data);
    }
    fetchCategories();
  }, []);
  const deleteCat = async (item) => {
    const res = await axios
      .post(APP_BASE_URL+"BlogCategories/delete", {
        cat_id: item,
      })
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Category Deleted Successfully",
          });
          window.location.reload(true);
        }
      });
  };
  const showDeleteConfirm = (item) => {
    confirm({
      title: "Are you sure delete this blog?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteCat(item);
      },
      onCancel() {
        console.log("cancel");
      },
      centered: true,
    });
  };
  const columns = [
    {
      title: "Category ID",
      dataIndex: "cat_id",
      key: "cat_id",
    },
    {
      title: "Category UID",
      dataIndex: "cat_uid",
      key: "cat_uid",
    },
    {
      title: "Category Title",
      dataIndex: "cat_title",
      key: "cat_title",
    },
    {
      title: "Category Image",
      dataIndex: "cat_image",
      key: "cat_image",
      render: (text) => (
        <img src={text} alt="Category" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Sub Categories",
      dataIndex: "sub_categories",
      key: "sub_categories",
      render: (subCategories) => (
        <>
          {subCategories.map((subCategory) => (
            <Tag key={subCategory}>{subCategory}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setCatrecord((prevState) => record);
              setShowEditModal((prevState) => true);
            }}
          />
          <EyeOutlined
            onClick={() => {
              setCatrecord((prevState) => record);
              setShowViewModal((prevState) => true);
            }}
          />
          <DeleteOutlined onClick={() => showDeleteConfirm(record?.cat_id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
      <Header pagePath={"Blogs"} width={!hideBar ? "75%" : "85%"} />
      <div className="main-section">
        <div className="table-card">
          <Button onClick={() => navigate("/add-category")}>
            Add New Category
          </Button>
          <div className="category-table">
            <Table dataSource={categoriesList} columns={columns} />
            {showViewModal && (
              <ViewCategory
                showViewModal={showViewModal}
                setShowViewModal={setShowViewModal}
                record={catRecord}
              />
            )}
            {showEditModal && (
              <EditData
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                record={catRecord}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
