import { useState } from "react";
import { FiCalendar, FiPlus, FiTrash2 } from "react-icons/fi";
import "../styles/auth.css";

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [eventText, setEventText] = useState("");

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleAddEvent = () => {
    if (!selectedDate || !eventText.trim()) return;

    setEvents((prev) => ({
      ...prev,
      [selectedDate]: [
        ...(prev[selectedDate] || []),
        eventText,
      ],
    }));

    setEventText("");
  };

  const handleDeleteEvent = (dateKey, index) => {
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((_, i) => i !== index),
    }));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>Calendar</h1>
        <p>Plan your outfits and fashion events</p>
      </div>

      <div className="calendar-main">
        {/* Calendar Grid */}
        <div className="calendar-section">
          <div className="month-header">
            <button className="month-nav" onClick={handlePrevMonth}>
              ←
            </button>
            <h2>{monthName}</h2>
            <button className="month-nav" onClick={handleNextMonth}>
              →
            </button>
          </div>

          <div className="weekdays">
            <div className="weekday">Sun</div>
            <div className="weekday">Mon</div>
            <div className="weekday">Tue</div>
            <div className="weekday">Wed</div>
            <div className="weekday">Thu</div>
            <div className="weekday">Fri</div>
            <div className="weekday">Sat</div>
          </div>

          <div className="calendar-grid">
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const dateKey = `${currentMonth.getMonth() + 1}-${day}`;
              const hasEvents = events[dateKey]?.length > 0;

              return (
                <div
                  key={day}
                  className={`calendar-day ${selectedDate === dateKey ? "selected" : ""} ${
                    hasEvents ? "has-events" : ""
                  }`}
                  onClick={() => setSelectedDate(dateKey)}
                >
                  <span className="day-number">{day}</span>
                  {hasEvents && <span className="event-indicator">●</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Section */}
        {selectedDate && (
          <div className="event-section">
            <h3>Events for {selectedDate}</h3>

            <div className="event-input-group">
              <input
                type="text"
                placeholder="Add event (e.g. Party Outfit)"
                value={eventText}
                onChange={(e) => setEventText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddEvent();
                }}
                className="event-input"
              />
              <button className="event-add-btn" onClick={handleAddEvent}>
                <FiPlus /> Add
              </button>
            </div>

            <div className="events-list">
              {events[selectedDate]?.length > 0 ? (
                events[selectedDate].map((event, i) => (
                  <div key={i} className="event-item">
                    <span>{event}</span>
                    <button
                      className="event-delete-btn"
                      onClick={() => handleDeleteEvent(selectedDate, i)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-events">No events yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
