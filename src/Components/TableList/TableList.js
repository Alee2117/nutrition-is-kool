import React from "react";

const TableList = ({ foodList }) => {
  return foodList.map(item => (
    <tr key={item.key}>
      <td>{item.food}</td>
      <td>{item.calories}</td>
      <td>{item.protein}</td>
      <td>{item.totalCal}</td>
      <td>{item.totalProtein}</td>
    </tr>
  ));
};

export default TableList;
