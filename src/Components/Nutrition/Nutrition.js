import React, { useState, useEffect } from "react";

const Nutrition = () => {
  const [food, setFood] = useState("");
  const [search, setSearch] = useState("");
  const [isLoaded, setisLoaded] = useState(false);

  const getInput = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFood(e.target.value);
    setisLoaded(true);
  };
  const getNutrition = food => {
    const appId = "e124e5bc";
    const appKey = "fd3e0319818416b4e8496e3502bcb565";
    fetch(
      `https://api.nutritionix.com/v1_1/search/${food}?&appId=${appId}&appKey=${appKey}`
    )
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        console.log(responseData.hits[0].fields);
      });
  };

  useEffect(() => {
    if (isLoaded) {
      getNutrition(search);
    }
  }, [food]);

  return (
    <div className="nutrition-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="text"
          placeholder="What did you have to eat?"
          name="enteredFood"
          onChange={getInput}
        ></input>
        <input type="submit"></input>
      </form>
      <h1>Hello!</h1>
      <p>Current state = {food}</p>
    </div>
  );
};

export default Nutrition;
