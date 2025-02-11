import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
  const [notes, setNotes] = useState({});

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

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const daysInMonth = getDaysInMonth(currentYear, currentDate.getMonth());

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleSaveNote = (e, day) => {
    const newNotes = { ...notes, [day]: e.target.value };
    setNotes(newNotes);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentDate.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentYear - 1, currentDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentYear + 1, currentDate.getMonth(), 1));
  };

  return (
    <div className="container">
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
            >
              <div className="day-number">{i + 1}</div>
              <div className="note-thumbnail">
                {notes[i + 1] ? notes[i + 1].substring(0, 10) + "..." : ""}
              </div>
              {selectedDate === i + 1 && (
                <textarea
                  value={notes[i + 1] || ""}
                  onChange={(e) => handleSaveNote(e, i + 1)}
                  placeholder="Add a note"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
