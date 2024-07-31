import React from "react";
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  Form,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledCollapse,
} from "reactstrap";
import { useFormik } from "formik";

const StudentDetails = () => {
  return (
    <>
      <div id="task-error-msg" className="alert alert-danger py-2"></div>
      <Form
        id="creattask-form"
        onSubmit={(e) => {
          e.preventDefault();
          // validation.handleSubmit();
          // return false;
          RegisterAccount();
        }}
      >
        {/* <input type="hidden" id="taskid-input" className="form-control" /> */}
        <div className="mb-3">
          <label htmlFor="task-title-input" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="task-title-input"
            className="form-control"
            placeholder="Enter Full Name"
            name="task"
            validate={{ required: { value: true } }}
            // onChange={(e) => setFullName(e.target.value)}
            // onBlur={validation.handleBlur}
            // value={fullName}
            // invalid={validation.touched.task && validation.errors.task ? true : false}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="task-title-input" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="task-title-input"
            className="form-control"
            placeholder="Email"
            name="email"
            // validate={{ required: { value: true } }}
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
          />
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="task-assign-input" className="form-label">
            Role
          </label>

          <div
            className="avatar-group justify-content-center"
            id="assignee-member"
          ></div>
          <div className="select-element">
            <Input
              name="role"
              type="select"
              className="form-select"
              id="status-field"
              //   onChange={(e) => setRole(e.target.value)}
              //   value={role}
            ></Input>
          </div>
        </div>
        <div className="hstack gap-2 justify-content-end">
          <button
            type="button"
            className="btn btn-ghost-success"
            onClick={() => setModalTodo(false)}
          >
            <i className="ri-close-fill align-bottom"></i> Close
          </button>
          <button type="submit" className="btn btn-primary" id="addNewTodo">
            Done
          </button>
        </div>
      </Form>
    </>
  );
};

export default StudentDetails;
