import { useState, useEffect } from "react";
import "./App.css";

function App() {
const [eventName, setEventName] = useState("My Special Event");
const [eventDate, setEventDate] = useState("");
const [timeLeft, setTimeLeft] = useState(null);

useEffect(() => {
if (!eventDate) {
setTimeLeft(null);
return;
}

```
const calculateTime = () => {
  const now = new Date();
  const target = new Date(eventDate);
  const difference = target.getTime() - now.getTime();

  if (difference <= 0) {
    setTimeLeft({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      completed: true
    });
    return;
  }

  setTimeLeft({
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    completed: false
  });
};

calculateTime();
const timer = setInterval(calculateTime, 1000);

return () => clearInterval(timer);
```

}, [eventDate]);

return ( <div className="app"> <div className="countdown-card"> <h1>🎉 Event Countdown</h1> <p className="subtitle">
Every second brings your special day closer! </p>

```
    <label>Enter Event Name</label>
    <input
      type="text"
      value={eventName}
      onChange={(e) => setEventName(e.target.value)}
      placeholder="Enter event name"
    />

    <label>Select Event Date and Time</label>
    <input
      type="datetime-local"
      value={eventDate}
      onChange={(e) => setEventDate(e.target.value)}
    />

    <h2>{eventName || "My Special Event"}</h2>

    {!eventDate ? (
      <p className="message">
        📅 Select your event date to start the countdown!
      </p>
    ) : timeLeft?.completed ? (
      <p className="message">🎊 The event time has arrived!</p>
    ) : timeLeft ? (
      <div className="timer">
        <div className="time-box">
          <span>{timeLeft.days}</span>
          <p>Days</p>
        </div>

        <div className="time-box">
          <span>{String(timeLeft.hours).padStart(2, "0")}</span>
          <p>Hours</p>
        </div>

        <div className="time-box">
          <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
          <p>Minutes</p>
        </div>

        <div className="time-box">
          <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
          <p>Seconds</p>
        </div>
      </div>
    ) : null}

    <p className="footer">✨ Make every moment count! ✨</p>
  </div>
</div>


);
}

export default App;
