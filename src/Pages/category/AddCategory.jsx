import React, { useContext, useState } from "react";
import "./_category.scss";
import { AppContext } from "../../App";
import { Input, Button, Upload, message, notification } from "antd";
import { CloseOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { APP_BASE_URL } from "../../utils/Contants";

const AddCategory = () => {
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [apiCallLoading, setApiCallLoading] = useState(false);
  const navigate = useNavigate();
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
    let newData = [...subCategory];
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
      formData.append("cat_title", categoryTitle);
      formData.append("cat_image", fileList[0].originFileObj);
      formData.append(
        "sub_categories",
        subCategory.map((item) => item.sub_category)
      );
      const response = await axios
        .post(APP_BASE_URL+"BlogCategories/create", formData)
        .then((res) => {
          console.log(res, "rwesssss");
          if (res.status === 200) {
            notification.success({
              message: "Category Added Successfully",
            });
            setCategoryTitle((prevState) => "");
            setFileList((prevState) => []);
            setSubCategory((prevState) => []);
          }
        });
    } catch (error) {
      notification.error({
        message: "Something Went Wrong",
      });
    }
    setApiCallLoading((prevState) => false);
  }

  return (
    <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
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
            {subCategory.map((item, index) => (
              <div className="add-category-input">
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
          <div className="btn-cont">
            <Button
              onClick={handleSubmit}
              className="actionbtn"
              loading={apiCallLoading}
            >
              Submit
            </Button>
            <Button onClick={() => navigate(-1)} className="backbtn">
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
