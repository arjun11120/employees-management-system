import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from 'react-bootstrap/Card';
import { useDispatch } from "react-redux";
import { addEmployee } from "../../slices/employeeSlice";
import { useSelector } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NewEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(null);
  const employees = useSelector((state) => state.employee.employees);
  console.log("employees", employees);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data) => {
    setFormData(data);
    handleShow();
  };

  const handleSaveChanges = () => {
    if (formData) {
      const existingEmployee = employees.find(emp => emp.EmployeeId === formData.EmployeeId);
      if (existingEmployee) {
        alert("An employee with this ID already exists.")
      } else {
        console.log(formData);
        dispatch(addEmployee(formData));
        reset();
    }
    handleClose();
  };
}

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Employee Addition</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to add this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={4}>
          <Card>
            <Card.Header>Add Employee</Card.Header>
            <Card.Body>
              <Card.Text>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Employee Id <span className="text-danger" controlId="EmployeeId">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter the EmployeeId"
                      {...register("EmployeeId", { required: true })}
                    />
                    {errors.EmployeeId && (
                      <span className="text-danger">This EmployeeId is required</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Employee Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the Employee Name"
                      {...register("EmpName", { required: true })}
                    />
                    {errors.EmpName && (
                      <span className="text-danger">This Employee Name is required</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Department <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the Department"
                      {...register("Department", { required: true })}
                    />
                    {errors.Department && (
                      <span className="text-danger">Department is required</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                    Salary <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter the Phone Number"
                      {...register("Salary", { required: true })}
                    />
                    {errors.Salary && (
                      <span className="text-danger">Salary is required</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Phone Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter the Phone Number"
                      {...register("PhNumber", { required: true })}
                    />
                    {errors.PhNumber && (
                      <span className="text-danger">Phone Number is required</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email address <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter the Email address"
                      {...register("EmailId", { required: true })}
                    />
                    {errors.EmailId && (
                      <span className="text-danger">Email address is required</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Address <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      {...register("Address", { required: true })}
                    />
                    {errors.Address && (
                      <span className="text-danger">This field is required</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="State">
                    <Form.Label>
                      State <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the State"
                      {...register("State", { required: true })}
                    />
                    {errors.State && (
                      <span className="text-danger">This field is required</span>
                    )}
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NewEmployee;
