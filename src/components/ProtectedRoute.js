import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
function ProtectedRoute({ component: Component, ...props }) {
  const loggedIn = React.useContext(AppContext);

  return (
    <>
      {
        loggedIn ? (
          <Route exact path={props.path}>
            <Component {...props} />
          </Route >
        )
          : (
            <Redirect to="./sign-in" />
          )

      }
    </>
  );
};

export default ProtectedRoute;