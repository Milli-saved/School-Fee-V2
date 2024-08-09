import React, { useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container } from "reactstrap";
import Grades from "./Grades";
import { useProfile } from "../../Components/Hooks/UserHooks";
import { logoutUser } from "../../slices/thunks";

const DashboardEcommerce = () => {
  document.title = "Grade";
  const { userProfile } = useProfile();
  useEffect(() => {
    if (userProfile.roles !== 2002) {
      dispatch(logoutUser());
    }
    if (!userProfile && loading && !token) {
      return (
        <Navigate to={{ pathname: "/", state: { from: props.location } }} />
      );
    }
  }, []);

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
