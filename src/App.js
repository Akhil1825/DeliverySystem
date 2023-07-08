import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddCustomer from "./components/AddCustomer";
import CustomersList from "./components/CustomersList";
import "./App.css";

function App() {
  const [customerId, setCustomerId] = useState("");

  const getCustomerIdHandler = (id) => {
    console.log("The ID of customer to be edited: ", id);
    setCustomerId(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Library - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddCustomer id={customerId} setCustomerId={setCustomerId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <CustomersList getCustomerId={getCustomerIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
