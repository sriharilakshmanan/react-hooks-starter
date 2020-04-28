//import React, { useContext } from "react";
import React from "react";
import Ingredients from "./components/Ingredients/Ingredients";
import { AuthContext } from "./context/auth-context";
import Auth from "../src/components/Auth";

const App = (props) => {
  // const authContext = useContext(AuthContext);
  // let content = <Auth />;
  // if (authContext.isAuth) {
  //   content = <Ingredients />;
  // }
  // return content;

  return (
    <AuthContext.Consumer>
      {(context) => (context.isAuth ? <Ingredients /> : <Auth />)}
    </AuthContext.Consumer>
  );
};

export default App;
