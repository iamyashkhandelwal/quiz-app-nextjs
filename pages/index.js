import { setCookie } from '@/lib/session';
import { useRouter } from 'next/router';
import React from 'react'

const Index = () => {
  const router = useRouter();
  const handleOnClick = () => {
    setCookie('isAuth', true);
    router.push('/quiz');
  }
  return (
    <>
      <div>index</div>
      <button onClick={handleOnClick}>Take me to the quiz</button>
    </>
  )
}

export default Index;