import React, { useContext } from "react";
import Load from "./../Assets/Loader.gif";
import { AppContext } from "../App";

const Loader = () => {
  const { theme, updateTheme } = useContext(AppContext);

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: theme ? "#fff" : "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          zIndex: 999999,
          // border:"1px solid"
        }}
      >
        <div
          style={{
            width: "75px",
            aspectRatio: 1,
          }}
        >
          <img
            src={Load}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Loader;
