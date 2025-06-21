import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ViewTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/v1/transactions', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTransactions(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load transactions.');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <TransactionStyled>
      <h2>Your Transactions</h2>
      {error && <p className="error">{error}</p>}
      {transactions.length === 0 && !error && (
        <p className="no-data">No transactions yet. Start by adding one!</p>
      )}
      {transactions.map((txn, index) => (
        <div
          key={index}
          className={`transaction-card ${txn.type === 'INCOME' ? 'income' : 'expense'}`}
        >
          <h4>{txn.title}</h4>
          <p>₹{txn.amount}</p>
          <small>{new Date(txn.date).toLocaleDateString()}</small>
          <span className="label">{txn.type}</span>
        </div>
      ))}
    </TransactionStyled>
  );
};

const TransactionStyled = styled.div`
  padding: 2rem;

  h2 {
    margin-bottom: 1rem;
    color: #1b1a55;
  }

  .error {
    color: red;
  }

  .no-data {
    color: #555;
    font-style: italic;
  }

  .transaction-card {
    background: white;
    border-left: 6px solid gray; /* default */
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.income {
      border-left-color: green;
    }

    &.expense {
      border-left-color: red;
    }

    h4 {
      margin: 0;
      color: #5c5470;
    }

    p {
      margin: 0;
      font-weight: bold;
      color: #5c5470;
    }

    small {
      font-size: 0.85rem;
      color: #888;
    }

    .label {
      font-weight: bold;
      font-size: 0.85rem;
      color: #5c5470;
    }
  }
`;

export default ViewTransactions;
