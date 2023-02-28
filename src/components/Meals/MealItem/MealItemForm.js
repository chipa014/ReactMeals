import { useRef, useState } from "react";

import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = function (props) {
  const amountInputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(true);

  const submitHandler = function (e) {
    e.preventDefault();
    const enteredAmountString = amountInputRef.current.value;
    if (enteredAmountString.trim().length === 0) {
      return;
    }
    const enteredAmount = +enteredAmountString;
    if (enteredAmount > 5 || enteredAmount < 1) {
      setFormIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        input={{
          id: `amount_${props.meal.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        label="Amount"
      />
      <button>+ Add</button>
      {!formIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
