import SearchBar from "./SearchBar"
import CurrentWeatherCard from "./CurrentWeatherCard"
import ForecastDay from "./ForecastDay"
import { useState,useEffect } from "react"

const WeatherPage = () => {
    const [curWeather,setCurWeather]=useState(null)
    const [forecastData,setForecastData]=useState(null)
    const [city,setCity]=useState("Hyderabad")
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(false)

    // API key
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const curWeatherUrl='https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
    const foreCastDayUrl='https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}'
    // fetch data from 2 APIs

    // hadle search by city
    const handleSearch=(city)=>{
        setCity(city)
        setCurWeather(null)
        setForecastData(null)
        setError(null)
    }
    
    const fetchData=async()=>{
        setIsLoading(true)
        setError(null)
        try{
            // featch current weather
            const curRes=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            // fetch forecast data
            const foreRes=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)

            // check res
            if(curRes.status!=200&&foreRes.status!=200){
                throw new Error("city not found")
            }
            // parse data
            const curData=await curRes.json()
            const foreData=await foreRes.json()

            // console.log(curData)
            // console.log(foreData)

            // update state
            setCurWeather(curData)
            setForecastData(foreData)
        }
        catch(err){
            setError("Failed to fetch data from city")
            setCurWeather(null)
            setForecastData(null)
        }
        finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        fetchData()
    },[city])

  return (
    <div className="container">
        <SearchBar onSearch={handleSearch} isLoading={isLoading}/>
        {/* pass current data as prop only if it is not null */}
        {curWeather&&<CurrentWeatherCard data={curWeather} city={city}/>}

        {/* error */}
        {
            error && (
              <div className="error-container mx-auto mt-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                </svg>
                <span>{error}</span>
              </div>
            )
        }
        {/* pass forecast data as prop only if it is not null */}
        <div className="forecast-container">
        {
            forecastData&&forecastData.list.map((foreccastObj,index)=><ForecastDay day={foreccastObj} city={city} key={index}/>)
        }
        </div>
    </div>
  )
}

export default WeatherPage