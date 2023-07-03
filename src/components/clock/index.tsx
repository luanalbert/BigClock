import React, { useState, useEffect } from 'react';
import './styles.css';
import Modal from '../modal';

const Clock = (): JSX.Element => {
  const [time, setTime] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [alertTimes, setAlertTimes] = useState(['', '', '', '']);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const timeString = time.toLocaleTimeString();
  const [hours, minutes, seconds] = timeString.split(':');
  const [showColon, setShowColon] = useState(true);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAlertTimesChange = (newAlertTimes: any) => {
    setAlertTimes(newAlertTimes);
    localStorage.setItem('alertTimes', JSON.stringify(newAlertTimes));
  };

  useEffect(() => {
    const storedAlertTimes = localStorage.getItem('alertTimes');
    if (storedAlertTimes) {
      setAlertTimes(JSON.parse(storedAlertTimes));
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime);

      const formattedCurrentTime = currentTime.toLocaleTimeString().slice(0, 5);
      setIsAlarmActive(alertTimes.includes(formattedCurrentTime));

      setShowColon((prevShowColon) => !prevShowColon);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [alertTimes]);

  return (
    <div className='backgroud'>
      <div
        className={`container-clock ${isAlarmActive ? 'alarm-active' : ''}`}
        onClick={handleModalOpen}
      >
        <div className='hours'>{hours}</div>
        <div
          className={`dots ${
            showColon ? (isAlarmActive ? 'alarm-active' : 'black') : 'white'
          }`}
        >
          :
        </div>
        <div className='minutes'>{minutes}</div>
        <div
          className={`dots ${
            showColon ? (isAlarmActive ? 'alarm-active' : 'black') : 'white'
          }`}
        >
          :
        </div>
        <div className='seconds'>{seconds}</div>
      </div>
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={handleModalClose}
          onAlertTimeChange={handleAlertTimesChange}
          alertTimes={alertTimes}
        />
      )}
    </div>
  );
};

export default Clock;
