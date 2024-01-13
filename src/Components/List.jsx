import { Button, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsArrowDownUp, BsArrowDown, BsArrowUp } from "react-icons/bs";
import { HiMiniEye } from "react-icons/hi2";
import { LiaFilterSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import "./Styles/List.scss";

function List(props) {
  const [checked, setChecked] = useState([]);
  const [checkbox, setcheckbox] = useState(false);
  const [sort, setSort] = useState(-1);
  const [order, setOrder] = useState(false);
  const navigate = useNavigate();
  const tableData = props.tableData;
  const SortTable = (index) => {
    sort === index && setOrder(!order);
    setSort(index);
  };
  const dropDownOverLay=(title,obj)=>{
    return(
      <div className="filter-drp">
        <div className="drp-head">
          <h4>{title}</h4>
        </div>
        <div className="drp-body">
        {obj.map((item)=>{
          return(
            <span>{item.label}</span>
          )
        })}
        </div>
      </div>
    )
  } 
  useEffect(()=>{
    if(props.checkedData){

      props.checkedData(checked)
    }
  },[checked])
  const handlecheckAll=()=>{
    setcheckbox(!checkbox)
    const checkboxx=[]
    if(!checkbox){
      for(var i=0;i<tableData.Data.length;i++){
        checkboxx.push(i)
      }
    }
    setChecked(checkboxx)
  }
  return (
    <div className="list-table">
      <table className="table table-hover">
        <thead
          style={{
            border: "1xp solid red",
          }}
        >
          <tr>
            {tableData.columns.map((item, index) => {
              
              return (
                <th
                  onClick={() => SortTable(index)}
                  style={{ width: item.width }}
                  key={index}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: (item.activSort || item.activFilter) && "15px",
                      minWidth: "100px",
                    }}
                  >
                   {item.title=== ""?(tableData.checkbox&&<input type="checkbox" onClick={handlecheckAll}/>): <span>{item.title}</span>}
                    {item.activSort && (
                      <span>
                        {index === sort ? (
                          order ? (
                            <BsArrowUp />
                          ) : (
                            <BsArrowDown />
                          )
                        ) : (
                          <BsArrowDownUp />
                        )}
                      </span>
                    )}
                    {item.activFilter && item.filterData && (
                      <Dropdown
                        overlay={ dropDownOverLay(item.title,item.filterData)}
                        trigger={['click']}
                        placement="bottom"
                      >
                        <Button>
                        <LiaFilterSolid />
                        </Button>
                      </Dropdown>
                    )}
                  </div>
                </th>
              );
            })}
            {/* <th scope="col" colSpan={2}>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {tableData.Data.map((data, index) => {
            return (
              <tr
                onClick={() => {
                  checked.filter((i) => i === index).length > 0
                    ? setChecked((prevState) => [
                        ...checked.filter((data1) => data1 !== index),
                      ])
                    : setChecked((prevState) => [...prevState, index]);
                }}
                className={
                  checked.filter((i) => i === index).length > 0
                    ? "checked-row"
                    : "unchecked-row"
                }
              >
                {data.map((item, index) => {
                  if (index === -1) {
                    return <th scope={index === 0 && "row"}>{item}</th>;
                  } else {
                    return <td>{item}</td>;
                  }
                })}

                <td className="icon-btns">
                  {tableData.Access.map((item) => {
                    switch (item.name) {
                      default:
                      case "view":
                        return (
                          <button
                            onClick={() => {
                              navigate(item.path);
                            }}
                          >
                            <HiMiniEye />
                          </button>
                        );
                      case "edit":
                        return (
                          <button
                            onClick={() => {
                              navigate(item.path);
                            }}
                          >
                            <AiFillEdit
                              stroke="000"
                              style={{ border: "none" }}
                            />
                          </button>
                        );
                    }
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
