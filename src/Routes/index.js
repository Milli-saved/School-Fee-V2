import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import NonAuthLayout from "../Layouts/NonAuthLayout";

// Routes
import { publicRoutes } from "./allRoutes";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.Component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};
