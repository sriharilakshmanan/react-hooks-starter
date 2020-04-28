import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const { onFilterIngredients } = props;
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        let queryParams =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch(
          "https://react-hooks-starter-3d913.firebaseio.com/ingredients.json" +
            queryParams
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIngredients = [];
            for (let key in responseData) {
              console.log(responseData);
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              });
            }
            onFilterIngredients(loadedIngredients);
          });
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onFilterIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
