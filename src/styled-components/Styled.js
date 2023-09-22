import styled from "styled-components";
import { Dropdown, Select } from "antd";

export const StyledDropDown = styled(Dropdown)`
  cursor: pointer;
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    background-color: transparent !important;
    border: none !important;
  }
  .ant-select-focused .ant-select-selector {
    border: none !important ;
  }
  .ant-select-item-option:hover {
    background-color: red !important;
  }
`;
