import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./modelForm.css"; // Make sure to create this CSS file

const ModelForm = ({ transaction, onClose, isShow, onSubmit }) => {
  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  // Initialize form with transaction data when modal opens
  useEffect(() => {
    if (isShow && transaction) {
      setValues({
        title: transaction.title || "",
        amount: transaction.amount || "",
        description: transaction.description || "",
        category: transaction.category || "",
        date: transaction.date ? transaction.date.split('T')[0] : "", // Format date for input
        transactionType: transaction.transactionType || "",
      });
    }
  }, [isShow, transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
    onClose();
  };

  return (
    <Modal show={isShow} onHide={onClose} centered className="transaction-modal">
      <Modal.Header closeButton>
        <Modal.Title>Update Transaction Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Enter title"
              value={values.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="amount"
              type="number"
              placeholder="Enter amount"
              value={values.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSelect">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={values.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category...</option>
              <option value="groceries">Groceries</option>
              <option value="rent">Rent</option>
              <option value="salary">Salary</option>
              <option value="tip">Tip</option>
              <option value="food">Food</option>
              <option value="medical">Medical</option>
              <option value="utilities">Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="transportation">Transportation</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter description"
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
              required
            >
              <option value="">Select type...</option>
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
              required
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModelForm;