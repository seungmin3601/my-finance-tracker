import { useState } from "react";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("spending");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactionDate, setTransactionDate] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentYear, currentDate.getMonth());

  const handleDateClick = (day) => setSelectedDate(day);

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentYear - 1, currentDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentYear + 1, currentDate.getMonth(), 1));
  };

  const handleAddTransaction = () => {
    if (!amount || isNaN(amount)) return;

    const newAmount = parseFloat(amount);
    const newTransaction = {
      id: Date.now(),
      type,
      description,
      amount: newAmount,
      date: new Date(transactionDate),
    };

    setTransactions([...transactions, newTransaction]);
    setBalance(type === "spending" ? balance - newAmount : balance + newAmount);

    setAmount("");
    setDescription("");
  };

  const getWeeklyTotals = () => {
    const totals = {};
    transactions.forEach(({ amount, type, date }) => {
      const transactionDate = new Date(date);
      const weekStart = new Date(transactionDate);
      weekStart.setDate(transactionDate.getDate() - transactionDate.getDay());
      const weekKey = `${
        monthNames[weekStart.getMonth()]
      } ${weekStart.getDate()} - ${weekStart.getDate() + 6}`;
      if (!totals[weekKey]) totals[weekKey] = 0;
      totals[weekKey] += type === "spending" ? -amount : amount;
    });
    return totals;
  };

  const weeklyTotals = getWeeklyTotals();

  return (
    <div className="container">
      <div className="calendar-section">
        <h1>{`${currentMonth} ${currentYear}`}</h1>
        <div className="calendar-controls">
          <button onClick={handlePrevYear}>{"<<"}</button>
          <button onClick={handlePrevMonth}>{"<"}</button>
          <button onClick={handleNextMonth}>{">"}</button>
          <button onClick={handleNextYear}>{">>"}</button>
        </div>
        <div className="calendar">
          <div className="grid">
            {[...Array(daysInMonth)].map((_, i) => (
              <div
                key={i + 1}
                className={`day ${selectedDate === i + 1 ? "selected" : ""}`}
                onClick={() => handleDateClick(i + 1)}
                role="button"
                tabIndex={0}
              >
                <div className="day-number">{i + 1}</div>
                {transactions
                  .filter((t) => new Date(t.date).getDate() === i + 1)
                  .map((t, index) => (
                    <div key={index} className={t.type}>
                      {t.type === "spending" ? "-" : "+"}${t.amount.toFixed(2)}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        <div className="weekly-totals">
          {Object.entries(weeklyTotals).map(([week, total]) => (
            <p key={week}>{`${week}: $${total.toFixed(2)}`}</p>
          ))}
        </div>
      </div>

      <div className="transaction-section">
        <h2>Transaction Tracker</h2>
        <p>
          <strong>Balance:</strong> ${balance.toFixed(2)}
        </p>

        <div className="transaction-form">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
          <input
            type="date"
            value={transactionDate.toISOString().split("T")[0]}
            onChange={(e) => setTransactionDate(new Date(e.target.value))}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="spending">Spending</option>
            <option value="deposit">Deposit</option>
          </select>
          <button onClick={handleAddTransaction}>Add</button>
        </div>

        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className={transaction.type}>
              {transaction.type === "spending" ? "-" : "+"}$
              {transaction.amount.toFixed(2)} - {transaction.description} (
              {new Date(transaction.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
