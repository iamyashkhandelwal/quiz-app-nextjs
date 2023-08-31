import React from 'react'
import RadioButton from './RadioButton'
import styles from './Card.module.css'

const Card = ({ question, options, selectedOption, onSelect }) => {
  return (
    <div className={styles.container}>
    <h3 dangerouslySetInnerHTML={{ __html: question }}></h3>
    {options.map((item, idx) => (
      <RadioButton 
        key={idx} 
        isSelected={selectedOption?.toLowerCase() === item?.toLowerCase()} 
        value={item} 
        onClick={onSelect} 
      />
    ))}
    </div>
  )
}

export default Card