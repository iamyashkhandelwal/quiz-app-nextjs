import React from 'react'
import styles from './QuestionPanel.module.css';

const QuestionPanel = ({ selectedAnswers, isVisited, handleOnPanelClick }) => {
  return (
    <div className={styles.panelContainer}>
      <div className={styles.btnGuide}>
        <span className={styles.visited}>Visited</span>
        <span className={styles.answered}>Attempted</span>
      </div>
      <div className={styles.btnContainer}>
        {Array.from({length: 15}).map((_, idx) => <button style={{ background: selectedAnswers[idx] ? 'green' : isVisited[idx] ? 'orange' : 'transparent' }} key={idx} onClick={() => handleOnPanelClick(idx)}>{idx+1}</button>)}
      </div>
    </div>
  );
}

export default QuestionPanel