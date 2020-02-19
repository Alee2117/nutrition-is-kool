import React from "react";
import styles from "../FoodForm/foodform.module.css";

const FoodForm = props => {
  return (
    <form className={styles.foodForm} onSubmit={props.submit}>
      <input
        type="text"
        className={styles.text}
        placeholder="What did you have to eat?"
        name="enteredFood"
        onChange={props.input}
      ></input>
      <input className={styles.btn} type="submit"></input>
    </form>
  );
};

export default FoodForm;
