import React from 'react'
import styles from './RadioButton.module.css'

const RadioButton = ({ value, onClick, isSelected }) => {
  const handleOnClick = (e) => {
    e.stopPropagation();
    const inputElement = e.currentTarget.querySelector('input');
    onClick?.(inputElement.value);
  }
  return (
    <>
    <div className={styles.option} onClick={handleOnClick}>
      <input readOnly type={'radio'} name={value} value={value} checked={isSelected} />
      <label htmlFor={value} dangerouslySetInnerHTML={{ __html: value }}></label>
    </div>
    </>
  )
}

export default RadioButton