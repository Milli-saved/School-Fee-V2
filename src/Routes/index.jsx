import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import NonAuthLayout from "../Layouts/NonAuthLayout";

// Routes
import { publicRoutes } from "./allRoutes";

const Index = () => {
  return (
    <React.Fragment>
      <Router>
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
      </Router>
    </React.Fragment>
  );
};

export default Index;
