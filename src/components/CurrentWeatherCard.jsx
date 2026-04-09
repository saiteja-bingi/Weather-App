import React from 'react'

const CurrentWeatherCard = (props) => {
  const { data, city } = props;

  if (!data || !data.main) return null;

  const iconUrl = data.weather && data.weather[0] 
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` 
    : null;

  return (
    <div className="container mt-4 mb-5">
      <div className="weather-container mx-auto">
        <h2 className="weather-title h1">Current Weather in {city}</h2>
        
        <div className="weather-pro-card">
          {iconUrl && (
            <img 
              src={iconUrl} 
              alt={data.weather[0].description} 
              className="weather-icon"
            />
          )}
          <div className="weather-temp">
            {Math.round(data.main.temp)}&deg;
          </div>
          <p className="weather-desc">
            {data.weather[0].description}
          </p>
          
          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{data.main.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind</span>
              <span className="detail-value">{Math.round(data.wind?.speed || 0)} m/s</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Feels Like</span>
              <span className="detail-value">{Math.round(data.main.feels_like)}&deg;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeatherCard