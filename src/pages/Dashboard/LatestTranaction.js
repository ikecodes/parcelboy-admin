import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import { withRouter, Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Badge,
  Button,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import * as Yup from "yup"
import { useFormik } from "formik"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getDrivers as onGetDrivers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "store/contacts/actions"
import { isEmpty, size, map } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const ContactsList = props => {
  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      designation: (contact && contact.designation) || "",
      tags: (contact && contact.tags) || "",
      email: (contact && contact.email) || "",
      projects: (contact && contact.projects) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string().required("Please Enter Your Email"),
      projects: Yup.number().required("Please Enter Your Project"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          designation: values.designation,
          tags: values.tags,
          email: values.email,
          projects: values.projects,
        }

        // update user
        dispatch(onUpdateUser(updateUser))
        validation.resetForm()
        setIsEdit(false)
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          projects: values["projects"],
        }
        // save new user
        dispatch(onAddNewUser(newUser))
      }
      toggle()
    },
  })

  const { drivers } = useSelector(state => ({
    drivers: state.contacts.drivers,
  }))

  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search
  const sizePerPage = 10
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: drivers.length, // replace later with size(users),
    custom: true,
  }
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ]

  const selectRow = {
    mode: "checkbox",
  }

  const contactListColumns = [
    {
      text: "id",
      dataField: "_id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: user => <>{user._id}</>,
    },
    {
      dataField: "phone",
      text: "Phone",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <span>{user.phone}</span>
        </>
      ),
    },
    {
      text: "Name",
      dataField: "fullName",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.fullName}
            </Link>
          </h5>
        </>
      ),
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      text: "Gender",
      dataField: "gender",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => <>{user.gender}</>,
    },
    {
      text: "Verified?",
      dataField: "isVerified",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          {user.isVerified ? (
            <Badge color="success" pill>
              Verified
            </Badge>
          ) : (
            <Badge color="danger" pill>
              Unverified
            </Badge>
          )}
        </>
      ),
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          {/* <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUserClick(user)}
            ></i>
          </Link> */}
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => onClickDelete(user)}
            ></i>
          </Link>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (drivers && !drivers.length) {
      dispatch(onGetDrivers())
      setIsEdit(false)
    }
  }, [dispatch, drivers])

  useEffect(() => {
    setContact(drivers)
    setIsEdit(false)
  }, [drivers])

  useEffect(() => {
    if (!isEmpty(drivers) && !!isEdit) {
      setContact(drivers)
      setIsEdit(false)
    }
  }, [drivers])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const driver = arg

    setContact({
      id: driver.id,
      name: driver.name,
      designation: driver.designation,
      email: driver.email,
      tags: driver.tags,
      projects: driver.projects,
    })
    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = drivers => {
    setContact(drivers)
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    dispatch(onDeleteUser(contact))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const keyField = "_id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>
            Drivers List | Parcel - React Admin & Dashboard Template
          </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Consumers" breadcrumbItem="Consumer List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={contactListColumns}
                    data={drivers}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={drivers}
                          columns={contactListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={keyField}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      selectRow={selectRow}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      ref={node}
                                    />

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Edit User" : "Add User"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={e => {
                                            e.preventDefault()
                                            validation.handleSubmit()
                                            return false
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Name
                                                </Label>
                                                <Input
                                                  name="name"
                                                  type="text"
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values.name || ""
                                                  }
                                                  invalid={
                                                    validation.touched.name &&
                                                    validation.errors.name
                                                      ? true
                                                      : false
                                                  }
                                                />
                                                {validation.touched.name &&
                                                validation.errors.name ? (
                                                  <FormFeedback type="invalid">
                                                    {validation.errors.name}
                                                  </FormFeedback>
                                                ) : null}
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Designation
                                                </Label>
                                                <Input
                                                  name="designation"
                                                  label="Designation"
                                                  type="text"
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values
                                                      .designation || ""
                                                  }
                                                  invalid={
                                                    validation.touched
                                                      .designation &&
                                                    validation.errors
                                                      .designation
                                                      ? true
                                                      : false
                                                  }
                                                />
                                                {validation.touched
                                                  .designation &&
                                                validation.errors
                                                  .designation ? (
                                                  <FormFeedback type="invalid">
                                                    {
                                                      validation.errors
                                                        .designation
                                                    }
                                                  </FormFeedback>
                                                ) : null}
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Email
                                                </Label>
                                                <Input
                                                  name="email"
                                                  label="Email"
                                                  type="email"
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values.email ||
                                                    ""
                                                  }
                                                  invalid={
                                                    validation.touched.email &&
                                                    validation.errors.email
                                                      ? true
                                                      : false
                                                  }
                                                />
                                                {validation.touched.email &&
                                                validation.errors.email ? (
                                                  <FormFeedback type="invalid">
                                                    {validation.errors.email}
                                                  </FormFeedback>
                                                ) : null}
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Option
                                                </Label>
                                                <Input
                                                  type="select"
                                                  name="tags"
                                                  className="form-select"
                                                  multiple={true}
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values.tags || []
                                                  }
                                                  invalid={
                                                    validation.touched.tags &&
                                                    validation.errors.tags
                                                      ? true
                                                      : false
                                                  }
                                                >
                                                  <option>Photoshop</option>
                                                  <option>illustrator</option>
                                                  <option>Html</option>
                                                  <option>Php</option>
                                                  <option>Java</option>
                                                  <option>Python</option>
                                                  <option>
                                                    UI/UX Designer
                                                  </option>
                                                  <option>Ruby</option>
                                                  <option>Css</option>
                                                </Input>
                                                {validation.touched.tags &&
                                                validation.errors.tags ? (
                                                  <FormFeedback type="invalid">
                                                    {validation.errors.tags}
                                                  </FormFeedback>
                                                ) : null}
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Projects
                                                </Label>
                                                <Input
                                                  name="projects"
                                                  label="Projects"
                                                  type="text"
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values
                                                      .projects || ""
                                                  }
                                                  invalid={
                                                    validation.touched
                                                      .projects &&
                                                    validation.errors.projects
                                                      ? true
                                                      : false
                                                  }
                                                />
                                                {validation.touched.projects &&
                                                validation.errors.projects ? (
                                                  <FormFeedback type="invalid">
                                                    {validation.errors.projects}
                                                  </FormFeedback>
                                                ) : null}
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="submit"
                                                  className="btn btn-success save-user"
                                                >
                                                  Save
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Form>
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )
                    }}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(ContactsList)
