import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";

import CbeLogo from "../../assets/images/cbe-logo.png";
//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { changePassword, userForgetPassword } from "../../slices/thunks";

// import images
// import profile from "../../assets/images/bg.png";
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";

const ForgetPasswordPage = (props) => {
  document.title = "Reset Password";

  const dispatch = useDispatch();
  const location = useLocation();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string()
        .required("Please Enter Your Password")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-zA-Z]/, "Password must contain both letters")
        .matches(/[0-9]/, "Password must contain numbers")
        .matches(/[@$!%*?&#]/, "Password must contain a special character"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please Confirm Your Password"),
    }),
    onSubmit: (values) => {
      console.log(" the values are: ", values);
      // dispatch(userForgetPassword(values, props.history));
    },
  });

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const submitHandler = (e) => {
    let password = {
      password: e.target[0].value,
      token,
    };
    console.log("the password: ", password);
    dispatch(changePassword(password, props.router.navigate));
  };

  const selectLayoutState = (state) => state.ForgetPassword;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    forgetError: state.forgetError,
    forgetSuccessMsg: state.forgetSuccessMsg,
  }));
  // Inside your component
  const { forgetError, forgetSuccessMsg } = useSelector(selectLayoutProperties);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <ParticlesAuth>
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link to="/" className="d-inline-block auth-logo">
                    <img src={CbeLogo} alt="" height="150" />
                  </Link>
                </div>
                <p className="mt-3 fs-15 fw-medium">
                  Change Your Password Here.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Update Password</h5>
                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#0ab39c"
                      className="avatar-xl"
                      style={{ width: "120px", height: "120px" }}
                    ></lord-icon>
                  </div>

                  <Alert
                    className="border-0 alert-warning text-center mb-2 mx-2"
                    role="alert"
                  >
                    You'r password should contain Alphabet, Numbers, special
                    characters and must be longer than 8 words.
                  </Alert>
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        // validation.handleSubmit();
                        // return false;
                        submitHandler(e);
                      }}
                    >
                      <div className="mb-4">
                        <Label className="form-label">New Password</Label>
                        <Input
                          name="password"
                          className="form-control"
                          placeholder="Enter Password"
                          type="password"
                          onChange={validation.handleChange}
                          invalid={validation.errors.password ? true : false}
                        />

                        {validation.errors.password ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.password}</div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-4">
                        <Label className="form-label">Confirm Password</Label>
                        <Input
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm password"
                          type="password"
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.confirmPassword ? true : false
                          }
                        />

                        {validation.errors.confirmPassword ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.confirmPassword}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Update Password
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              {/* <div className="mt-4 text-center">
                <p className="mb-0">
                  Wait, I remember my password...{" "}
                  <Link
                    to="/"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    Click here{" "}
                  </Link>{" "}
                </p>
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
