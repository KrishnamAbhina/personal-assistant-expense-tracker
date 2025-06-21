import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalcontext';

function History() {
    const { transactionHistory } = useGlobalContext();
    const history = transactionHistory();

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const { _id, title, amount, type } = item;
                const isExpense = type === 'expense';
                return (
                    <div key={_id} className="history-item">
                        <p
                            style={{
                                color: isExpense ? 'red' : 'var(--color-green)',
                                fontWeight: 'bold',
                            }}
                        >
                            {title}
                        </p>
                        <p
                            style={{
                                color: isExpense ? 'red' : 'var(--color-green)',
                            }}
                        >
                            {isExpense
                                ? `-₹${amount <= 0 ? 0 : amount}`
                                : `+₹${amount <= 0 ? 0 : amount}`}
                        </p>
                    </div>
                );
            })}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
        font-size: 1.5rem;
        color: #2c2c6c;
        margin-bottom: 1rem;
    }

    .history-item {
        background: #fdf9f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.02);
        }

        p {
            margin: 0;
            font-size: 1rem;
        }
    }
`;

export default History;
