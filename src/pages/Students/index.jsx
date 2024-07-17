import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container } from "reactstrap";
import Grades from "./Grades";

const DashboardEcommerce = () => {
  document.title = "Grade";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Grades" pageTitle="Students" />
          <Grades />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
