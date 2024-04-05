import React, { useState } from 'react'
import './calendar.css'

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const days = () => {
    const daysArray = []
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null)
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i))
    }
    
    return daysArray
  }

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
  }

  const handleChangeMonth = (e) => {
    const newMonth = parseInt(e.target.value, 10)
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1))
  }

  const handleChangeYear = (e) => {
    const newYear = parseInt(e.target.value, 10)
    setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1))
  }
  //days()

  return (
    <div className='container'>
      <div className='top-container'>
        <div className='button-container'>
          <button className='arr-btns' onClick={()=>setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1,1))}>&#129176;</button>
          <select value={selectedDate.getMonth()} onChange={handleChangeMonth} >
            {months.map((month, index) => <option key={month} value={index}>{month}</option>)}
          </select>
          <select value={selectedDate.getFullYear()} onChange={handleChangeYear} >
            {Array.from({ length: 10 }, (_, i) => selectedDate.getFullYear() - 5 + i).map((year, index) => <option key={index} value={year}>{year}
            </option>)}
          </select>
          <button className='arr-btns' onClick={()=>setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,1))}>&#129178;</button>
        </div>
        <div className='weekdays-container'>
          {daysOfWeek.map(day => <div key={day}>{day}</div>)}
        </div>
      </div>
      <div className='days-container'>
        {days().map((day, index) => <div className={day ? (isSameDay(day, new Date()) ? 'days current' : "days") : "empty"} key={index}>{day ? day.getDate() : ""}</div>)}
      </div>
    </div>
  )
}

export default Calendar