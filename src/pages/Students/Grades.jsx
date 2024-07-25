import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
// import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer } from "react-toastify";
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";

const Grades = () => {
  const { school } = useSelector((state) => state.Students);
  const [correctGrade, setCorrectGrade] = useState(null);
  let allGrades = [];
  useEffect(() => {
    school[0].educationalDivisions.map((eachEducationalDivision, key) => {
      eachEducationalDivision.subDivision.map((eachSubDivision, key) => {
        console.log("the grades are: ", eachSubDivision.subDivisionName);
        allGrades.push({
          id: 1,
          isDesign1: true,
          time: "updated 3hrs ago",
          img: "",
          imgbgColor: "warning",
          label: eachSubDivision.subDivisionName,
          caption: "create a brand logo design",
          number: "18/42",
          statusClass: "success",
          progressBar: "34%",
          subItem: [],
          date: "10 Jul, 2021",
          ratingClass: "",
          cardHeaderClass: "danger",
        });
      });
    });
  }, [school]);

  useEffect(() => {
    setCorrectGrade(allGrades);
  }, []);
  console.log("all grades: ", correctGrade);

  return (
    <React.Fragment>
      {/* <ToastContainer closeButton={false} /> */}
      <div className="row">
        {(correctGrade || []).map((item, key) => (
          <React.Fragment key={key}>
            <Col xxl={3} sm={6} className="project-card">
              <Card>
                <CardBody>
                  <div
                    className={`p-3 mt-n3 mx-n3 bg-${item.cardHeaderClass}-subtle rounded-top`}
                  >
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h5 className="mb-0 fs-15">
                          <Link
                            to={`/student-list/${item.label}`}
                            className="text-body"
                          >
                            {item.label}
                          </Link>
                        </h5>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="d-flex gap-1 align-items-center my-n2">
                          <button
                            type="button"
                            className={`btn avatar-xs mt-n1 p-0 favourite-btn ${item.ratingClass}`}
                            onClick={(e) => activebtn(e.target)}
                          >
                            <span className="avatar-title bg-transparent fs-15">
                              <i className="ri-star-fill"></i>
                            </span>
                          </button>
                          <UncontrolledDropdown direction="start">
                            <DropdownToggle
                              tag="button"
                              className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15"
                            >
                              <FeatherIcon
                                icon="more-horizontal"
                                className="icon-sm"
                              />
                            </DropdownToggle>

                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem href="apps-projects-overview">
                                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                View
                              </DropdownItem>
                              <DropdownItem href="apps-projects-create">
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Edit
                              </DropdownItem>
                              <div className="dropdown-divider"></div>
                              <DropdownItem
                                href="#"
                                onClick={() => onClickData(item)}
                                data-bs-toggle="modal"
                                data-bs-target="#removeProjectModal"
                              >
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Remove
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-3">
                    <Row className="gy-3">
                      <Col xs={6}>
                        <div>
                          <p className="text-muted mb-1">Status</p>
                          <div
                            className={
                              "fs-12 badge bg-" +
                              item.statusClass +
                              "-subtle text-" +
                              item.statusClass +
                              " "
                            }
                          >
                            {item.status}
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div>
                          <p className="text-muted mb-1">Deadline</p>
                          <h5 className="fs-14">{item.deadline}</h5>
                        </div>
                      </Col>
                    </Row>

                    <div className="d-flex align-items-center mt-3">
                      <p className="text-muted mb-0 me-2">Team :</p>
                      <div className="avatar-group">
                        {item.subItem.map((item, key) => (
                          <React.Fragment key={key}>
                            {item.imgTeam ? (
                              <Link
                                to="#"
                                className="avatar-group-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="Darline Williams"
                              >
                                <div className="avatar-xxs">
                                  <img
                                    src={item.imgTeam}
                                    alt=""
                                    className="rounded-circle img-fluid"
                                  />
                                </div>
                              </Link>
                            ) : (
                              <Link
                                to="#"
                                className="avatar-group-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="Donna Kline"
                              >
                                <div className="avatar-xxs">
                                  <div
                                    className={
                                      item.bgColor
                                        ? "avatar-title rounded-circle bg-" +
                                          item.bgColor
                                        : "avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary"
                                    }
                                  >
                                    {item.imgNumber}
                                  </div>
                                </div>
                              </Link>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex mb-2">
                      <div className="flex-grow-1">
                        <div>Progress</div>
                      </div>
                      <div className="flex-shrink-0">
                        <div>{item.progressBar}</div>
                      </div>
                    </div>
                    <div className="progress progress-sm animated-progess">
                      <div
                        className="progress-bar bg-secondary"
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: item.progressBar }}
                      ></div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Grades;
