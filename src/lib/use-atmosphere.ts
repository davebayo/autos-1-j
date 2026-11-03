import { useState, useEffect } from 'react';

// Open-Meteo API endpoint
const API_URL = 'https://api.open-meteo.com/v1/forecast';

type Location = 'Lagos' | 'Vaughan';

interface WeatherState {
  condition: 'clear' | 'rain' | 'snow' | 'dust';
  temperature: number;
  timeOfDay: 'DAY' | 'DUSK' | 'NIGHT';
}

export function useAtmosphere(location: Location = 'Lagos') {
  const [weather, setWeather] = useState<WeatherState>({ condition: 'clear', temperature: 20, timeOfDay: 'DAY' });
  const [isLoading, setIsLoading] = useState(true);
  const [manualOverride, setManualOverride] = useState<WeatherState['timeOfDay'] | null>(null);

  const cycleManualOverride = () => {
    setManualOverride((prev) => {
      if (prev === null) return 'DAY';
      if (prev === 'DAY') return 'DUSK';
      if (prev === 'DUSK') return 'NIGHT';
      return null;
    });
  };

  useEffect(() => {
    async function fetchWeather() {
      setIsLoading(true);
      try {
        let lat = 6.4541, lon = 3.3947; // Lagos by default
        if (location === 'Vaughan') {
          lat = 43.7955;
          lon = -79.5284;
        }

        const res = await fetch(`${API_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`);
        if (!res.ok) throw new Error('Weather fetch failed');

        const data = await res.json();
        const code = data.current_weather.weathercode;
        const temp = data.current_weather.temperature;

        let condition: WeatherState['condition'] = 'clear';
        // Open-Meteo weather codes
        if (code >= 51 && code <= 67) condition = 'rain';
        else if (code >= 71 && code <= 86) condition = 'snow';
        else if (code >= 95) condition = 'rain'; // Thunderstorm with rain

        const isDay = data.current_weather.is_day === 1;
        // Approximation for Dusk based on time (would normally use sunrise/sunset API)
        const hour = new Date(data.current_weather.time).getHours();
        let timeOfDay: WeatherState['timeOfDay'] = isDay ? 'DAY' : 'NIGHT';
        if (hour >= 17 && hour <= 19) {
          timeOfDay = 'DUSK';
        } else if (hour >= 5 && hour <= 7) {
          timeOfDay = 'DUSK'; // Dawn can also be treated as Dusk visually
        }

        setWeather({ condition, temperature: temp, timeOfDay });
      } catch (error) {
        console.error('Failed to fetch weather, using fallback:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location]);

  return {
    weather: {
      ...weather,
      timeOfDay: manualOverride || weather.timeOfDay
    },
    isLoading,
    cycleManualOverride,
    manualOverride
  };
}
