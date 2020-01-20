import React, { useState, useEffect } from "react";

const Nutrition = () => {
  // Setting initial state
  const [food, setFood] = useState("");
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");

  // Getting user input for an argument to be used later in API call
  const getInput = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // Submitting user input / starting API call / setting food to be searched
  const handleSubmit = e => {
    e.preventDefault();
    setIsLoaded(true);
    setFood(e.target.value);
  };

  // Function that holds API call using form input
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
        setFood(responseData.hits[0].fields.item_name);
        let foodId = responseData.hits[0].fields.item_id;
        console.log(responseData);
        console.log(foodId);
        fetch(
          `https://api.nutritionix.com/v1_1/item?id=${foodId}&appId=${appId}&appKey=${appKey}`
        )
          .then(response => {
            return response.json();
          })
          .then(responseData => {
            setCalories(responseData.nf_calories);
            setProtein(responseData.nf_protein);
            console.log(responseData);
          });
      });
  };

  // Calling nutrition function that holds API
  useEffect(() => {
    if (isLoaded) {
      getNutrition(search);
      setIsLoaded(false);
    }
    // eslint-disable-next-line
  }, [isLoaded]);

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
      <p>Item = {food}</p>
      <p>Calories = {calories}</p>
      <p>Protein = {protein}</p>
    </div>
  );
};

export default Nutrition;
