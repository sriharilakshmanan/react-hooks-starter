import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo((props) => {
  //const [state, setState] = useState({ title: "", amount: "" });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddIngredientHandler({ title: title, amount: amount });
    // ...
  };

  // const onInputChangeHandler = (event, id) => {
  //   const value = event.target.value;
  //   setState((prevState) => ({ ...prevState, [id]: value }));
  // };

  console.log(title + " " + amount);

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.isLoading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;