import React from "react";

const TableList = props => {
  return (
    <tr>
      <td>{props.food}</td>
      <td>{props.calories}</td>
      <td>{props.protein}</td>
    </tr>
  );
};

export default TableList;
