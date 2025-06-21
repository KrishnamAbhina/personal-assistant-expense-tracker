import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income, getAuthHeader());
      getIncomes();
    } catch (err) {
      console.error("Add Income Error:", err.response?.data);
      setError(err.response?.data?.message || 'Error adding income');
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`, getAuthHeader());
      setIncomes(response.data || []);
    } catch (err) {
      console.error("Get Incomes Error:", err.response?.data);
      setError(err.response?.data?.message || 'Error fetching incomes');
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`, getAuthHeader());
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting income');
    }
  };

  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, expense, getAuthHeader());
      getExpenses();
    } catch (err) {
      console.error("Add Expense Error:", err.response?.data);
      setError(err.response?.data?.message || 'Error adding expense');
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`, getAuthHeader());
      setExpenses(response.data || []);
    } catch (err) {
      console.error("Get Expenses Error:", err.response?.data);
      setError(err.response?.data?.message || 'Error fetching expenses');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`, getAuthHeader());
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting expense');
    }
  };

  const totalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const incomeHistory = incomes.map(item => ({ ...item, type: 'income' }));
    const expenseHistory = expenses.map(item => ({ ...item, type: 'expense' }));
    const history = [...incomeHistory, ...expenseHistory];
    return history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
