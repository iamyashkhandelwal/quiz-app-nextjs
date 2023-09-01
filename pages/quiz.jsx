import Card from '@/components/Card';
import CountdownTimer from '@/components/CountdownTimer';
import Result from '@/components/Result';
import { getCookie } from '@/lib/session';
import Head from 'next/head';
import React, { useState } from 'react';
import styles from './quiz.module.css';
import QuestionPanel from '@/components/QuestionPanel';

const Quiz = ({ quizData, authentication, name }) => {
  const [timeup, setTimeup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array.from({ length: 15 }).fill(''));
  const [isVisited, setIsVisited] = useState(Array.from({ length: 15 }).map((_, index) => index === 0));
  const [currQuestion, setCurrQuestion] = useState(1);

  const handleTimeout = () => setTimeup(true);

  if(!authentication) {
    return (<h4>You are not authenticated</h4>);
  }

  if(timeup || submitted) {
    return(<Result selectedAnswers={selectedAnswers} quizData={quizData} />);
  }

  const handleOnSelectAnswer = (val) => {
    const answers = [...selectedAnswers];
    answers[currQuestion-1] = val;
    setSelectedAnswers(answers);
  }

  const handleOnPanelClick = (index) => {
    setCurrQuestion(index + 1);
    const vis = [...isVisited];
    vis[index] = true;
    setIsVisited(vis);
  }

  const handleOnNext = (curr) => {
    if(curr === 15) return;
    setCurrQuestion(curr + 1);
    const vis = [...isVisited];
    vis[curr] = true;  // (curr + 1 - 1)
    setIsVisited(vis);
  }

  const handleOnPrevious = (curr) => {
    if(curr === 1) return;
    setCurrQuestion(curr - 1);
    const vis = [...isVisited];
    vis[curr - 2] = true;  // (curr - 1 -1)
    setIsVisited(vis);
  }

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
        <title>MindMingle - A Quiz App</title>
      </Head>
      <header className={styles.header}>
        <h2>MindMingle</h2>
        <div className={styles.timer}>
          <i className="fa fa-stopwatch"></i>
          <CountdownTimer time={30*60} onTimeout={handleTimeout} />
        </div>
        <div className={styles.userInfo}>
          <span>Hi {name}!</span>
          <button className={styles.submitBtn} onClick={() => setSubmitted(true)}>End Test</button>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <Card 
            question={quizData[currQuestion-1].question} 
            options={quizData[currQuestion-1].options} 
            selectedOption={selectedAnswers[currQuestion-1]} 
            onSelect={handleOnSelectAnswer}
            number={currQuestion}
          />
          <div className={styles.navigation}>
            {currQuestion !== 1 && <button onClick={() => handleOnPrevious(currQuestion)}><i className="fa-solid fa-arrow-left"></i>{" "}Previous</button>}
            {currQuestion !== 15 && <button onClick={() => handleOnNext(currQuestion)}>Next{"  "}<i className="fa-solid fa-arrow-right"></i></button>}
          </div>

        </div>

        <QuestionPanel
          selectedAnswers={selectedAnswers}
          isVisited={isVisited}
          handleOnPanelClick={handleOnPanelClick}
        />
      </div>
    </>
  );
}

export default Quiz;

export const getServerSideProps = async ({ req, query }) => {
  try {
    const isAuth = getCookie('isAuth', req);

    // if the user is not authenticated or their name is missing from the query string then do not proceed further 
    if(!isAuth || !query?.name) {
      return {
        props: {
          authentication: false
        }
      }
    }
    const { getQuestions } = await import('../services/quiz');
    const { shuffleArray } = await import('../lib/helper');
    const response = await getQuestions();
    const quizData = response?.results?.map((item, idx) => ({
      id: idx + 100,
      question: item.question,
      options: shuffleArray([item.correct_answer, ...item.incorrect_answers]),
      correctAns: item.correct_answer
    }))
    return {
      props: { quizData, authentication: true, name: query?.name }
    }
  } catch(err) {
    console.log('Error wile fetching data -- ', err);
    return {
      notFound: true
    }
  }
}