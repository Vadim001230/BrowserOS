import { useEffect, useState } from 'react';
import './Weather.scss';

interface WeatherData {
  cityName: string;
  temperature: number;
  feelsLike: number;
  wind: number;
  humidity: number;
}

const apiKey = '228478b7106e0d3eb8311cb24df1323b';

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('Grodno');

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      setWeatherData({
        cityName: data.name,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        wind: data.wind.speed,
        humidity: data.main.humidity,
      });
    } catch (error) {
      setWeatherData(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className='weather'>
      <div>
        <label>
          Погода в городе:
          <input
            className='weather__search-input'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
        <button onClick={fetchWeather} className='weather__update-btn'>Поиск</button>
      </div>
      {weatherData && (
        <div className='weather__info'>
          <p>{weatherData.cityName}</p>
          <p>Температура: {weatherData.temperature}°C</p>
          <p>Ощущается как: {weatherData.feelsLike}°C</p>
          <p>Скорость ветра: {weatherData.wind} м/с</p>
          <p>Влажность: {weatherData.humidity}%</p>
        </div>
      )}
    </div>
  );
};
