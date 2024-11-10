import React from 'react';


const CountryRegionSelect = ({ onCountryChange, onRegionChange, onHolidayTypeChange, holidays = [], region, holidayType }) => {
    const countries = ['Almanya'];
    const regions = ['Berlin', 'Bavaria', 'Hamburg', 'Hesse'];
    const holidayTypes = holidays.length ? [...new Set(holidays.map((holiday) => holiday.holiday_type))] : [];

    return (
        <div className="country-region-select">
            <div>
                <label>Ülke:</label>
                <select onChange={(e) => onCountryChange(e.target.value)} value={countries[0]}>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Eyalet:</label>
                <select onChange={(e) => onRegionChange(e.target.value)} value={region}>
                    {regions.map((region, index) => (
                        <option key={index} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Tatil Türü:</label>
                <select onChange={(e) => onHolidayTypeChange(e.target.value)} value={holidayType}>
                    <option value="">Tümü</option>
                    {holidayTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CountryRegionSelect;
