import { useEffect, useState } from 'react';
import './Weather.scss';

interface WeatherData {
  temperature: number;
  feelsLike: number;
  wind: number;
  humidity: number;
}

const apiKey = '228478b7106e0d3eb8311cb24df1323b';

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('Hrodna');

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

      if (!response.ok) {
        throw new Error('Error fetch');
      }

      const data = await response.json();

      setWeatherData({
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
      <div className='weather__container'>
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
          <p className='weather__value'>Температура: {weatherData.temperature}°C</p>
          <p className='weather__value'>Ощущается как: {weatherData.feelsLike}°C</p>
          <p className='weather__value'>Скорость ветра: {weatherData.wind} м/с</p>
          <p className='weather__value'>Влажность: {weatherData.humidity}%</p>
        </div>
      )}
    </div>
  );
};
