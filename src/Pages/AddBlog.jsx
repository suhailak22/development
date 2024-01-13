import React, { useContext, useState, useEffect } from "react";
import "./Styles/_add-blog.scss";
import { AppContext } from "../App";
import Header from "../Components/Header";
import { Button, Input, Select, Upload, notification } from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Fetch } from "../utils/FetchData";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "axios";
import { APP_BASE_URL } from "../utils/Contants";

const AddBlog = () => {
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [mainCategories, setMainCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [category, setCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    async function getCategory() {
      const response = await axios.get(
        APP_BASE_URL+'BlogCategories/show'
      )
      setMainCategories(prevState => response.data)
      setCategories(prevState => response.data.map(item => item.cat_title))
    }
    getCategory()
  }, [])


  console.log(categories, "12345")

  const handleChange = (value) => {
    setContent((prevState) => value);
  };

  const handleAddBlog = async () => {
    let payload = {};
    payload["blog_title"] = blogTitle;
    payload["blog_content"] = content;
    payload["blog_image"] = fileList[0]?.originFileObj;
    payload["blog_desc"] = description;
    payload["blog_url"] = "";
    payload["category"] = category;
    payload["sub_category"] = subCategory;
    const res = await Fetch.post_blog(payload);
    if (res.message) {
      notification.success({
        message: "Blog Created Successfully",
      });
    }
    setBlogTitle((prevState) => "");
    setDescription((prevState) => "");
    setFileList((prevState) => []);
    setSubCategories(prevState => [])
    setCategory(prevState => [])
    setContent((prevState) => "");
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

  const onChangeupload = ({ fileList: newFileList }) => {
    setFileList((prevState) =>
      newFileList.map((file) => ({
        ...file,
        status: "done",
      }))
    );
  };

  function setSubCategoryState(index) {
    setSubCategories(prevState => mainCategories[index].sub_categories)
  }

  return (
    <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
      <div className="add-blog-page">
        <div className="add-blog-inner-section">
          <div onClick={() => navigate(-1)} style={{
            width: "80px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "20px"
          }}>
            <LeftOutlined />
            <span>Go Back</span>
          </div>
          <div className="blog-container">
            <label>Add Blog Banner</label>
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
          <div className="blog-container">
            <label>Blog Title</label>
            <Input
              value={blogTitle}
              placeholder="Blog Title"
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </div>
          <div className="blog-container">
            <label>Blog Category</label>
            <Select
              placeholder='Select'
              value={category}
              onChange={(value, option) => {
                const selectedIndex = categories.findIndex(item => item.toLowerCase() === value);
                setCategory(value);
                setSubCategoryState(selectedIndex);
              }}
              style={{
                width: "80%"
              }}
            >
              {
                categories.map((item, index) => <Select.Option value={`${item.toLowerCase()}`} key={index}>{item}</Select.Option>)
              }
            </Select>
          </div>
          <div className="blog-container">
            <label>Blog Sub Category</label>
            <Select
              placeholder='Select'
              value={subCategory}
              style={{
                width: "80%"
              }}
              onChange={(value) => setSubCategory(prevState => value)}
            >
              {
                subCategories.map(item => <Select.Option value={`${item.toLowerCase()}`}>{item}</Select.Option>)
              }
            </Select>
          </div>
          <div className="blog-container">
            <label>Blog Description</label>
            <Input.TextArea
              value={description}
              placeholder="Blog Description"
              onChange={(e) => setDescription(e.target.value)}
              style={{
                resize: "none",
              }}
              autoSize={{ minRows: 3, maxRows: 10 }}
            />
          </div>
          <div className="blog-container">
            <label>Blog Content</label>
            <ReactQuill
              value={content}
              onChange={handleChange}
              modules={{
                toolbar: {
                  container: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                    [{ font: [] }], // Add a font family dropdown to the toolbar
                  ],
                },
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "table",
                "link",
                "image",
                "font", // Add font to the list of formats
              ]}
            />
          </div>
          <Button 
            onClick={handleAddBlog} 
            className="add-blog-btn"
            disabled={
              !blogTitle ||
              !description ||
              !content ||
              !category ||
              !subCategory
            }
          >
            Add Blog
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
