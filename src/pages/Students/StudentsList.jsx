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
  getAllStudentsInGrade,
  setCurrentStudent,
} from "../../slices/thunks";
import { createSelector } from "reselect";
import StudentDetails from "./StudentDetails";

const Status = ({ status }) => {
  switch (status) {
    case 0:
      return (
        <span className="badge bg-info-subtle text-success text-uppercase">
          Super Admin
        </span>
      );
    case 2001:
      return (
        <span className="badge bg-warning-subtle text-warning text-uppercase">
          CBE Branch
        </span>
      );
    case 2002:
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
  const { user } = useSelector((state) => state.Login);

  const [schoolId, setSchoolId] = useState("");
  useEffect(() => {
    setSchoolId(user.schoolId);
  }, []);
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

  const { students } = useSelector((state) => state.Students);
  console.log("the stud: ", students);
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
    dispatch(getAllStudentsInGrade(id));
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
  const [selectedStudent, setSelectedStudent] = useState({});
  const handleTodoClick = useCallback(
    (arg) => {
      const todo = arg;
      dispatch(setCurrentStudent(arg));

      setSelectedStudent(arg);

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
                          <th scope="col">Student Id</th>
                          <th scope="col">Student Name</th>
                          <th scope="col">School Name</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Grade</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody id="task-list">
                        {(students || []).map((item, key) => (
                          <tr key={key}>
                            <td>
                              <div className="d-flex align-items-start">
                                <div className="flex-grow-1">
                                  <div className="form-check">
                                    {item.studentIdNumber}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-start">
                                <div className="flex-grow-1">
                                  <div className="form-check">
                                    {item.studentFirstName}{" "}
                                    {item.studentFatherName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-start">
                                <div className="flex-grow-1">
                                  <div className="form-check">
                                    {item.schoolName}
                                  </div>
                                </div>
                              </div>
                              {/* <Priority priority={item.schoolName} /> */}
                            </td>
                            <td>
                              <div className="d-flex align-items-start">
                                <div className="flex-grow-1">
                                  <div className="form-check">
                                    {item.studentGender}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-start">
                                <div className="flex-grow-1">
                                  <div className="form-check">
                                    {item.studentGrade}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="hstack gap-2">
                                {/* <button
                                  className="btn btn-sm btn-soft-danger remove-list"
                                  onClick={() => onClickTodoDelete(item)}
                                >
                                  <i className="ri-delete-bin-5-fill align-bottom" />
                                </button> */}
                                <button
                                  className="btn btn-sm btn-soft-info edit-list"
                                  onClick={() => handleTodoClick(item)}
                                >
                                  Details
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
        // tabIndex="-1"
        style={{ maxWidth: "1600px", width: "100%" }}
      >
        <ModalHeader toggle={toggle} className="p-3 bg-success-subtle">
          Student Detail
        </ModalHeader>
        <ModalBody>
          <StudentDetails student={selectedStudent} />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default index;
