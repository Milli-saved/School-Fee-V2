import React, { useState } from "react";
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
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

import smallImage2 from "../../assets/images/small/img-2.jpg";
import smallImage3 from "../../assets/images/small/img-3.jpg";
import smallImage4 from "../../assets/images/small/img-4.jpg";
import smallImage5 from "../../assets/images/small/img-5.jpg";
import smallImage6 from "../../assets/images/small/img-6.jpg";
import smallImage7 from "../../assets/images/small/img-7.jpg";
import smallImage9 from "../../assets/images/small/img-9.jpg";

const index = () => {
  document.title = "Student";
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
                  <h3 className="text-white mb-1">Cruise School</h3>
                  <p className="text-white text-opacity-75">
                    cruiseschool@gmail.com
                  </p>
                  <div className="hstack text-white-50 gap-1">
                    <div className="me-2">
                      {/* <i className="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i> */}
                      Bisrate Gebrieal, Addis Ababa
                    </div>
                  </div>
                </div>
              </Col>
              {/* <Col xs={12} className="col-lg-auto order-last order-lg-0">
                <Row className="text text-white-50 text-center">
                  <Col lg={6} xs={4}>
                    <div className="p-2">
                      <h4 className="text-white mb-1">24.3K</h4>
                      <p className="fs-14 mb-0">Followers</p>
                    </div>
                  </Col>
                  <Col lg={6} xs={4}>
                    <div className="p-2">
                      <h4 className="text-white mb-1">1.3K</h4>
                      <p className="fs-14 mb-0">Following</p>
                    </div>
                  </Col>
                </Row>
              </Col> */}
            </Row>
          </div>
          {/*  */}

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
                              <td className="text-muted">Cruise School</td>
                            </tr>
                            <tr>
                              <th className="ps-0" scope="row">
                                Mobile :
                              </th>
                              <td className="text-muted">+(251) 9********</td>
                            </tr>
                            <tr>
                              <th className="ps-0" scope="row">
                                E-mail :
                              </th>
                              <td className="text-muted">
                                cruiseschool@gmail.com
                              </td>
                            </tr>
                            <tr>
                              <th className="ps-0" scope="row">
                                Location :
                              </th>
                              <td className="text-muted">
                                Bisrate Gebrieal, Addis Ababa
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
              </Row>
            </TabPane>
          </TabContent>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default index;
