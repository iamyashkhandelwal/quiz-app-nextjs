import React from 'react'
import styles from './RadioButton.module.css'

const RadioButton = ({ value, onClick, isSelected }) => {
  const handleOnClick = ({ target: {value} }) => {
    onClick?.(value);
  }
  return (
    <>
    <div className={styles.option}>
      <input readOnly type={'radio'} name={value} value={value} checked={isSelected} onClick={handleOnClick} />
      <label htmlFor={value} dangerouslySetInnerHTML={{ __html: value }}></label>
    </div>
    </>
  )
}

export default RadioButton