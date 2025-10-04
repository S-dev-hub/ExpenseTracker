import React from "react";
import styles from "./ExpenseInfo.module.css";

const ExpenseInfo = ({ expenses }) => {
  const amounts = expenses.map((exp) => exp.amount);
  const balance = amounts.reduce((acc, val) => acc + val, 0);
  const income = amounts
    .filter((a) => a > 0)
    .reduce((acc, val) => acc + val, 0);
  const expense = amounts
    .filter((a) => a < 0)
    .reduce((acc, val) => acc + val, 0);
  return (
    <div className={styles.expenseInfoContainer}>
      <div className={styles.balance}>
        <h4>YOUR BALANCE</h4>
        <h1>${balance.toFixed(2)}</h1>
      </div>
      <div className={styles.incomeExpenseContainer}>
        <div>
          <h4>Income</h4>
          <p id="money-plus" className={`${styles.money} ${styles.plus}`}>
            +${income.toFixed(2)}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className={`${styles.money} ${styles.minus}`}>
            -${Math.abs(expense).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseInfo;
