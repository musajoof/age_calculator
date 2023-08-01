import React, { useState } from 'react';
import Icon from './assets/images/icon-arrow.svg'
import './index.css';

const Calculator = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [years, setYears] = useState('--');
  const [months, setMonths] = useState('--');
  const [days, setDays] = useState('--');
  const [error, setError] = useState();

  const [min, max] = useState(0)

  const calculateAge = () => {
    const birthDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    const diff = currentDate - birthDate;
    const ageDate = new Date(diff);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
    return { years, months, days };
  };
  
  function style(error) {
    if (error) {
      return {
        backgroundColor: "rgba(255, 0, 0, 0.5)" 
        // Or any other style you prefer
      };
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!day || !month || !year) {
      // If any of the fields is empty, show error message
      setError("Please fill the field");
      return;
    }

    
  
    const { years, months, days } = calculateAge();
    setYears(Number.isNaN(years) ? '--' : years);
    setMonths(Number.isNaN(months) ? '--' : months);
    setDays(Number.isNaN(days) ? '--' : days);
    setShowResult(true);
    setError(null); // Clear any previous error message
  };

  return (
    <div>
     <h1 className='submit-check'>{showResult ? 'Form is submitted' : ''}</h1>
      <div className='calculator'>
        <form onSubmit={handleSubmit}>
          <div className='label-wrapper'>
            <div>
              <label className='label' htmlFor='day'>
                DAY 
              </label>
              <input
                className='input'
                min='1'
                max='30'
                type='text'
                id='day'
                value={day}
                placeholder='DD'
                // required
                onChange={(event) => setDay(event.target.value)}
              />
              {error && (
                <>
                <span className='error'>{!day ? error : ""} </span>
                <span className='error'>{!min === 1 && !max  === 30 ? error : ""} </span>
                </>                
              )}             
            </div>
            <div>
              <label className='label' htmlFor='month'>
                MONTH
              </label>
              <input
                className='input'
                min='1'
                max='12'
                type='text'
                id='month'
                value={month}
                placeholder='MM'
                style={style(error)}
                // required
                onChange={(event) => setMonth(event.target.value)}
              />
              {error && (
                <>
                <span className='error'>{!month ? error : "" } </span> 
                <span className='error'>{!min === 1 && !max  === 12 ? error : ""} </span> 
                </>
                              
              )}
            </div>
            <div>
              <label className='label' htmlFor='year'>
                YEAR
              </label>
              <input
                className='input'
                min='1'
                max='2023'
                type='text'
                id='year'
                value={year}
                placeholder='YYYY'
                // required
                onChange={(event) => setYear(event.target.value)}
              />
              {error && (
                <>
                <span className='error'>{!year ? error : "" } </span> 
                <span className='error'>{!min === 1 && max  >= 2023 ? error : ""} </span>              
                </>
              )}
            </div>
            <button type='submit' className='button'><img src={Icon} alt=" icon image" /></button>
          </div>
        <hr className='hr' />
        </form>

        {showResult && (
          <>

            <div className='result-wrapper'>
              <input
                className='result'
                type='text'
                value={`${years} years`}
                readOnly
              />
              <input
                className='result'
                type='text'
                value={`${months} months`}
                readOnly
              />
              <input
                className='result'
                type='text'
                value={`${days} days`}
                readOnly
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;
