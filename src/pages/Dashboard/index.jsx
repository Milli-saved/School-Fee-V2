import React, { useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container } from "reactstrap";
import List from "./List";
import { useProfile } from "../../Components/Hooks/UserHooks";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../slices/thunks";

const DashboardEcommerce = () => {
  const dispatch = useDispatch();
  const { userProfile } = useProfile();
  document.title = "Dashboard";

  useEffect(() => {
    if (userProfile.roles !== 0) {
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
          <BreadCrumb title="Dashboard" pageTitle="" />
          <List />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
