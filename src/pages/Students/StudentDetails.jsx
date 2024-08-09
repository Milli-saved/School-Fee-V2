import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProfile } from "../../Components/Hooks/UserHooks";
import { logoutUser } from "../../slices/thunks";
import { useEffect } from "react";

const StudentDetails = () => {
  const { userProfile } = useProfile();
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
  const { currentStudent } = useSelector((state) => state.Students);
  return (
    <div className="page-content">
      {console.log("the file is here: ", currentStudent)}
      <Container fluid>
        <BreadCrumb title="Student Details" />
        <Row>
          <Col xl={3}>
            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>{" "}
                    Personal Details
                  </h5>
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/uetqnvvg.json"
                    trigger="loop"
                    colors="primary:#405189,secondary:#0ab39c"
                    style={{ width: "80px", height: "80px" }}
                  ></lord-icon>
                  <h5 className="fs-17 mt-2">
                    {currentStudent?.studentFirstName}{" "}
                    {currentStudent?.studentFatherName}
                  </h5>
                  <p className="text-muted mb-0">
                    ID: {currentStudent?.studentIdNumber}
                  </p>
                  <p className="text-muted mb-0">
                    {currentStudent?.studentGrade}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl={9}>
            <Card>
              <CardHeader>
                <h5 className="card-title flex-grow-1 mb-3">Payment Details</h5>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="todo-task" id="todo-task">
                      <div className="table-responsive">
                        <table
                          className="table align-middle position-relative table-nowrap"
                          style={{ width: "800px" }}
                        >
                          <thead className="table-active">
                            <tr>
                              <th scope="col">Payment Type</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody id="task-list">
                            {currentStudent?.paymentsForStudent?.map(
                              (eachItem, key) => {
                                return eachItem?.typeAndAmount.map(
                                  (eachTypeandAmount, key) => {
                                    return (
                                      <tr key={key}>
                                        <td>
                                          <div className="d-flex align-items-start">
                                            <div className="flex-grow-1">
                                              <div className="form-check">
                                                {eachTypeandAmount.paymentType}
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="d-flex align-items-start">
                                            <div className="flex-grow-1">
                                              <div className="form-check">
                                                {eachTypeandAmount.amount}
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="d-flex align-items-start">
                                            <div className="flex-grow-1">
                                              <div
                                                className="form-check"
                                                style={{
                                                  color: `${
                                                    eachTypeandAmount.status ==
                                                    "Not Paid"
                                                      ? "red"
                                                      : "green"
                                                  }`,
                                                }}
                                              >
                                                {eachTypeandAmount.status}
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  }
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentDetails;
