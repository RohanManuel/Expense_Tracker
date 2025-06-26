import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./home.css";
import { deleteTransactions, editTransactions } from "../../utils/ApiRequest";
import axios from "axios";

const TableData = (props) => {
  const [show, setShow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currId, setCurrId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);

  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleEditClick = (itemKey) => {
    const editTran = props.data.filter((item) => item._id === itemKey);
    setCurrId(itemKey);
    setEditingTransaction(editTran);
    handleShow();
  };

  const handleEditSubmit = async (e) => {
    const { data } = await axios.put(`${editTransactions}/${currId}`, {
      ...values,
    });

    if (data.success === true) {
      handleClose();
      setRefresh(!refresh);
      window.location.reload();
    }
  };

  const handleDeleteClick = async (itemKey) => {
    const { data } = await axios.post(`${deleteTransactions}/${itemKey}`, {
      userId: props.user._id,
    });

    if (data.success === true) {
      setRefresh(!refresh);
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShow(false);
    setValues({
      title: "",
      amount: "",
      description: "",
      category: "",
      date: "",
      transactionType: "",
    });
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    setUser(props.user);
    setTransactions(props.data);
  }, [props.data, props.user, refresh]);

  return (
    <div className="data-table-container">
      <Table responsive className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              <td>{moment(item.date).format("YYYY-MM-DD")}</td>
              <td>{item.title}</td>
              <td className={item.transactionType === "Credit" ? "text-success" : "text-danger"}>
                {item.transactionType === "Credit" ? "+" : "-"}${item.amount}
              </td>
              <td>{item.transactionType}</td>
              <td>{item.category}</td>
              <td>
                <div className="icons-handle">
                  <EditNoteIcon
                    className="edit-icon"
                    onClick={() => handleEditClick(item._id)}
                  />
                  <DeleteForeverIcon
                    className="delete-icon"
                    onClick={() => handleDeleteClick(item._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} centered className="transaction-modal">
        <Modal.Header closeButton>
          <Modal.Title>Update Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder={editingTransaction?.[0]?.title || ""}
                value={values.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                name="amount"
                type="number"
                placeholder={editingTransaction?.[0]?.amount || ""}
                value={values.amount}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSelect">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={values.category}
                onChange={handleChange}
              >
                <option value="">{editingTransaction?.[0]?.category || "Select category"}</option>
                <option value="Groceries">Groceries</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Tip">Tip</option>
                <option value="Food">Food</option>
                <option value="Medical">Medical</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder={editingTransaction?.[0]?.description || ""}
                value={values.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSelect1">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select
                name="transactionType"
                value={values.transactionType}
                onChange={handleChange}
              >
                <option value="">{editingTransaction?.[0]?.transactionType || "Select type"}</option>
                <option value="credit">Credit</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableData;