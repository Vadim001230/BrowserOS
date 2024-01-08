import { useEffect, useState } from 'react';
import { weatherApiKey } from '@/components/Apps/appsConfig';
import './Weather.scss';

interface WeatherData {
  cityName: string;
  temperature: number;
  feelsLike: number;
  wind: number;
  humidity: number;
}

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('');

  const setWeather = (data: any) => setWeatherData({
    cityName: data.name,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    wind: data.wind.speed,
    humidity: data.main.humidity,
  });

  const fetchWeatherByCity = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setWeatherData(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchWeatherByCity();
    }
  };

  useEffect(() => {
    const fetchWeatherByLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}&units=metric`);
          const data = await response.json();
          setWeather(data);
          setCity(data.name);
        });
      } catch (error) {
        setWeatherData(null);
      }
    };

    fetchWeatherByLocation();
  }, []);

  return (
    <div className='weather'>
      <div>
        <label>
          Погода в городе:
          <input
            className='weather__search-input'
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
        <button onClick={fetchWeatherByCity} className='weather__update-btn'>Поиск</button>
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
