import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

const StudentDetails = ({ selectedStudent }) => {
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Student Details" />
        <Row>
          <Col xl={9}>
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Student Name</h5>
                  <div className="flex-shrink-0">
                    {/* <Link
                      to="/apps-invoices-details"
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="ri-download-2-fill align-middle me-1"></i>{" "}
                      Invoice
                    </Link> */}
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive table-card">
                  <table className="table table-nowrap align-middle table-borderless mb-0">
                    <thead className="table-light text-muted">
                      <tr>
                        <th scope="col">Product Details</th>
                        <th scope="col">Item Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Rating</th>
                        <th scope="col" className="text-end">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {productDetails.map((product, key) => (
                        <EcommerceOrderProduct product={product} key={key} />
                      ))} */}
                      <tr className="border-top border-top-dashed">
                        <td colSpan="3"></td>
                        <td colSpan="2" className="fw-medium p-0">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td>Sub Total :</td>
                                <td className="text-end">$359.96</td>
                              </tr>
                              <tr>
                                <td>
                                  Discount{" "}
                                  <span className="text-muted">(VELZON15)</span>{" "}
                                  : :
                                </td>
                                <td className="text-end">-$53.99</td>
                              </tr>
                              <tr>
                                <td>Shipping Charge :</td>
                                <td className="text-end">$65.00</td>
                              </tr>
                              <tr>
                                <td>Estimated Tax :</td>
                                <td className="text-end">$44.99</td>
                              </tr>
                              <tr className="border-top border-top-dashed">
                                <th scope="row">Total (USD) :</th>
                                <th className="text-end">$415.96</th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
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
                  <h5 className="fs-17 mt-2">Student Full Name</h5>
                  <p className="text-muted mb-0">ID: 1000121</p>
                  <p className="text-muted mb-0">Grade and Secion</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentDetails;
