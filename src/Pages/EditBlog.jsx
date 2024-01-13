import React, { useState, useEffect, useContext } from "react";
import "./Styles/_add-blog.scss";
import { AppContext } from "../App";
import Header from "../Components/Header";
import { Button, Input, Upload, notification , Select } from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Fetch } from "../utils/FetchData";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "axios";
import { APP_BASE_URL, BLOG_IMAGE_BASE_URL } from "../utils/Contants";

const EditBlog = () => {
  const { blog_id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState(state.blog.blog_content ?? "");
  const [description, setDescription] = useState(state.blog.blog_desc ?? "");
  const [blogTitle, setBlogTitle] = useState(state.blog.blog_title ?? "");
  const [mainCategories, setMainCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])  
  
  

  const handleChange = (value) => {
    setContent((prevState) => value);
  };


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
  useEffect(() => {
    setFileList(prevState => [
      {
        uid: state.blog?.blog_id,
        name: state.blog?.blog_title,
        url: BLOG_IMAGE_BASE_URL + state.blog?.blog_image,
      },
    ])
  }, [state])
  

  console.log("fileList", fileList);

  const handleAddBlog = async () => {
    let payload = {};
    if(!!fileList[0]?.originFileObj){
      payload["blog_image"] = fileList[0]?.originFileObj 
    }
    payload["blog_title"] = blogTitle;
    payload["blog_content"] = content;
    payload["blog_desc"] = description;
    payload["blog_id"] = blog_id;
    const res = await Fetch.update_blog(payload);
    console.log(res);
    if (res.message === "Success") {
      notification.success({
        message: "Blog Edited    Successfully",
      });
    }
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
    console.log("fileList",fileList)
    setFileList(prevState => newFileList);
  };

  function setSubCategoryState(index) {
    setSubCategories(prevState => mainCategories[index].sub_categories)
  }

  return (
    <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
      <div className="add-blog-page">
        <div
          onClick={() => navigate(-1)}
          style={{
            width: "80px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          <LeftOutlined />
          <span>Go Back</span>
        </div>
        <div className="add-blog-inner-section">
          <div className="blog-container">
            <label>Edit Blog Banner</label>
            <Upload
              fileList={fileList}
              listType="picture-card"
              onChange={onChangeupload}
              onPreview={onPreview}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
          <div className="blog-container">
            <label>Edit Blog Title</label>
            <Input
              placeholder="Blog Title"
              onChange={(e) => setBlogTitle(e.target.value)}
              value={blogTitle}
            />
          </div>
          <div className="blog-container">
            <label>Edit Blog Category</label>
            <Select
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
            <label>Edit Blog Sub Category</label>
            <Select
              style={{
                width: "80%"
              }}
              onChange={(value) => setCategory(prevState => value)}
            >
              {
                subCategories.map(item => <Select.Option value={`${item.toLowerCase()}`}>{item}</Select.Option>)
              }
            </Select>
          </div>
          <div className="blog-container">
            <label>Blog Description</label>
            <Input.TextArea
              placeholder="Blog Description"
              onChange={(e) => setDescription(e.target.value)}
              style={{
                resize: "none",
              }}
              value={description}
              autoSize={{ minRows: 3, maxRows: 10 }}
            />
          </div>
          <div className="blog-container">
            <label>Edit Blog Content</label>
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
          <Button onClick={handleAddBlog} className="add-blog-btn">
            Update Blog
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
