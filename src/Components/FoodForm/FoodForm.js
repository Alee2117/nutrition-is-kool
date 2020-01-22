import React from "react";

const FoodForm = props => {
  return (
    <form onSubmit={props.submit}>
      <input
        type="text"
        className="text"
        placeholder="What did you have to eat?"
        name="enteredFood"
        onChange={props.input}
      ></input>
      <input type="submit"></input>
    </form>
  );
};

export default FoodForm;
