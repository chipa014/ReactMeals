import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card.js";

import classes from "./AvailableMeals.module.css";

import meals from "./dummy-meals.js";

const AvailableMeals = function (props) {
  const mealsList = meals.map((meal) => (
    <MealItem key={meal.id} meal={meal}></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
