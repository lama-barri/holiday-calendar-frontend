import React, { useState, useEffect } from 'react';
import CountryRegionSelect from './CountryRegionSelect';
import HolidayCalendar from './HolidayCalendar';
import axios from 'axios';

const App = () => {
  const [country, setCountry] = useState('Almanya');
  const [region, setRegion] = useState('Berlin');
  const [holidayType, setHolidayType] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get('http://localhost:5000/holidays', {
          params: {
            country: country,
            region: region,
          },
        });
        setHolidays(response.data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, [country, region]);

  const toggleView = () => {
    setShowList(!showList);
  };

  return (

    <div>
      <div class="app-container">

        <h1 class="title">Almanya Tatil Takvimi</h1>
      </div>

      <div class="app-container">

        <div class="filter-section">
          <CountryRegionSelect
            onCountryChange={setCountry}
            onRegionChange={setRegion}
            onHolidayTypeChange={setHolidayType}
            holidays={holidays}
            region={region}
            holidayType={holidayType}
          />

          <button onClick={toggleView} className="btn">
            {showList ? 'Takvimi Göster' : 'Tatil Listesini Göster'}
          </button>

        </div>
        <div class="holiday-list">
          <div className="content-container">

            {showList ? (
              <div className="holiday-list">
                <h2>Tatil Listesi</h2>
                <ul>
                  {holidays
                    .filter((holiday) => !holidayType || holiday.holiday_type === holidayType)
                    .map((holiday, index) => (
                      <li key={index}>
                        {holiday.name} ({holiday.holiday_type}) - {new Date(holiday.date).toLocaleDateString()}
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <HolidayCalendar
                country={country}
                region={region}
                holidayType={holidayType}
                holidays={holidays}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
