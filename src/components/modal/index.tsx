import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

import './styles.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAlertTimeChange: (newAlertTimes: any) => void;
  alertTimes: string[];
}
const Modal = (props: Props) => {
  const [inputValues, setInputValues] = useState([...props.alertTimes]);
  const handleClose = () => {
    props.onClose();
  };

  const handleTimeChange = (index: any, event: any) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  const handleSaveAlarms = () => {
    props.onAlertTimeChange(inputValues);
    handleClose();
  };

  const loadSavedValues = () => {
    const savedValues = localStorage.getItem('alertTimes');

    if (savedValues) {
      setInputValues(JSON.parse(savedValues));
    }
  };

  useEffect(() => {
    if (props.isOpen) {
      loadSavedValues();
    }
  }, [props.isOpen]);

  useEffect(() => {
    setInputValues([...props.alertTimes]);
  }, [props.alertTimes]);

  return (
    <div className={`modal ${props.isOpen ? 'open' : ''}`}>
      <div className='modal-content'>
        <span className='close-button' onClick={handleClose}>
          &times;
        </span>
        <h2>Definir horários de alerta</h2>
        {inputValues.map((time, index) => (
          <InputMask
            className='text-fields'
            key={index}
            type='text'
            mask='99:99'
            value={time}
            onChange={(e) => handleTimeChange(index, e)}
          />
        ))}
        <button className='save-button' onClick={handleSaveAlarms}>
          Salvar Alarmes
        </button>
      </div>
    </div>
  );
};

export default Modal;
