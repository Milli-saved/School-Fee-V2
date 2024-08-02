import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentDetails = () => {
  const { currentStudent } = useSelector((state) => state.Students);
  return (
    <div className="page-content">
      {console.log("the file is here: ", currentStudent)}
      <Container fluid>
        <BreadCrumb title="Student Details" />
        <Link to="/students">
          {/* <button
            className="btn btn-warning createTask"
            type="button"
            onClick={() => handleTodoClicks()}
          >
            <i className="ri-add-fill align-bottom" /> Back
          </button> */}
        </Link>
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
                  <h5 className="card-title flex-grow-1 mb-0">
                    Payment Details
                  </h5>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    {currentStudent?.paymentsForStudent?.map(
                      (eachItem, key) => {
                        return eachItem?.typeAndAmount.map(
                          (eachTypeandAmount, key) => {
                            return (
                              <div>
                                <h5>{eachTypeandAmount.paymentType}</h5>
                                <h5>{eachTypeandAmount.amount}</h5>
                                <h5>{eachTypeandAmount.status}</h5>
                              </div>
                            );
                          }
                        );
                      }
                    )}
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
