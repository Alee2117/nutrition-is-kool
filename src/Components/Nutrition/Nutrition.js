import React, { useState, useEffect } from "react";
import styles from "./nutrition.module.css";
import TableList from "../TableList/TableList";
import FoodForm from "../FoodForm/FoodForm";

const Nutrition = () => {
  // Setting initial state
  const [food, setFood] = useState("");
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [list, setList] = useState([]);
  const [foodId, setFoodId] = useState("");

  const addInput = () => {
    setList(list => [...list, search]);
  };

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
    console.log(list);
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
        fetch(
          `https://api.nutritionix.com/v1_1/item?id=${foodId}&appId=${appId}&appKey=${appKey}`
        )
          .then(response => {
            return response.json();
          })
          .then(responseData => {
            setCalories(responseData.nf_calories);
            setProtein(responseData.nf_protein);
            setFoodId(foodId);
          });
      });
  };

  // Calling nutrition function that holds API
  useEffect(() => {
    if (isLoaded) {
      getNutrition(search);
      setFoodId(foodId);
      addInput();
      setIsLoaded(false);
    }
    // eslint-disable-next-line
  }, [isLoaded]);

  return (
    <div className={styles.nutritionContainer}>
      <FoodForm submit={handleSubmit} input={getInput} />
      <table className={styles.center}>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Calories</th>
            <th>Protein</th>
          </tr>
        </thead>
        <tbody>
          <TableList food={food} calories={calories} protein={protein} />
        </tbody>
      </table>
      <ul>
        {list.map(item => (
          <li key={Math.random()} className={styles.li}>
            {item} {calories} {protein}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nutrition;
