import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Load from "./Assets/Loader.gif";
import { Suspense, lazy, useState } from "react";
import React, { createContext, useEffect } from "react";
import { BsAspectRatio } from "react-icons/bs";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import Cookies from "js-cookie";
import Layout from "./Components/Layout";
import Loader from "./Components/Loader";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const DashboardLazy = lazy(() => import("./Pages/Dashboard"));
const ProfileLazy = lazy(() => import("./Pages/Profile"));
const AddBlogLazy = lazy(() => import("./Pages/AddBlog"));
const EditBlogLazy = lazy(() => import("./Pages/EditBlog"));
const PropertyLazy = lazy(() => import("./Pages/Properties"));
const PropertyViewLazy = lazy(() => import("./Pages/Views/PropertyView"));
const UsersLazy = lazy(() => import("./Pages/Users"));
const PaymentHistoryLazy = lazy(() => import("./Pages/PaymentHistory"));
const BlogLazy = lazy(() => import("./Pages/Blog"));
const BannerLazy = lazy(() => import("./Pages/Banners"));
const LocalitiesLazy = lazy(() => import("./Pages/Localities"));
const RequestsLazy = lazy(() => import("./Pages/Requests"));
const ReportsLazy = lazy(() => import("./Pages/Reports"));
const UserViewLazy = lazy(() => import("./Pages/Views/UserView"));
const LoginLazy = lazy(() => import("./Pages/authentication/Login"));
// const SignUpLazy = lazy(() => import("./Pages/authentication/SignUp"));
const AddCategoryLazy = lazy(() => import('./Pages/category/AddCategory'))
const EditCategoryLazy = lazy(() => import('./Pages/category/EditCategory'))

export const ThemeContext = createContext({});
export const AppContext = createContext({});
function App() {
  const [theme, setTheme] = useState(true);
  const [hideBar, sethideBar] = useState(false);
  const navigate = useNavigate();

  function updateTheme(boolVal) {
    setTheme((prevState) => boolVal);
  }
  function updatehidebar(boolVal) {
    sethideBar((prevState) => boolVal);
  }
  // const Loader = () => {
  //   return (
  //     <>
  //       <div
  //         style={{
  //           height: "100vh",
  //           width: "100vw",
  //           backgroundColor: !theme ? "#000" : "#fff",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           // border:"1px solid"
  //         }}
  //       >
  //         <div
  //           style={{
  //             width: "75px",
  //             aspectRatio: 1,
  //           }}
  //         >
  //           <img
  //             src={Load}
  //             style={{
  //               width: "100%",
  //               height: "100%",
  //               objectFit: "contain",
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  useEffect(() => {
    if (!Cookies.get("userLoggedIn")) {
      navigate("/login");
    } else {
      return;
    }
  }, []);

  return (
    <div className="App">
      <AppContext.Provider
        value={{ hideBar, updatehidebar, theme, updateTheme }}
      >
        {/* {
          (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup'))&& (
            <Sidebar />
          )
        } */}
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <LoginLazy />
              </Suspense>
            }
          />
          <Route path="/" element={<Layout />}>
            <Route
              exact
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <DashboardLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <Suspense fallback={<Loader />}>
                  <ProfileLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/add-blog"
              element={
                <Suspense fallback={<Loader />}>
                  <AddBlogLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/edit/:blog_id"
              element={
                <Suspense fallback={<Loader />}>
                  <EditBlogLazy />
                </Suspense>
              }
            />
            {/* <Route
            exact
            path="/signup"
            element={
              <Suspense  fallback={<Loader/>}>
                <SignUpLazy />
              </Suspense>
            }
          /> */}

            <Route
              exact
              path="/properties"
              element={
                <Suspense fallback={<Loader />}>
                  <PropertyLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/property_details/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <PropertyViewLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/users"
              element={
                <Suspense fallback={<Loader />}>
                  <UsersLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/user-view/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <UserViewLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/payment_history"
              element={
                <Suspense fallback={<Loader />}>
                  <PaymentHistoryLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/blogs"
              element={
                <Suspense fallback={<Loader />}>
                  <BlogLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/banners"
              element={
                <Suspense fallback={<Loader />}>
                  <BannerLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/localities"
              element={
                <Suspense fallback={<Loader />}>
                  <LocalitiesLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/requests"
              element={
                <Suspense fallback={<Loader />}>
                  <RequestsLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/reports"
              element={
                <Suspense fallback={<Loader />}>
                  <ReportsLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/add-category"
              element={
                <Suspense fallback={<Loader />}>
                  <AddCategoryLazy />
                </Suspense>
              }
            />
            <Route
              exact
              path="/edit-category"
              element={
                <Suspense fallback={<Loader />}>
                  <EditCategoryLazy />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
