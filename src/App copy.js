import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Load from "./Assets/Loader.gif";
import { Suspense, lazy, useState } from "react";
import React, { createContext , useEffect } from "react";
import { BsAspectRatio } from "react-icons/bs";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import Cookies from "js-cookie";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const DashboardLazy = lazy(() => import("./Pages/Dashboard"));
const ProfileLazy = lazy(() => import("./Pages/Profile"));
const PropertyLazy = lazy(() => import("./Pages/Properties"));
const PropertyViewLazy = lazy(() => import("./Pages/Views/PropertyView"));
const UsersLazy = lazy(() => import("./Pages/Users"));
const PaymentHistoryLazy = lazy(() => import("./Pages/PaymentHistory"));
const BlogLazy = lazy(() => import("./Pages/Blog"));
const BannerLazy = lazy(() => import("./Pages/Banners"));
const RequestsLazy = lazy(() => import("./Pages/Requests"));
const UserViewLazy = lazy(() => import("./Pages/Views/UserView"));
const LoginLazy = lazy(() => import("./Pages/authentication/Login"));
const SignUpLazy = lazy(() => import("./Pages/authentication/SignUp"));

export const ThemeContext = createContext({});
export const AppContext = createContext({});
function App() {
  const [theme, setTheme] = useState(true);
  const [hideBar, sethideBar] = useState(false);
  const navigate = useNavigate()

  function updateTheme(boolVal) {
    setTheme((prevState) => boolVal);
  }
  function updatehidebar(boolVal) {
    sethideBar((prevState) => boolVal);
  }
  const Loader = () => {
    return (
      <>
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: !theme?"#000":"#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border:"1px solid"
          }}
        >
        </div>
    </>
    );
  };
  
  useEffect(() => {
    if(!Cookies.get("userLoggedIn")){
      navigate('/login')
    }
    else{
      return;
    }
  }, [])
  

  return (
    <div className="App">
      {/* <Sidebar/> */}
      {/* <GoogleOAuthProvider clientId="216691269884-0gfc0lhfaun1r8kseubgpm50qb89d88t.apps.googleusercontent.com"> */}
      <AppContext.Provider
        value={{ hideBar, updatehidebar, theme, updateTheme }}
      >
        {
          (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup'))&& (
            <Sidebar />
          )
        }
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense  fallback={<Loader/>}>
                <DashboardLazy />
              </Suspense>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <Suspense  fallback={<Loader/>}>
                <ProfileLazy />
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
            path="/login"
            element={
              <Suspense  fallback={<Loader/>}>
                <LoginLazy />
              </Suspense>
            }
          />
          <Route
            exact
            path="/properties"
            element={
              <Suspense  fallback={<Loader/>}>
                <PropertyLazy />
              </Suspense>
            }
          />
          <Route
            exact
            path="/property_details/:id"
            element={
              <Suspense  fallback={<Loader/>}>
                <PropertyViewLazy />
              </Suspense>
            }
          />
          <Route
            exact
            path="/users"
            element={
              <Suspense  fallback={<Loader/>}>
                <UsersLazy />
              </Suspense>
            }
          />
          <Route
            exact
            path="/user-view/:id"
            element={
              <Suspense  fallback={<Loader/>}>
                <UserViewLazy />
              </Suspense>
            }
          />
          <Route
            exact
            path="/payment_history"
            element={
              <Suspense  fallback={<Loader/>}>
                <PaymentHistoryLazy />
              </Suspense>
            }
          />
          <Route
            exact
            path="/blogs"
            element={
              <Suspense  fallback={<Loader/>}>
                <BlogLazy />
              </Suspense>
            }
          />
          <Route
            exact
            path="/banners"
            element={
              <Suspense  fallback={<Loader/>}>
                <BannerLazy />
              </Suspense>
            }
          />
          <Route
            exact
            path="/requests"
            element={
              <Suspense  fallback={<Loader/>}>
                <RequestsLazy />
              </Suspense>
            }
          />
        </Routes>
        {/* </ThemeContext.Provider> */}
      </AppContext.Provider>
      {/* </GoogleOAuthProvider> */}
    </div>
  );
}

export default App;
