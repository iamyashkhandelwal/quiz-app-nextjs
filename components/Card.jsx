import React from 'react'
import RadioButton from './RadioButton'
import styles from './Card.module.css'

const Card = ({ question, options, selectedOption, onSelect, number }) => {
  return (
    <div className={styles.card}>
      <h3 dangerouslySetInnerHTML={{ __html: `${number}) ${question}` }}></h3>
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