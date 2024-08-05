import React from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
// import { StaticBackdropModalExample } from "./modals";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <Row>
      <Col
        xxl={12}
        style={{
          marginTop: "5%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card>
          <CardHeader>
            <h4 className="card-title">Update Password.</h4>
          </CardHeader>
          <CardBody>
            <div className="mt-4">
              <h4 className="mb-3">Update Your password to continue.</h4>
              <p className="text-muted mb-4">
                {" "}
                The transfer was not successfully received by us. the email of
                the recipient wasn't correct.
              </p>
              <div className="hstack gap-2 justify-content-center">
                <Link
                  to="#"
                  className="btn btn-link link-success fw-medium"
                  onClick={() => setmodal_backdrop(false)}
                >
                  <i className="ri-close-line me-1 align-middle"></i> Close
                </Link>
                <Link to="#" className="btn btn-success">
                  Completed
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default index;
