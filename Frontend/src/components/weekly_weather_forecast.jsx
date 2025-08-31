import { format, parseISO } from "date-fns";
import "./WeeklyForecast.css";

const WeeklyForecast = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="weekly-card">
      <h3 className="weekly-title">7-Day Forecast</h3>
      <div className="weekly-list">
        {data.map((day, index) => (
          <div className="weekly-item" key={index}>
            {/* Day Name */}
            <div className="weekly-day">{format(parseISO(day.date), "EEE")}</div>

            {/* Weather Condition */}
            <div className="weekly-condition">
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="weekly-icon"
              />
              <span className="weekly-text">{day.day.condition.text}</span>
            </div>

            {/* Rain chance */}
            <div className="weekly-rain">💧 {day.day.daily_chance_of_rain}%</div>

            {/* Temperature */}
            <div className="weekly-temp">
              <span className="max">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="min">{Math.round(day.day.mintemp_c)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
