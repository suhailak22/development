import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { BsGraphDown } from "react-icons/bs";
import { GiIsland } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import {
  MdOutlineVilla,
  MdOutlineApartment,
  MdSupportAgent,
  MdOutlineRealEstateAgent,
} from "react-icons/md";


import "./Styles/Dashboard.scss";
import BiaxialBarChart from "../Components/Dashboard/BiaxialBarChart";
import TinyBarChart from "../Components/Dashboard/TinyBarChart";
import { Button } from "antd";
import Linechart from "../Components/Dashboard/Linechart";
import PieCharts from "../Components/Dashboard/PieChart";
function Dashboard() {
  const[hideBarr,setHideBarr]=useState(true)
  const pieChartData = [
    { name: 'Free Users', value: 400 ,color:"#BE2255"},
    { name: 'Prime Users', value: 300 ,color:"#DD3E72"},
    { name: 'Premium Users', value: 300 ,color:"#E57097"},
    { name: 'Pro users', value: 200 ,color:"#EEA2BB"},
  ];
  function handleSidebar(data){
    setHideBarr(data)
  }
  return (
    <div className="dashboard">
      <Sidebar barStatus={handleSidebar}/>
      {console.log(hideBarr)}
      <div className="dashboard-content" style={{width:hideBarr?"80%":"95%"}}>
        <div className="page-section">
          <Header width={hideBarr?"75%":"85%"} />
          <div className="main-section">
            <div className="analytics-section">
              <div className="column1">
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
              </div>
              <div className="column2">
                <div className="cards-cont">
                  <div className="dash-cards">
                    <div className="dash-card">
                      <div className="dash-card-left">
                        <div className="card-head">
                          <div className="card-icon-cont">
                            <MdOutlineVilla />
                          </div>
                          <p>Properties Posted</p>
                        </div>
                        <div className="dash-card-count">
                          <p>1,010</p>
                        </div>
                        
                      </div>

                      <div className="dash-card-right">
                      <div className="graph-cont">
                        <Linechart/>
                      </div>
                      <Button>View all</Button>
                      </div>
                    </div>
                    <div className="dash-card">
                      <div className="dash-card-left">
                        <div className="card-head">
                          <div className="card-icon-cont">
                            <MdOutlineVilla />
                          </div>
                          <p>Properties Posted</p>
                        </div>
                        <div className="dash-card-count">
                          <p>1,010</p>
                        </div>
                        
                      </div>

                      <div className="dash-card-right">
                      <div className="graph-cont">
                        <Linechart/>
                      </div>
                      <Button>View all</Button>
                      </div>
                    </div>
                    <div className="dash-card">
                      <div className="dash-card-left">
                        <div className="card-head">
                          <div className="card-icon-cont">
                            <MdOutlineVilla />
                          </div>
                          <p>Properties Posted</p>
                        </div>
                        <div className="dash-card-count">
                          <p>1,010</p>
                        </div>
                        
                      </div>

                      <div className="dash-card-right">
                      <div className="graph-cont">
                        <Linechart/>
                      </div>
                      <Button>View all</Button>
                      </div>
                    </div>
                    <div className="dash-card">
                      <div className="dash-card-left">
                        <div className="card-head">
                          <div className="card-icon-cont">
                            <MdOutlineVilla />
                          </div>
                          <p>Properties Posted</p>
                        </div>
                        <div className="dash-card-count">
                          <p>1,010</p>
                        </div>
                        
                      </div>

                      <div className="dash-card-right">
                      <div className="graph-cont">
                        <Linechart/>
                      </div>
                      <Button>View all</Button>
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div className="property-card">
                <h3 style={{margin:0}}>Properties</h3>
                  <div className="property-chart">
                    <BiaxialBarChart/>
                  </div>
                </div>
              </div>
              <div className="column3">
                <div className="piechart-card">
                <h3 style={{margin:0}}>Users</h3>
                  <div className="pie-chart">
                    <PieCharts data={pieChartData}/>
                  </div>
                  <div className="chart-content">
                    {pieChartData.map((item)=>{
                      return(
                        <div className="legend-container">
                          <p className="dot" style={{backgroundColor:item.color}}></p>
                          <p className="pie-legend">{item.name}</p>
                        </div>
                      )
                    })}
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
