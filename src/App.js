import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  // Add or update expense handler
  const addOrUpdateExpense = (expense) => {
    if (editingExpense) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) =>
          exp.id === editingExpense.id ? { ...exp, ...expense } : exp
        )
      );
      setEditingExpense(null);
    } else {
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        { ...expense, id: Date.now() + Math.random() },
      ]);
    }
  };

  // Delete expense handler
  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
    if (editingExpense && editingExpense.id === id) setEditingExpense(null);
  };

  // Start editing handler
  const startEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  // Cancel editing handler
  const cancelEdit = () => setEditingExpense(null);

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <div className="appWrapper">
          <div className="content">
            <ExpenseForm
              onAddExpense={addOrUpdateExpense}
              editingExpense={editingExpense}
              onCancelEdit={cancelEdit}
            />
            <div className="expenseContainer">
              <ExpenseInfo expenses={expenses} />
              <ExpenseList
                expenses={expenses}
                onDeleteExpense={deleteExpense}
                onEditExpense={startEditExpense}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
