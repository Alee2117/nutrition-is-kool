import React, { useState, useEffect } from "react";

const Nutrition = () => {
  const [food, setFood] = useState("");

  const getInput = event => {
    setFood(event.target.value);
  };

  //   const submitFood = () => {};

  useEffect(() => {
    const appId = "e124e5bc";
    const appKey = "fd3e0319818416b4e8496e3502bcb565";
    const userInput = food;

    fetch(
      `https://api.nutritionix.com/v1_1/search/${userInput}?&appId=${appId}&appKey=${appKey}`
    )
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        console.log(responseData.hits[0].fields);
      });
  });

  return (
    <div className="nutrition-container">
      <form>
        <input
          type="text"
          className="text"
          placeholder="What did you have to eat?"
          value={food}
          onChange={getInput}
        ></input>
        <input type="submit" onClick={getInput}></input>
      </form>
      <h1>Hello!</h1>
      <p>Current state = {food}</p>
    </div>
  );
};

export default Nutrition;
