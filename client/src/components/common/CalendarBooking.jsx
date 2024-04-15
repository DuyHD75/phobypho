import React, { useState, useRef, useEffect } from 'react';

const monthNames = [
     'January',
     'February',
     'March',
     'April',
     'May',
     'June',
     'July',
     'August',
     'September',
     'October',
     'November',
     'December',
];

const isLeapYear = (year) => {
     return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
};

const getFebDays = (year) => {
     return isLeapYear(year) ? 29 : 28;
};

const Calendar = () => {
     const [month, setMonth] = useState(new Date().getMonth());
     const [year, setYear] = useState(new Date().getFullYear());
     const calendarRef = useRef(null);

     const generateCalendar = () => {
          const calendarDays = calendarRef.current.querySelector('.calendar-days');
          const calendarHeaderYear = calendarRef.current.querySelector('#year');

          const daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          calendarDays.innerHTML = '';

          const firstDay = new Date(year, month, 1);

          for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
               const day = document.createElement('div');
               if (i >= firstDay.getDay()) {
                    day.classList.add('calendar-day-hover');
                    day.innerHTML = i - firstDay.getDay() + 1;
                    day.innerHTML += `<span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>`;
                    if (i - firstDay.getDay() + 1 === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                         day.classList.add('curr-date');
                    }
               }
               calendarDays.appendChild(day);
          }
     };

     useEffect(() => {
          generateCalendar();
     }, [month, year]);

     const handleMonthChange = (newMonth) => {
          setMonth(newMonth);
     };

     const handleYearChange = (newYear) => {
          setYear(newYear);
     };

     const toggleMonthList = () => {
          // Implement logic to toggle month list visibility (e.g., using a state variable)
     };

     const handlePrevYear = () => {
          setYear(year - 1);
     };

     const handleNextYear = () => {
          setYear(year + 1);
     };


     return (
          <div class="calendar" ref={calendarRef}>
               <div class="calendar-header">
                    <span class="month-picker" id="month-picker">{monthNames[month]}</span>
                    <div class="year-picker">
                         <span class="year-change" id="prev-year">
                              <pre>Prev</pre>
                         </span>
                         <span id="year">2021</span>
                         <span class="year-change" id="next-year">
                              <pre>Next</pre>
                         </span>
                    </div>
               </div>
               <div class="calendar-body">
                    <div class="calendar-week-day">
                         <div>Sun</div>
                         <div>Mon</div>
                         <div>Tue</div>
                         <div>Wed</div>
                         <div>Thu</div>
                         <div>Fri</div>
                         <div>Sat</div>
                    </div>
                    <div class="calendar-days"></div>
               </div>

          </div>
     );
};

export default Calendar;