import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../TableList/tablelist.module.css"

const TableList = props => {

  return props.foodList.map(item => (
    
    
    <tr key={item.key}>
      <td>{item.food}</td>
      <td>{item.calories}</td>
      <td>{item.protein}</td>
      <td>{item.totalCal}</td>
      <td>{item.totalProtein}</td>
      <td><button className={styles.deleteButton}>
        <FontAwesomeIcon className={styles.deleteIcon} icon={faTrash} />
      </button></td>
    </tr>
  ));
  }
  
;

export default TableList;
