import React from 'react'
import styles from './Result.module.css'

const Result = ({ selectedAnswers, quizData }) => {
  return (
    <table className={styles.table}>
      <caption>Quiz Result</caption>
      <thead>
          <th>Question</th>
          <th>Selected Answer</th>
          <th>Correct Answer</th>
      </thead>
      <tbody>
        {selectedAnswers.map((ans, idx) => (
          <tr className={`${ans.toLowerCase() === quizData[idx].correctAns.toLowerCase() ? styles.green : styles.red}`}>
            <th>{idx+1}</th>
            <td dangerouslySetInnerHTML={{ __html: `${ans || '-'}` }}></td>
            <td dangerouslySetInnerHTML={{ __html: `${quizData[idx].correctAns}` }}></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Result;