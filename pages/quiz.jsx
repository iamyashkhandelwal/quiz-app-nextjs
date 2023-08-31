import Card from '@/components/Card';
import CountdownTimer from '@/components/CountdownTimer';
import Result from '@/components/Result';
import { getCookie } from '@/lib/session';
import Head from 'next/head';
import React, { useState } from 'react'

const Quiz = ({ quizData, authentication }) => {
  // const router = useRouter();
  const [timeup, setTimeup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array.from({ length: 15 }).fill(''));
  const [isVisited, setIsVisited] = useState(Array.from({ length: 15 }).map((_, index) => index === 0));
  const [currQuestion, setCurrQuestion] = useState(1);
  // console.log('selectedAnswers -- ', selectedAnswers);
  // console.log('isVisited -- ', isVisited);
  console.log('quiz -- ', quizData);

  const handleTimeout = () => setTimeup(true);

  if(!authentication) {
    return (<h4>You are not authenticated</h4>);
  }

  if(timeup || submitted) {
    return(<Result selectedAnswers={selectedAnswers} />);
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

  return (
    <>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    </Head>
      {/* <CountdownTimer time={10} onTimeout={handleTimeout} /> */}
      <i className="fa fa-stopwatch"></i>
      {Array.from({length: 15}).map((_, idx) => <button style={{ background: selectedAnswers[idx] ? 'green' : isVisited[idx] ? 'orange' : 'transparent' }} key={idx} onClick={() => handleOnPanelClick(idx)}>{idx+1}</button>)}

      <Card 
        question={quizData[currQuestion-1].question} 
        options={quizData[currQuestion-1].options} 
        selectedOption={selectedAnswers[currQuestion-1]} 
        onSelect={handleOnSelectAnswer} 
      />
      <button onClick={() => setSubmitted(true)}>Submit</button>
    </>
  );
}

export default Quiz;

export const getServerSideProps = async ({ req }) => {
  try {
    const isAuth = getCookie('isAuth', req);
    if(!isAuth) {
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
      props: { quizData, authentication: true }
    }
  } catch(err) {
    console.log('Error wile fetching data -- ', err);
    return {
      notFound: true
    }
  }
}