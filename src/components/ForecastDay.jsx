import React from 'react'

const ForecastDay = (props) => {
  const { day } = props;

  if (!day) return null;

  // Convert Unix timestamp to Date object
  const dateObj = new Date(day.dt * 1000);
  
  // Format date (e.g., "Mon, Mar 15")
  const dateStr = dateObj.toLocaleDateString([], { 
    weekday: 'short', month: 'short', day: 'numeric' 
  });
  
  // Format time (e.g., "10:00 AM")
  const timeStr = dateObj.toLocaleTimeString([], { 
    hour: '2-digit', minute: '2-digit' 
  });

  const iconUrl = day.weather && day.weather[0] 
    ? `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` 
    : null;

  return (
    <div className="forecast-day">
      <div className="forecast-time">
        <div style={{opacity: 0.9}}>{dateStr}</div>
        <div style={{fontSize: '0.8rem', opacity: 0.7}}>{timeStr}</div>
      </div>
      
      {iconUrl && (
        <img 
          src={iconUrl} 
          alt={day.weather[0].description} 
          className="forecast-icon"
        />
      )}
      
      <div className="forecast-temp">
        {Math.round(day.main.temp)}&deg;
      </div>
      
      <div className="forecast-desc" style={{fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.85, textTransform: 'capitalize'}}>
        {day.weather[0].description}
      </div>
      
      <div style={{fontSize: '0.8rem', opacity: 0.7}}>
        H: {day.main.humidity}%
      </div>
    </div>
  )
}

export default ForecastDay