import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { BsGraphDown } from "react-icons/bs";
import { GiIsland } from "react-icons/gi";
import { PiArrowFatLineUpFill, PiArrowFatLineDownFill } from "react-icons/pi";
import {
  MdOutlineVilla,
  MdOutlineApartment,
  MdSupportAgent,
  MdOutlineRealEstateAgent,
} from "react-icons/md";

import "./Styles/Dashboard.scss";
import Areachart from "../Components/Dashboard/Areachart";
import TinyBarChart from "../Components/Dashboard/TinyBarChart";
import { Button, Select } from "antd";
import Linechart from "../Components/Dashboard/Linechart";
import PieCharts from "../Components/Dashboard/PieChart";
import { AppContext } from "../App";
import { Fetch } from "../utils/FetchData";
function Dashboard(props) {
  const [number, setNumber] = useState(0);
  const [properties, setProperties] = useState([]);
  const [users, setusers] = useState(0);
  const [limiter, setlimiter] = useState(0);
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [posted, setposted] = useState(0);
  const [sold, setsold] = useState(0);
  const [inReview, setinReview] = useState(0);

  const pieChartData = [
    { name: "Free Users", value: 400, color: "#BE2255" },
    { name: "Prime Users", value: 300, color: "#DD3E72" },
    { name: "Premium Users", value: 300, color: "#E57097" },
    { name: "Pro users", value: 200, color: "#EEA2BB" },
  ];
  // function handleSidebar(data) {
  //   setHideBar(data);
  // }
  
  useEffect(() => {
    const getUsers = async () => {
      const usersData = await Fetch.getUsersCount("");
      setusers(usersData.count);
      setlimiter(users);
    };
    const getprop = async () => {
      const postedCount = await Fetch.getPropertiesCount(
        "status=posted"
      );
      const reviewCount = await Fetch.getPropertiesCount(
        "status=in_review"
      );
      const soldCount = await Fetch.getPropertiesCount(
        "status=sold"
      )
  
      setposted(()=>postedCount.count)
      setsold(()=>soldCount.count)
      setinReview(()=>reviewCount.count)
      
  

      // return(propertyData);
      
    };
    getprop();
    getUsers();
  }, []);
  // const postedPropertiesCount = () => {
  //   // return properties.length > 0
  //   //   ? properties?.filter((item) => item?.status === "1").length
  //   //   : 0;
  //   // return getprop("status=posted")?.count
  // };
  // const reviewPropertiesCount = () => {
  //   // return properties.length > 0
  //   //   ? properties?.filter((item) => item?.status === "2").length
  //   //   : 0;
  //   // return getprop("status=in_review")?.count
  // };
  // const soldPropertiesCount =  () => {
  //   // return properties.length > 0
  //   //   ? properties?.filter((item) => item?.status === "3").length
  //   //   : 0;
  //   let data= getprop("")
  //   console.log("data=--=",data)
  //   return data?.count
  //   // return count.length;
  // };
  useEffect(() => {
    const incrementer = setInterval(() => {
      setNumber((c) => {
        if (c < limiter) return c + 1;
        clearInterval(incrementer);
        return c;
      });
    }, 500);
  }, [number]);
  return (
    <div className="dashboard">
      {console.log(hideBar)}
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header
            pagePath={"Main Dashboard"}
            width={!hideBar ? "75%" : "85%"}
          />
          <div className="main-section">
            <div className="analytics-section">
              {/* <div className="column1">
                <div className="recently-sold">
                  <h3 style={{ margin: 0 }}>Recently Sold</h3>
                  <table className="prop-table">
                    <tbody className="prop-table-body">
                      <tr className="prop-table-row">
                        <td className="prop-name">Avanexa</td>
                        <td className="prop-val"> &#8377;1000</td>
                      </tr>
                      <tr className="prop-table-row">
                        <td className="prop-name">Avanexa</td>
                        <td className="prop-val"> &#8377;1000</td>
                      </tr>
                      <tr className="prop-table-row">
                        <td className="prop-name">Avanexa</td>
                        <td className="prop-val"> &#8377;1000</td>
                      </tr>
                      <tr className="prop-table-row">
                        <td className="prop-name">Avanexa</td>
                        <td className="prop-val"> &#8377;1000</td>
                      </tr>
                      <tr className="prop-table-row">
                        <td className="prop-name">Avanexa</td>
                        <td className="prop-val"> &#8377;1000</td>
                      </tr>
                      <tr className="prop-table-row">
                        <td className="prop-name">Avanexa</td>
                        <td className="prop-val"> &#8377;1000</td>
                      </tr>
                      <tr className="prop-table-row">
                        <td className="prop-name">Avanexa</td>
                        <td className="prop-val"> &#8377;1000</td>
                      </tr>
                      <tr className="prop-table-row">
                        <td className="prop-name">Avanexa</td>
                        <td className="prop-val"> &#8377;1000</td>
                      </tr>
                      <tr className="prop-table-row">
                        <td className="prop-name">Avanexa</td>
                        <td className="prop-val"> &#8377;1000</td>
                      </tr>
                      <tr className="prop-table-row">
                        <td className="prop-name">Avanexa</td>
                        <td className="prop-val"> &#8377;1000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="login-status">
                  <h3 style={{margin:0}}>Total Login</h3>
                  <div className="login-chart">
                  <TinyBarChart /></div>
                </div>
              </div> */}
              <div className="row1">
                <div className="cards-cont">
                  <div className="dash-cards">
                    <div className="dash-card card">
                      <div className="card-main">
                        <div className="dash-card-left">
                          <div className="card-head">
                            {/* <div className="card-icon-cont">
                            <MdOutlineVilla />
                          </div> */}
                            <h1>{posted}</h1>
                            <p>Properties Posted</p>
                          </div>
                        </div>

                        <div className="dash-card-right">
                          <div className="graph-cont">
                            <TinyBarChart />
                          </div>
                        </div>
                      </div>
                      <div className="dash-card-count">
                        <span>
                          <PiArrowFatLineUpFill style={{ color: "#34eb4c" }} />
                        </span>
                        <p>
                          6.16% <span>since Last week</span>
                        </p>
                      </div>
                    </div>
                    <div className="dash-card card">
                      <div className="card-main">
                        <div className="dash-card-left">
                          <div className="card-head">
                            {/* <div className="card-icon-cont">
                            <MdOutlineVilla />
                          </div> */}
                            <h1>{sold}</h1>
                            <p>Properties Sold</p>
                          </div>
                        </div>

                        <div className="dash-card-right">
                          <div className="graph-cont">
                            <TinyBarChart />
                          </div>
                        </div>
                      </div>
                      <div className="dash-card-count">
                        <span>
                          <PiArrowFatLineUpFill style={{ color: "#34eb4c" }} />
                        </span>
                        <p>
                          2.86% <span>since Last week</span>
                        </p>
                      </div>
                    </div>
                    <div className="dash-card card">
                      <div className="card-main">
                        <div className="dash-card-left">
                          <div className="card-head">
                            {/* <div className="card-icon-cont">
                            <MdOutlineVilla />
                          </div> */}
                            <h1>{inReview}</h1>
                            <p>Properties In Review</p>
                          </div>
                        </div>

                        <div className="dash-card-right">
                          <div className="graph-cont">
                            <Linechart />
                          </div>
                        </div>
                      </div>
                      <div className="dash-card-count">
                        <span>
                          <PiArrowFatLineDownFill
                            style={{ color: "#8a0624" }}
                          />
                        </span>
                        <p>
                          2.86% <span>since Last week</span>
                        </p>
                      </div>
                    </div>
                    <div className="dash-card card">
                      <div className="card-main">
                        <div className="dash-card-left">
                          <div className="card-head">
                            {/* <div className="card-icon-cont">
                            <MdOutlineVilla />
                          </div> */}
                            <h1>{users}</h1>
                            <p>Total Users</p>
                          </div>
                        </div>

                        <div className="dash-card-right">
                          <div className="graph-cont">
                            <Linechart />
                          </div>
                        </div>
                      </div>
                      <div className="dash-card-count">
                        <span>
                          <PiArrowFatLineUpFill style={{ color: "#34eb4c" }} />
                        </span>
                        <p>
                          2.86% <span>since Last week</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row2">
                <div className="property-card card">
                  <div className="property-chart-head">
                    <h3 style={{ margin: 0 }}>Properties</h3>
                    <p>
                      SortBy:{" "}
                      <span>
                        <Select
                          defaultValue="Weekly"
                          style={{
                            width: 120,
                          }}
                          // onChange={handleChange}
                          options={[
                            {
                              value: "Weekly",
                              label: "Weekly",
                            },
                            {
                              value: "Monthly",
                              label: "Monthly",
                            },
                            {
                              value: "yearly",
                              label: "Yearly",
                            },
                          ]}
                        />
                      </span>
                    </p>
                  </div>
                  <div className="property-card-content">
                    <h1>
                      &#8377;0&nbsp;&nbsp;<span>Income</span>
                    </h1>
                    <p>|</p>
                    <h1>
                      &#8377;0&nbsp;&nbsp;<span>Income</span>
                    </h1>
                    <p>|</p>
                    <h1>
                      &#8377;0&nbsp;&nbsp;<span>Income</span>
                    </h1>
                  </div>
                  <div className="property-chart">
                    <Areachart />
                  </div>
                </div>
                <div className="piechart-card card">
                  <div className="pie-main">
                    <h3 style={{ margin: 0 }}>Users</h3>
                    <div className="pie-chart">
                      <PieCharts data={pieChartData} />
                    </div>
                    <div className="chart-content">
                      {pieChartData.map((item) => {
                        return (
                          <div className="legend-container">
                            <p
                              className="dot"
                              style={{ backgroundColor: item.color }}
                            ></p>
                            <p className="pie-legend">{item.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="piechart-overlay">
                    <div style={{ textAlign: "center" }}>
                      <h3 style={{ margin: 0, color: "#999" }}>Prime Users</h3>
                      <p style={{ fontSize: "25px", margin: 0 }}>{number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <TinyBarChart/> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
