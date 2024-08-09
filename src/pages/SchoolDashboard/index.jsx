import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Row,
  TabContent,
  Table,
  TabPane,
  UncontrolledCollapse,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";

//Images
import profileBg from "../../assets/images/profile-bg.jpg";
import { getSchools } from "../../slices/students/thunk";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useProfile } from "../../Components/Hooks/UserHooks";
import { logoutUser } from "../../slices/thunks";

const index = () => {
  const dispatch = useDispatch();
  document.title = "School";

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

  const { user } = useSelector((state) => state.Login);

  useEffect(() => {
    dispatch(getSchools(user.schoolId));
  }, []);

  const { school } = useSelector((state) => state.Students);
  // const selectState = (state) => state;
  // const schoolState = createSelector(selectState, (state) => ({
  //   student: state.Students,
  // }));

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="profile-foreground position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg">
              <img src={profileBg} alt="" className="profile-wid-img" />
            </div>
          </div>
          <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
            <Row className="g-4">
              <div className="col-auto">
                <div className="avatar-lg">
                  <img
                    // src={# }
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
              </div>

              <Col>
                <div className="p-2">
                  <h3 className="text-white mb-1">{school?.schoolName}</h3>
                  <p className="text-white text-opacity-75">
                    {school?.schoolEmail}
                  </p>
                  <div className="hstack text-white-50 gap-1">
                    <div className="me-2">{school?.schoolCity}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          {/*  */}
          <Row>
            <Col lg={12}>
              <TabContent className="pt-5">
                <TabPane>
                  <Row>
                    <Col xxl={3}>
                      <Card>
                        <CardBody>
                          <h5 className="card-title mb-3">Info</h5>
                          <div className="table-responsive">
                            <Table className="table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    School Name :
                                  </th>
                                  <td className="text-muted">
                                    {school?.schoolName}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    Mobile :
                                  </th>
                                  <td className="text-muted">
                                    {school?.schoolPhone}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    E-mail :
                                  </th>
                                  <td className="text-muted">
                                    {school?.schoolEmail}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    Location :
                                  </th>
                                  <td className="text-muted">
                                    {school?.schoolSubcity},{" "}
                                    {school?.schoolCity}
                                  </td>
                                </tr>
                                {/* <tr>
                              <th className="ps-0" scope="row">
                                Joining Date
                              </th>
                              <td className="text-muted">24 Nov 2021</td>
                            </tr> */}
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xxl={9}>
                      <Card>
                        <CardBody>
                          <h5 className="card-title mb-3">About</h5>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Non minus inventore ratione quos mollitia
                            velit libero modi, necessitatibus enim commodi
                            quisquam sed labore pariatur deleniti neque
                            molestiae, eius, id eaque itaque illum a! Quis amet
                            expedita ut quaerat, sit provident. Accusamus
                            placeat, deleniti accusantium magni praesentium
                            veritatis ex ducimus, iure quos, corporis dolor sit
                            illum cupiditate nisi deserunt quidem velit culpa
                            dignissimos officiis obcaecati libero! Consequuntur,
                            minima corrupti ipsam ipsum suscipit veniam
                            repellendus voluptatibus esse harum nesciunt enim
                            eaque fuga fugit, soluta, qui facere inventore?
                            Quidem earum accusamus veniam debitis, at molestias
                            aperiam dolor suscipit sequi porro impedit, culpa
                            magni?
                          </p>
                          <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Est dolore adipisci, rem vel, quae non ullam
                            ipsa vero numquam ad necessitatibus ipsum? Neque,
                            omnis eaque mollitia eveniet quis similique non
                            exercitationem fuga suscipit placeat magni, sed
                            voluptate quibusdam sequi atque veniam at aut
                            cupiditate voluptas ex harum. Deserunt, dolorem
                            fuga.
                          </p>
                          <Row>
                            <Col xs={6} md={4}>
                              <div className="d-flex mt-4">
                                <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                  <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                    <i className="ri-user-2-fill"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                  <p className="mb-1">Address :</p>
                                  <h6 className="text-truncate mb-0">
                                    {school?.schoolSubcity},{" "}
                                    {school?.schoolCity}
                                  </h6>
                                </div>
                              </div>
                            </Col>

                            <Col xs={6} md={4}>
                              <div className="d-flex mt-4">
                                <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                  <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                    <i className="ri-global-line"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                  <p className="mb-1">Email :</p>
                                  <Link to="#" className="fw-semibold">
                                    {school?.schoolEmail}
                                  </Link>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default index;
