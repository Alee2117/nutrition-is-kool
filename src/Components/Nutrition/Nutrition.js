import React, { useState } from "react";
import styles from "./nutrition.module.css";
import TableList from "../TableList/TableList";
import FoodForm from "../FoodForm/FoodForm";

const Nutrition = () => {
  // Setting initial state
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [totalCal, setTotalCal] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  const addProtein = protein => {
    const total = protein + totalProtein;
    setTotalProtein(total);
    return total;
  };

  const addCal = cal => {
    const total = cal + totalCal;
    setTotalCal(total);
    return total;
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
    getNutrition(search);
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
        let foodId = responseData.hits[0].fields.item_id;
        fetch(
          `https://api.nutritionix.com/v1_1/item?id=${foodId}&appId=${appId}&appKey=${appKey}`
        )
          .then(response => {
            return response.json();
          })
          .then(responseData => {
            const foodObject = {
              calories: responseData.nf_calories,
              protein: responseData.nf_protein,
              food: responseData.item_name,
              key: foodId,
              totalCal: addCal(responseData.nf_calories, totalCal),
              totalProtein: addProtein(responseData.nf_protein)
            };
            setFoodList([...foodList, foodObject]);
            setIsLoaded(false);
          });
      });
    console.log(isLoaded);
  };

  return (
    <div className={styles.nutritionContainer}>
      <FoodForm submit={handleSubmit} input={getInput} />
      <table className={styles.center}>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Total Calories</th>
            <th>Total Protein</th>
          </tr>
        </thead>
        <tbody>
          <TableList foodList={foodList} />
        </tbody>
      </table>
    </div>
  );
};

export default Nutrition;
