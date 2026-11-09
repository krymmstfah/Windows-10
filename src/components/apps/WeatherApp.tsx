import React, { useState } from 'react';
import { 
  CloudSun, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Eye, 
  Compass, 
  Thermometer, 
  MapPin 
} from 'lucide-react';

interface CityWeather {
  name: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  windDir: string;
  visibility: number;
  uvIndex: number;
  hourly: { time: string; temp: number; icon: 'sun' | 'cloud' | 'rain' }[];
  daily: { day: string; high: number; low: number; condition: string; icon: 'sun' | 'cloud' | 'rain' }[];
}

const CITIES: Record<string, CityWeather> = {
  Redmond: {
    name: 'Redmond, WA',
    temp: 64,
    condition: 'Partly Cloudy',
    high: 68,
    low: 51,
    humidity: 62,
    windSpeed: 7,
    windDir: 'NNW',
    visibility: 10,
    uvIndex: 4,
    hourly: [
      { time: 'Now', temp: 64, icon: 'cloud' },
      { time: '1 PM', temp: 66, icon: 'sun' },
      { time: '2 PM', temp: 68, icon: 'sun' },
      { time: '3 PM', temp: 67, icon: 'cloud' },
      { time: '4 PM', temp: 65, icon: 'cloud' },
      { time: '5 PM', temp: 63, icon: 'rain' },
      { time: '6 PM', temp: 60, icon: 'rain' },
      { time: '7 PM', temp: 58, icon: 'cloud' },
    ],
    daily: [
      { day: 'Today', high: 68, low: 51, condition: 'Partly Cloudy', icon: 'cloud' },
      { day: 'Mon', high: 65, low: 49, condition: 'Light Rain', icon: 'rain' },
      { day: 'Tue', high: 62, low: 48, condition: 'Showers', icon: 'rain' },
      { day: 'Wed', high: 66, low: 52, condition: 'Mostly Sunny', icon: 'sun' },
      { day: 'Thu', high: 71, low: 54, condition: 'Sunny & Clear', icon: 'sun' },
      { day: 'Fri', high: 70, low: 53, condition: 'Sunny', icon: 'sun' },
      { day: 'Sat', high: 67, low: 50, condition: 'Partly Cloudy', icon: 'cloud' },
    ]
  },
  Cairo: {
    name: 'Cairo, Egypt',
    temp: 79,
    condition: 'Sunny & Clear',
    high: 84,
    low: 62,
    humidity: 45,
    windSpeed: 11,
    windDir: 'NE',
    visibility: 9,
    uvIndex: 7,
    hourly: [
      { time: 'Now', temp: 79, icon: 'sun' },
      { time: '1 PM', temp: 82, icon: 'sun' },
      { time: '2 PM', temp: 84, icon: 'sun' },
      { time: '3 PM', temp: 83, icon: 'sun' },
      { time: '4 PM', temp: 80, icon: 'sun' },
      { time: '5 PM', temp: 77, icon: 'sun' },
      { time: '6 PM', temp: 73, icon: 'sun' },
      { time: '7 PM', temp: 70, icon: 'sun' },
    ],
    daily: [
      { day: 'Today', high: 84, low: 62, condition: 'Sunny', icon: 'sun' },
      { day: 'Mon', high: 86, low: 64, condition: 'Sunny', icon: 'sun' },
      { day: 'Tue', high: 85, low: 63, condition: 'Sunny', icon: 'sun' },
      { day: 'Wed', high: 82, low: 61, condition: 'Clear', icon: 'sun' },
      { day: 'Thu', high: 81, low: 60, condition: 'Partly Cloudy', icon: 'cloud' },
      { day: 'Fri', high: 83, low: 62, condition: 'Sunny', icon: 'sun' },
      { day: 'Sat', high: 85, low: 64, condition: 'Sunny', icon: 'sun' },
    ]
  },
  London: {
    name: 'London, UK',
    temp: 57,
    condition: 'Drizzle',
    high: 61,
    low: 48,
    humidity: 82,
    windSpeed: 14,
    windDir: 'SW',
    visibility: 6,
    uvIndex: 2,
    hourly: [
      { time: 'Now', temp: 57, icon: 'rain' },
      { time: '1 PM', temp: 59, icon: 'rain' },
      { time: '2 PM', temp: 61, icon: 'cloud' },
      { time: '3 PM', temp: 60, icon: 'cloud' },
      { time: '4 PM', temp: 58, icon: 'rain' },
      { time: '5 PM', temp: 56, icon: 'rain' },
      { time: '6 PM', temp: 54, icon: 'cloud' },
      { time: '7 PM', temp: 52, icon: 'cloud' },
    ],
    daily: [
      { day: 'Today', high: 61, low: 48, condition: 'Drizzle', icon: 'rain' },
      { day: 'Mon', high: 59, low: 46, condition: 'Rain', icon: 'rain' },
      { day: 'Tue', high: 63, low: 49, condition: 'Cloudy', icon: 'cloud' },
      { day: 'Wed', high: 65, low: 51, condition: 'Partly Sunny', icon: 'sun' },
      { day: 'Thu', high: 62, low: 47, condition: 'Showers', icon: 'rain' },
      { day: 'Fri', high: 60, low: 45, condition: 'Cloudy', icon: 'cloud' },
      { day: 'Sat', high: 64, low: 48, condition: 'Sunny intervals', icon: 'sun' },
    ]
  }
};

export const WeatherApp: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Redmond');
  const city = CITIES[selectedCity] || CITIES.Redmond;

  const renderIcon = (type: 'sun' | 'cloud' | 'rain', size: number = 24) => {
    switch (type) {
      case 'sun': return <Sun size={size} className="text-amber-400" />;
      case 'rain': return <CloudRain size={size} className="text-cyan-400" />;
      default: return <CloudSun size={size} className="text-blue-300" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0e3b6e] to-[#1a202c] text-white select-none overflow-y-auto p-4 space-y-4 text-xs">
      {/* Top Header with City Selection */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-cyan-400" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-white/10 border border-white/20 rounded px-2.5 py-1 text-xs text-white font-medium outline-none focus:border-cyan-400"
          >
            <option value="Redmond" className="bg-[#1a202c]">Redmond, WA</option>
            <option value="Cairo" className="bg-[#1a202c]">Cairo, Egypt</option>
            <option value="London" className="bg-[#1a202c]">London, UK</option>
          </select>
        </div>

        <span className="text-white/60 text-[11px]">Updated 5 mins ago</span>
      </div>

      {/* Hero Weather Summary */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
        <div>
          <div className="text-4xl sm:text-5xl font-light tracking-tight">{city.temp}°</div>
          <div className="text-sm font-medium text-white/90 mt-1">{city.condition}</div>
          <div className="text-[11px] text-white/60">
            H: {city.high}° · L: {city.low}°
          </div>
        </div>
        <div className="p-3 bg-white/10 rounded-full">
          <CloudSun size={48} className="text-amber-300" />
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md">
        <div className="text-[11px] font-semibold text-white/60 uppercase tracking-wider mb-2">Hourly Forecast</div>
        <div className="flex gap-4 overflow-x-auto pb-1">
          {city.hourly.map((h, i) => (
            <div key={i} className="flex flex-col items-center min-w-[50px] space-y-1.5">
              <span className="text-[10px] text-white/70">{h.time}</span>
              {renderIcon(h.icon, 20)}
              <span className="font-semibold text-xs">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md space-y-2">
        <div className="text-[11px] font-semibold text-white/60 uppercase tracking-wider mb-1">7-Day Forecast</div>
        {city.daily.map((d, i) => (
          <div key={i} className="flex items-center justify-between py-1 border-b border-white/5 last:border-none">
            <span className="w-16 font-medium text-white/90">{d.day}</span>
            <div className="flex items-center gap-2 flex-1 justify-center">
              {renderIcon(d.icon, 16)}
              <span className="text-[11px] text-white/70 truncate">{d.condition}</span>
            </div>
            <div className="w-20 text-right font-mono">
              <span className="font-semibold">{d.high}°</span>
              <span className="text-white/50 ml-2">{d.low}°</span>
            </div>
          </div>
        ))}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-white/60 text-[10px] mb-1">
            <Droplets size={13} className="text-cyan-400" />
            <span>Humidity</span>
          </div>
          <div className="text-base font-semibold">{city.humidity}%</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-white/60 text-[10px] mb-1">
            <Wind size={13} className="text-blue-300" />
            <span>Wind</span>
          </div>
          <div className="text-base font-semibold">{city.windSpeed} mph {city.windDir}</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-white/60 text-[10px] mb-1">
            <Sun size={13} className="text-amber-400" />
            <span>UV Index</span>
          </div>
          <div className="text-base font-semibold">{city.uvIndex} of 10</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-white/60 text-[10px] mb-1">
            <Eye size={13} className="text-emerald-400" />
            <span>Visibility</span>
          </div>
          <div className="text-base font-semibold">{city.visibility} mi</div>
        </div>
      </div>
    </div>
  );
};
