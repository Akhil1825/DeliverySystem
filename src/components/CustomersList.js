import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import CustomerDataService from "../services/customer-services";

const CustomersList = ({ getCustomerId }) => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    const data = await CustomerDataService.getAllCustomers();
    console.log(data.docs);
    setCustomers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await CustomerDataService.deleteCustomer(id);
    getCustomers();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getCustomers}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Payment Status</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.payment}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getCustomerId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default CustomersList;
