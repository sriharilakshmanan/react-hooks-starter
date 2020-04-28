import React, { useEffect, useCallback, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(
        (ingredient) => ingredient.id !== action.id
      );
    default:
      throw new Error("Shouldn't reach this");
  }
};

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { ...currHttpState, isLoading: true };
    case "RESPONSE":
      return { ...currHttpState, isLoading: false };
    case "ERROR":
      return { isLoading: false, error: action.errorMessage };
    case "CLEAR_ERROR":
      return { ...currHttpState, error: null };
    default:
      throw new Error("Shouldn't reach this");
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttpState] = useReducer(httpReducer, {
    isLoading: false,
    error: null
  });
  //const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  useEffect(() => {
    console.log("RENDERING INGREDIENTS");
  });

  // useCallback hook is used here because setIngredients triggers a rerender of this component
  // and then onFilterIngredients is created again and this triggers a rerender of Search component.
  const onFilterIngredients = useCallback((filteredIngredients) => {
    //setIngredients(loadedIngredients);
    dispatch({
      type: "SET",
      ingredients: filteredIngredients
    });
  }, []);

  const onAddIngredientHandler = (ingredient) => {
    dispatchHttpState({ type: "SEND" });
    fetch("https://react-hooks-starter-3d913.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        dispatchHttpState({ type: "RESPONSE" });
        // setIngredients((prevIngredients) => [
        //   ...prevIngredients,
        //   {
        //     ...ingredient,
        //     id: responseData.name
        //   }
        // ]);

        dispatch({
          type: "ADD",
          ingredient: {
            ...ingredient,
            id: responseData.name
          }
        });
      });
  };

  const onRemoveIngredientHandler = (id) => {
    dispatchHttpState({ type: "SEND" });
    fetch(
      `https://react-hooks-starter-3d913.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE"
      }
    )
      .then((response) => {
        dispatchHttpState({ type: "RESPONSE" });

        // setIngredients((prevIngredients) => {
        //   return prevIngredients.filter((ingredient) => ingredient.id !== id);
        // });

        dispatch({
          type: "DELETE",
          id: id
        });
      })
      .catch((error) => {
        // setError("Something went wrong.");
        // setIsLoading(false);

        dispatchHttpState({
          type: "ERROR",
          errorMessage: "Something went wrong."
        });
      });
  };

  const clearError = () => {
    dispatchHttpState({ type: "CLEAR_ERROR" });
  };

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredientHandler={onAddIngredientHandler}
        isLoading={httpState.isLoading}
      />

      <section>
        <Search onFilterIngredients={onFilterIngredients} />
        {/* Need to add list here! */}
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={onRemoveIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
