import { useRef, useEffect, useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ onAddExpense, editingExpense, onCancelEdit }) => {
  const [collapsed, setCollapsed] = useState(false);
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  useEffect(() => {
    if (editingExpense) {
      expenseTextInput.current.value = editingExpense.text;
      expenseAmountInput.current.value = editingExpense.amount;
      // ensure form is expanded when editing
      setCollapsed(false);
    } else {
      expenseTextInput.current.value = "";
      expenseAmountInput.current.value = "";
    }
  }, [editingExpense]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const text = expenseTextInput.current.value.trim();
    const amount = Number(expenseAmountInput.current.value);
    if (!text || isNaN(amount) || amount === 0) return;
    onAddExpense({ text, amount });
    expenseTextInput.current.value = "";
    expenseAmountInput.current.value = "";
  };

  return (
    <div className={styles.formWrapper}>
      {/* Toggle button shown on mobile via CSS */}
      <button
        type="button"
        aria-expanded={!collapsed}
        className={styles.toggleBtn}
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? "Show form" : "Hide form"}
      </button>

      <form
        className={`${styles.form} ${collapsed ? styles.collapsed : ""}`}
        onSubmit={onSubmitHandler}
      >
        <h3>{editingExpense ? "Edit transaction" : "Add new transaction"}</h3>
        <label htmlFor="expenseText">Text</label>
        <input
          id="expenseText"
          className={styles.input}
          type="text"
          placeholder="Enter text..."
          ref={expenseTextInput}
          required
        />
        <div>
          <label htmlFor="expenseAmount">Amount</label>
          <div>(negative - expense,positive-income)</div>
        </div>
        <input
          className={styles.input}
          id="expenseAmount"
          type="number"
          inputMode="numeric"
          placeholder="Enter amount..."
          ref={expenseAmountInput}
          required
        />
        <button className={styles.submitBtn}>
          {editingExpense ? "Update Transaction" : "Add Transaction"}
        </button>
        {editingExpense && (
          <button
            type="button"
            className={`${styles.submitBtn} ${styles.cancelBtn}`}
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
