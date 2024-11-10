import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './HolidayCalendar.css';

const HolidayCalendar = ({ holidays, holidayType }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    const isHoliday = (date) => {
        return filteredHolidays.some((holiday) => {
            return new Date(holiday.date).toDateString() === date.toDateString();
        });
    };

    // Tatilleri seçilen tatil türüne göre filtreler
    const filteredHolidays = holidays.filter(
        (holiday) => !holidayType || holiday.holiday_type === holidayType
    );

    return (
        <div class="calendar">

            <h2>Tatil Takvimi</h2>

            <Calendar
                onChange={onDateChange}
                value={selectedDate}
                tileContent={({ date, view }) =>
                    view === 'month' && isHoliday(date) ? <div className="holiday-dot"></div> : null
                }
            />

            <div>
                {filteredHolidays.filter((holiday) => new Date(holiday.date).toDateString() === selectedDate.toDateString()).length > 0 ? (
                    <ul>
                        {filteredHolidays
                            .filter((holiday) => new Date(holiday.date).toDateString() === selectedDate.toDateString())
                            .map((holiday, index) => (
                                <li key={index}>
                                    {holiday.name} ({holiday.holiday_type})
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p>Bu tarihte tatil yok.</p>
                )}
            </div>
        </div>
    );
};

export default HolidayCalendar;
