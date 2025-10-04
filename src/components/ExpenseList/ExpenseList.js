import React from "react";
import styles from "./ExpenseList.module.css";
import Transaction from "../Transaction/Transaction";

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  return (
    <div className={styles.expenseListContainer}>
      <h3>Transactions</h3>
      <ul className={styles.transactionList}>
        {expenses.length === 0 ? (
          <li style={{ color: "#888" }}>No transactions yet.</li>
        ) : (
          expenses.map((expense, idx) => (
            <Transaction
              key={expense.id}
              expense={expense}
              index={idx}
              onDelete={() => onDeleteExpense(expense.id)}
              onEdit={() => onEditExpense(expense)}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;
