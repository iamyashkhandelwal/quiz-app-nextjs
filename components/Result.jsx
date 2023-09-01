import React from 'react'
import styles from './Result.module.css'
import Link from 'next/link';

const Result = ({ selectedAnswers, quizData }) => {

  const getTotalScore = () => {
    let score = 0;
    selectedAnswers.forEach((ans, idx) => {
      if(ans.toLowerCase() === quizData[idx].correctAns.toLowerCase()) score++;
    })
    return score;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <caption>MindMingle Result</caption>
        <thead>
            <th>Question</th>
            <th>Selected Answer</th>
            <th>Correct Answer</th>
            <th>Score</th>
        </thead>
        <tbody>
          {selectedAnswers.map((ans, idx) => (
            <tr>
              <th>{idx+1}</th>
              <td dangerouslySetInnerHTML={{ __html: `${ans || '-'}` }}></td>
              <td dangerouslySetInnerHTML={{ __html: `${quizData[idx].correctAns}` }}></td>
              <td className={styles.score}>{ans.toLowerCase() === quizData[idx].correctAns.toLowerCase() ? '+1' : 0}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <th colSpan={3}>Total Score</th>
          <td>{getTotalScore()}</td>
        </tfoot>
      </table>

      <Link href={'/'}>Want to give it another try?</Link>
    </div>
  );
}

export default Result;