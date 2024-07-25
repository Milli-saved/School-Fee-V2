import React, { useState, useEffect, useCallback } from "react";
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
import SimpleBar from "simplebar-react";
import Flatpickr from "react-flatpickr";
// import Dragula from "react-dragula";
import { ToastContainer } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import taskImg from "../../assets/images/task.png";
import DeleteModal from "../../Components/Common/DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//import action
import {
  getTodos as onGetTodos,
  updateTodo as onupdateTodo,
  deleteTodo as onDeleteTodo,
  addNewTodo as onAddNewTodo,
  getProjects as onGetProjects,
  addNewProject as onAddNewProject,
  RegisterUsers,
  getAllUsers as GetAllUsers,
} from "../../slices/thunks";
import { createSelector } from "reselect";

const Status = ({ status }) => {
  switch (status) {
    case 0:
      return (
        <span className="badge bg-info-subtle text-success text-uppercase">
          Super Admin
        </span>
      );
    case 2002:
      return (
        <span className="badge bg-warning-subtle text-warning text-uppercase">
          CBE Branch
        </span>
      );
    case 2001:
      return (
        <span className="badge bg-warning-subtle text-danger text-uppercase">
          School Admin
        </span>
      );
    default:
      return (
        <span className="badge bg-success-subtle text-success text-uppercase">
          {status}
        </span>
      );
  }
};

const Priority = ({ priority }) => {
  switch (priority) {
    case "High":
      return <span className="badge bg-danger text-uppercase">{priority}</span>;
    case "Medium":
      return (
        <span className="badge bg-warning text-uppercase">{priority}</span>
      );
    case "Low":
      return (
        <span className="badge bg-success text-uppercase">{priority}</span>
      );
    default:
      return <span className="badge bg-info text-uppercase">{priority}</span>;
  }
};

const index = () => {
  document.title = "Roles";

  const dispatch = useDispatch();
  const { id } = useParams();

  const selectLayoutState = (state) => state.Todos;
  const selectState = (state) => state;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    todos: state.todos,
    projects: state.projects,
  }));
  const selectProfileProperties = createSelector(selectState, (state) => ({
    success: state.Account.success,
    allUsers: state.Todos.allUsers,
  }));
  const { success, allUsers } = useSelector(selectProfileProperties);
  // Inside your component
  const { todos, projects } = useSelector(selectLayoutProperties);

  const [deleteModal, setDeleteModal] = useState(false);

  const [taskList, setTaskList] = useState([]);

  // Projects
  const [modalProject, setModalProject] = useState(false);

  useEffect(() => {
    dispatch(onGetProjects());
  }, [dispatch]);

  // To do Task List
  // To dos
  const [todo, setTodo] = useState(null);
  const [modalTodo, setModalTodo] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setTodo(todos);
    setTaskList(todos);
  }, [todos]);

  const toggle = useCallback(() => {
    if (modalTodo) {
      setModalTodo(false);
      setTodo(null);
    } else {
      setModalTodo(true);
    }
  }, [modalTodo]);

  // Toggle Project Modal
  const toggleProject = () => {
    if (modalProject) {
      setModalProject(false);
    } else {
      setModalProject(true);
    }
  };

  // Update To do
  const handleTodoClick = useCallback(
    (arg) => {
      const todo = arg;

      setTodo({
        id: todo.id,
        task: todo.task,
        dueDate: todo.dueDate,
        status: todo.status,
        priority: todo.priority,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Add To do
  const handleTodoClicks = () => {
    setTodo("");
    setModalTodo(!modalTodo);
    setIsEdit(false);
    toggle();
  };

  // Delete To do
  const onClickTodoDelete = (todo) => {
    setTodo(todo);
    setDeleteModal(true);
  };

  const handleDeleteTodo = () => {
    if (todo) {
      dispatch(onDeleteTodo(todo.id));
      setDeleteModal(false);
    }
  };

  const sortbystatus = [
    {
      options: [
        { label: "Completed", value: "Completed" },
        { label: "Inprogress", value: "Inprogress" },
        { label: "New", value: "New" },
        { label: "Pending", value: "Pending" },
      ],
    },
  ];

  const sortbypriority = [
    {
      options: [
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
      ],
    },
  ];

  const taskStatus = (e) => {
    if (e) {
      setTaskList(todos.filter((item) => item.status === e));
    } else {
      setTaskList(todos.filter((item) => item.status !== e));
    }
  };

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return el.task.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    }

    let filterData = filterItems(todos, inputVal);
    setTaskList(filterData);

    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("todo-task").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("todo-task").style.display = "block";
    }
  };

  const taskSort = (e) => {
    if (e) {
      setTaskList(todos.sort((a, b) => a.id - b.id));
      setTaskList(
        todos.sort((a, b) => {
          let x = a.task.toLowerCase();
          let y = b.task.toLowerCase();
          if (x < y) {
            return -1;
          } else if (x > y) {
            return 1;
          } else {
            return 0;
          }
        })
      );
    }
  };

  const changeTaskStatus = (e) => {
    const activeTask = e.target.value;
    let activeTaskList;
    if (e.target.checked) {
      activeTaskList = taskList.map((item) => {
        if (item.id === activeTask) {
          item.status = "Completed";
        }
        return item;
      });
    } else {
      activeTaskList = taskList.map((item) => {
        if (item.id === activeTask) {
          item.status = "Inprogress";
        }
        return item;
      });
    }
    setTaskList(activeTaskList);
  };

  // Project validation
  // validation
  const projectValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Project Title"),
    }),
    onSubmit: (values) => {
      const newProjectData = {
        id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        title: values.title,
        subItem: [{ id: 1, version: "v1.0.0", iconClass: "danger" }],
      };
      // save new Project Data
      dispatch(onAddNewProject(newProjectData));
      projectValidation.resetForm();
      toggleProject();
    },
  });

  // To do Task List validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      task: (todo && todo.task) || "",
      dueDate: (todo && todo.dueDate) || "",
      status: (todo && todo.status) || "",
      priority: (todo && todo.priority) || "",
    },
    validationSchema: Yup.object({
      task: Yup.string().required("Please Enter Task"),
      // dueDate: Yup.string().required("Please Enter Date"),
      // status: Yup.string().required("Please Enter Status"),
      // priority: Yup.string().required("Please Enter Priority"),
    }),
    onSubmit: (values) => {
      console.log("the values: ", values);
    },
  });

  const allRoles = [
    { id: 1, value: "Super Admin", code: "0000" },
    { id: 2, value: "CBE Branch", code: "2002" },
    { id: 3, value: "School Admin", code: "2001" },
  ];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);

  const RegisterAccount = () => {
    let userData = {
      name: fullName,
      email,
      roles: Number(role),
      password: "Welcome@2CBE",
      secretKey: "yitopretrtyio0594-yopiyr0954",
    };
    dispatch(RegisterUsers(userData));
    setModalTodo(!modalTodo);
    console.log("this is the data: ", userData);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <div className="file-manager-content w-100 p-4 pb-0">
              <Row className="mb-4">
                <div className="col-auto order-1 d-block d-lg-none">
                  <button
                    type="button"
                    className="btn btn-soft-success btn-icon btn-sm fs-16 file-menu-btn"
                  >
                    <i className="ri-menu-2-fill align-bottom"></i>
                  </button>
                </div>
                <div className="col-sm order-3 order-sm-2 mt-3 mt-sm-0">
                  <h5 className="fw-semibold mb-0">{id} Students </h5>
                </div>
              </Row>
              <div className="p-3 bg-light rounded mb-4">
                <Col className="col-lg-auto mb-2">
                  <Link to="/students">
                    <button
                      className="btn btn-warning createTask"
                      type="button"
                      onClick={() => handleTodoClicks()}
                    >
                      <i className="ri-add-fill align-bottom" /> Back
                    </button>
                  </Link>
                </Col>
                <Row className="g-2">
                  <Col className="col-lg">
                    <div className="search-box">
                      <input
                        type="text"
                        id="searchTaskList"
                        className="form-control search"
                        placeholder="Search Student"
                        onKeyUp={(e) => searchList(e.target.value)}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <Col className="col-lg-auto">
                    <button
                      className="btn btn-secondary createTask"
                      type="button"
                      onClick={() => handleTodoClicks()}
                    >
                      <i className="ri-add-fill align-bottom" /> Search Student
                    </button>
                  </Col>
                </Row>
              </div>

              <div
                className="todo-content position-relative px-4 mx-n4"
                id="todo-content"
              >
                {!todos && (
                  <div id="elmLoader">
                    <div
                      className="spinner-border text-primary avatar-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}

                <div className="todo-task" id="todo-task">
                  <div className="table-responsive">
                    <table className="table align-middle position-relative table-nowrap">
                      <thead className="table-active">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Role</th>
                          <th scope="col">Email</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody id="task-list">
                        {(allUsers || []).map((item, key) => (
                          <tr key={key}>
                            <td>
                              <div className="d-flex align-items-start">
                                <div className="flex-grow-1">
                                  <div className="form-check">{item.name}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <Status status={item.roles} />
                            </td>
                            <td>
                              <Priority priority={item.email} />
                            </td>
                            <td>
                              <div className="hstack gap-2">
                                <button
                                  className="btn btn-sm btn-soft-danger remove-list"
                                  onClick={() => onClickTodoDelete(item)}
                                >
                                  <i className="ri-delete-bin-5-fill align-bottom" />
                                </button>
                                <button
                                  className="btn btn-sm btn-soft-info edit-list"
                                  onClick={() => handleTodoClick(item)}
                                >
                                  <i className="ri-pencil-fill align-bottom" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="py-4 mt-4 text-center"
                  id="noresult"
                  style={{ display: "none" }}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/msoeawqm.json"
                    trigger="loop"
                    colors="primary:#405189,secondary:#0ab39c"
                    style={{ width: "72px", height: "72px" }}
                  ></lord-icon>
                  <h5 className="mt-4">Sorry! No Result Found</h5>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Modal
        id="createTask"
        isOpen={modalTodo}
        toggle={toggle}
        modalClassName="zoomIn"
        centered
        tabIndex="-1"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-success-subtle">
          {" "}
          {!!isEdit ? "Edit Task" : "Create Role"}{" "}
        </ModalHeader>
        <ModalBody>
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
                onChange={(e) => setFullName(e.target.value)}
                onBlur={validation.handleBlur}
                value={fullName}
                // invalid={validation.touched.task && validation.errors.task ? true : false}
              />
              {validation.touched.task && validation.errors.task ? (
                <FormFeedback type="invalid">
                  {validation.errors.task}
                </FormFeedback>
              ) : null}
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
                validate={{ required: { value: true } }}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validation.handleBlur}
                value={email}
                // invalid={validation.touched.task && validation.errors.task ? true : false}
              />
              {validation.touched.task && validation.errors.task ? (
                <FormFeedback type="invalid">
                  {validation.errors.task}
                </FormFeedback>
              ) : null}
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
                  onChange={(e) => setRole(e.target.value)}
                  onBlur={validation.handleBlur}
                  value={role}
                >
                  {allRoles.map((item, key) => (
                    <React.Fragment key={key}>
                      <option value={item.code} key={key}>
                        {item.value}
                      </option>
                    </React.Fragment>
                  ))}
                </Input>
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
                {!!isEdit ? "Save" : "Add Role"}
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      {/* Projects */}
      <Modal
        id="createProjectModal"
        isOpen={modalProject}
        toggle={() => setModalProject(!modalProject)}
        modalClassName="zoomIn"
        tabIndex="-1"
        centered
      >
        <ModalHeader
          toggle={() => setModalProject(!modalProject)}
          className="p-3 bg-success-subtle"
          id="createProjectModalLabel"
        >
          Create Role
        </ModalHeader>
        <ModalBody>
          <form
            className="needs-validation createProject-form"
            onSubmit={(e) => {
              e.preventDefault();
              projectValidation.handleSubmit();
              setModalProject(false);
              return false;
            }}
          >
            <div className="mb-4">
              <label htmlFor="projectname-input" className="form-label">
                Role Name
              </label>
              <Input
                type="text"
                className="form-control"
                id="projectname-input"
                name="title"
                validate={{
                  required: { value: true },
                }}
                onChange={projectValidation.handleChange}
                onBlur={projectValidation.handleBlur}
                value={projectValidation.values.title || ""}
                placeholder="Enter Role name"
                invalid={
                  projectValidation.touched.title &&
                  projectValidation.errors.title
                    ? true
                    : false
                }
              />
              {projectValidation.touched.title &&
              projectValidation.errors.title ? (
                <FormFeedback type="invalid">
                  {projectValidation.errors.title}
                </FormFeedback>
              ) : null}
              <input
                type="hidden"
                className="form-control"
                id="projectid-input"
                value=""
              />
            </div>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-ghost-success"
                onClick={() => setModalProject(false)}
              >
                <i className="ri-close-line align-bottom"></i> Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                id="addNewProject"
              >
                Add Role
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default index;
