import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container } from "reactstrap";
import List from "./List";

const DashboardEcommerce = () => {
  document.title = "Dashboard";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" pageTitle="" />
          <List />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
