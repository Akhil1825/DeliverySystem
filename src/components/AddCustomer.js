import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import CustomerDataService from "../services/customer-services";

const AddCustomer = ({ id, setCustomerId }) => {
  const [name, setName] = useState("");
  const [payment, setPayment] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || payment === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newCustomer = {
      name,
      payment,
      status,
    };
    console.log(newCustomer);

    try {
      if (id !== undefined && id !== "") {
        await CustomerDataService.updateCustomer(id, newCustomer);
        setCustomerId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await CustomerDataService.addCustomers(newCustomer);
        setMessage({ error: false, msg: "New Customer added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setPayment("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await CustomerDataService.getCustomer(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setPayment(docSnap.data().payment);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCustomerName">
            <InputGroup>
              <InputGroup.Text id="formCustomerName">N</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Customer Name"
                value={name}
                onChange={(e) => setPayment(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCustomerPayment">
            <InputGroup>
              <InputGroup.Text id="formCustomerPayment">P</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Payment Status"
                value={payment}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Delivered");
                setFlag(true);
              }}
            >
              Delivered
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Delivered");
                setFlag(false);
              }}
            >
              Not Delivered
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddCustomer;
