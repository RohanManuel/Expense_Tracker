import React from "react";
import { Container, Row } from "react-bootstrap";
import CircularProgressBar from "../../components/CircularProgressBar";
import LineProgressBar from "../../components/LineProgressBar";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./analytics.css";

const Analytics = ({ transactions = [] }) => {
  // Calculate transaction counts
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (item) => item.transactionType === "credit"
  ).length;
  const totalExpenseTransactions = transactions.filter(
    (item) => item.transactionType === "expense"
  ).length;

  // Calculate percentages
  const totalIncomePercent = totalTransactions > 0 
    ? (totalIncomeTransactions / totalTransactions) * 100 
    : 0;
  const totalExpensePercent = totalTransactions > 0 
    ? (totalExpenseTransactions / totalTransactions) * 100 
    : 0;

  // Calculate turnover amounts
  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalTurnOverIncome = transactions
    .filter((item) => item.transactionType === "credit")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalTurnOverExpense = transactions
    .filter((item) => item.transactionType === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate turnover percentages
  const TurnOverIncomePercent = totalTurnOver > 0 
    ? (totalTurnOverIncome / totalTurnOver) * 100 
    : 0;
  const TurnOverExpensePercent = totalTurnOver > 0 
    ? (totalTurnOverExpense / totalTurnOver) * 100 
    : 0;

  // Category configuration
  const categories = [
    "Groceries",
    "Rent",
    "Salary",
    "Tip",
    "Food",
    "Medical",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  const colors = {
    "Groceries": '#FF6384',
    "Rent": '#36A2EB',
    "Salary": '#FFCE56',
    "Tip": '#4BC0C0',
    "Food": '#9966FF',
    "Medical": '#FF9F40',
    "Utilities": '#8AC926',
    "Entertainment": '#6A4C93',
    "Transportation": '#1982C4',
    "Other": '#F45B69',
  };

  return (
    <Container className="mt-5 analytics-container">
      <Row>
        {/* First Card - Total Transactions */}
        <div className="col-lg-3 col-md-6 mb-4" style={{ "--order": 0 }}>
          <div className="card h-100 analytics-card">
            <div className="card-header">
              <span style={{ fontWeight: "bold" }}>Total Transactions:</span>{" "}
              {totalTransactions}
            </div>
            <div className="card-body">
              <h5 className="card-title income-text">
                <ArrowDropUpIcon className="analytics-icon" />
                Income: {totalIncomeTransactions}
              </h5>
              <h5 className="card-title expense-text">
                <ArrowDropDownIcon className="analytics-icon" />
                Expense: {totalExpenseTransactions}
              </h5>

              <div className="circular-progress-container">
                <CircularProgressBar
                  percentage={totalIncomePercent.toFixed(0)}
                  color="#4caf50"
                />
                <CircularProgressBar
                  percentage={totalExpensePercent.toFixed(0)}
                  color="#f44336"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Card - Total Turnover */}
        <div className="col-lg-3 col-md-6 mb-4" style={{ "--order": 1 }}>
          <div className="card h-100 analytics-card">
            <div className="card-header">
              <span style={{ fontWeight: "bold" }}>Total TurnOver:</span>{" "}
              {totalTurnOver.toFixed(2)} <CurrencyRupeeIcon className="analytics-icon" />
            </div>
            <div className="card-body">
              <h5 className="card-title income-text">
                <ArrowDropUpIcon className="analytics-icon" />
                Income: {totalTurnOverIncome.toFixed(2)} <CurrencyRupeeIcon className="analytics-icon" />
              </h5>
              <h5 className="card-title expense-text">
                <ArrowDropDownIcon className="analytics-icon" />
                Expense: {totalTurnOverExpense.toFixed(2)} <CurrencyRupeeIcon className="analytics-icon" />
              </h5>
              <div className="circular-progress-container">
                <CircularProgressBar
                  percentage={TurnOverIncomePercent.toFixed(0)}
                  color="#4caf50"
                />
                <CircularProgressBar
                  percentage={TurnOverExpensePercent.toFixed(0)}
                  color="#f44336"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Third Card - Categorywise Income */}
        <div className="col-lg-3 col-md-6 mb-4" style={{ "--order": 2 }}>
          <div className="card h-100 analytics-card">
            <div className="card-header">
              <span style={{ fontWeight: "bold" }}>Categorywise Income</span>
            </div>
            <div className="card-body">
              <div className="progress-container">
                {categories.map((category) => {
                  const income = transactions
                    .filter(transaction => transaction.transactionType === "credit" && transaction.category === category)
                    .reduce((acc, transaction) => acc + transaction.amount, 0);
                  
                  const incomePercent = totalTurnOverIncome > 0 
                    ? (income / totalTurnOverIncome) * 100 
                    : 0;

                  return (
                    income > 0 && (
                      <div key={`income-${category}`} className="line-progress-container">
                        <LineProgressBar 
                          label={category} 
                          percentage={incomePercent.toFixed(0)} 
                          lineColor={colors[category]}
                          textColor={colors[category]}
                        />
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Card - Categorywise Expense */}
        <div className="col-lg-3 col-md-6 mb-4" style={{ "--order": 3 }}>
          <div className="card h-100 analytics-card">
            <div className="card-header">
              <span style={{ fontWeight: "bold" }}>Categorywise Expense</span>
            </div>
            <div className="card-body">
              <div className="progress-container">
                {categories.map((category) => {
                  const expenses = transactions
                    .filter(transaction => transaction.transactionType === "expense" && transaction.category === category)
                    .reduce((acc, transaction) => acc + transaction.amount, 0);
                  
                  const expensePercent = totalTurnOverExpense > 0 
                    ? (expenses / totalTurnOverExpense) * 100 
                    : 0;

                  return (
                    expenses > 0 && (
                      <div key={`expense-${category}`} className="line-progress-container">
                        <LineProgressBar 
                          label={category} 
                          percentage={expensePercent.toFixed(0)} 
                          lineColor={colors[category]}
                          textColor={colors[category]}
                        />
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Analytics;