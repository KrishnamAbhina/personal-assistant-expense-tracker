import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import { useGlobalContext } from '../../context/globalcontext';
import Button from '../button/button';
import { plus } from '../../utils/icons';

function ExpenseForm() {
    const { addIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        customCategory: '',
        description: ''
    });

    const { title, amount, date, category, customCategory,description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleCategoryChange = e => {
        const value = e.target.value;
        if (value !== 'other') {
            setInputState({ ...inputState, category: value });
        } else {
            setInputState({ ...inputState, category: '' }); // Let user type custom category
        }
    };

    const handleSubmit = e => {
    e.preventDefault();

    const payload = {
        ...inputState,
        amount: Number(inputState.amount),
        category: inputState.category || inputState.customCategory // handle "other"
    };

    if (isNaN(payload.amount)) {
        setError('Amount must be a number');
        return;
    }

    addIncome(payload);

    setInputState({
        title: '',
        amount: '',
        date: '',
        category: '',
        customCategory: '',
        description: ''
    });
};


    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}

            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>

            <div className="input-control">
                <input
                    type="text"
                    value={amount}
                    name="amount"
                    placeholder="Expense Amount"
                    onChange={handleInput('amount')}
                />
            </div>

            <div className="input-control">
                <input 
                    type="date" 
                    value={date}
                    onChange={handleInput('date')}
                />
            </div>

            <div className="selects input-control">
                <select value={category} onChange={handleInput('category')} required>
                    <option value="" disabled>Select Category</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank</option>
                    <option value="youtube">Youtube</option>
                    <option value="other">Other</option>
                </select>
                {category === 'other' && (
                    <input
                        type="text"
                        placeholder="Enter custom category"
                        value={customCategory}
                        onChange={handleInput('customCategory')}
                        style={{ marginTop: '0.5rem' }}
                    />
                )}
            </div>

            {category === '' && (
                <div className="input-control">
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter custom category"
                        value={category}
                        onChange={handleInput('category')}
                    />
                </div>
            )}

            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder="Add A Reference"
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                ></textarea>
            </div>

            <div className="submit-btn">
                <Button
                    name="Add Income"
                    icon={plus}
                    bPad=".8rem 1.6rem"
                    bRad="30px"
                    bg="var(--color-accent)"
                    color="#fff"
                />
            </div>
        </ExpenseFormStyled>
    );
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }

    .input-control input {
        width: 100%;
    }

    .selects {
        display: flex;
        justify-content: flex-end;

        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn button {
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover {
            background: var(--color-green) !important;
        }
    }
`;

export default ExpenseForm;
